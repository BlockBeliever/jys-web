<template>
  <div class="container">
    <div class="card">
      <div class="head">
        <img :src="detail.goods_coin_icon" alt="" />
        <span
          >{{
            detail.goods_type === 1 
              ? $t("myOrder.buy")
              : $t("myOrder.sell")
          }}{{ detail.goods_coin }}</span
        >
      </div>
      <div class="item">
        <span class="left">{{ $t("myOrder.orderNumber") }}</span>
        <div class="right">
          <span class="text">{{ detail.order_id }}</span>
          <img
            class="copy"
            src="@/assets/img/order/copy.png"
            alt=""
            @click="copyCode(detail.order_id)"
          />
        </div>
      </div>
      <div class="item">
        <span class="left">{{ $t("myOrder.unitPrice") }}</span>
        <div class="right">
          <span class="text"
            >{{ detail.goods_price }} {{ detail.goods_pay_coin }}/个</span
          >
        </div>
      </div>
      <div class="item">
        <span class="left">{{ $t("myOrder.quantity") }}</span>
        <div class="right">
          <span class="text">{{ divide(detail.order_num) }}</span>
        </div>
      </div>
      <div class="item">
        <span class="left">{{ $t("myOrder.totalAmount") }}</span>
        <div class="right">
          <span class="text2"
            >{{ divide(detail.order_amount) }} {{ detail.goods_pay_coin }}</span
          >
        </div>
      </div>
      <div class="item">
        <span class="left">{{ $t("myOrder.paymentMethod") }}</span>
        <div class="right">
          <div class="divider"></div>
          <span class="text2">{{ payWay }}</span>
        </div>
      </div>
    </div>
    <div class="appael">
      <div class="title">{{ $t("myOrder.complaintDescription") }}</div>
      <van-field
        class="textarea"
        v-model="message"
        label-align="top"
        type="textarea"
        name=""
        label=""
        :placeholder="$t('myOrder.pleaseEnterComplaintDescription')"
        autosize
        maxlength="200"
        show-word-limit
      />
    </div>
    <div class="upload">
      <div class="title">{{ $t("myOrder.uploadComplaintImage") }}</div>
      <div class="uploader">
        <van-uploader
          v-if="!androidAttrs"
          :before-read="beforeRead"
          :after-read="afterRead"
          @delete="deleteImg"
          v-model="fileList"
          multiple
          :max-count="9"
          accept="image/*"
        >
        </van-uploader>
        <van-uploader
          v-else
          :before-read="beforeRead"
          :after-read="afterRead"
          @delete="deleteImg"
          v-model="fileList"
          multiple
          :max-count="9"
          capture="camera"
          accept="image/*"
        >
        </van-uploader>
        <!-- <van-uploader v-model="fileList" :before-read="beforeRead" :after-read="afterRead" multiple /> -->
      </div>
    </div>
    <div class="btn-box">
      <div class="btn2" @click="confirmClick">
        {{ $t("myOrder.submitComplaint") }}
      </div>
      <div class="cancel" @click="cancelClick">
        {{ $t("myOrder.cancelComplaint") }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { divide } from "@/utils/formart";
import { orderDetail, confirmOrder, appealOrder } from "@/api/order";
import { showToast } from "vant";
import cos from "@/utils/cos";
import { Md5 } from "ts-md5";
import { copyText } from "@/utils/copy";
import router from "@/router";
import { useAppStore } from "@/store";
import { t } from "@/plugins/i18n";

const store = useAppStore();
const route = useRoute();
const androidAttrs = ref(true);
onActivated(() => {
  const model = navigator.userAgent;
  androidAttrs.value = model.indexOf("Android") > -1;
  pictureList.value = [];
  fileList.value = [];
  message.value = "";
  getDetail();
});
const detail = ref({} as any);
const payWay = ref("");
const getDetail = async () => {
  const { data } = await orderDetail({
    id: Number(route.query.id),
  });
  detail.value = data;
  payWay.value = data.transaction_ways[0].name;
};
// 取消申诉
const cancelClick = () => {
  history.back();
};
// 提交申诉
const message = ref("");
const confirmClick = async () => {
  if (!message.value) {
    showToast(t("myOrder.pleaseEnterComplaintDescription"));
    return;
  }
  if (!pictureList.value.length) {
    showToast(t("myOrder.pleaseUploadPaymentImage"));
    return;
  }
  const { code, error } = await appealOrder({
    id: detail.value.id,
    appeal_reason: message.value,
    pictures: pictureList.value.map((item: any) => item.url),
  });
  if (code === 0) {
    showToast(t("myOrder.orderComplaintSuccessful"));
    router.back();
  } else {
    showToast(error);
  }
};
// 上传
const fileList = ref([]);
const pictureList = ref([] as any);
const beforeRead = (file: any) => {
  return true;
};
const afterRead = async (file: any) => {
  try {
    let index = file.file.name.lastIndexOf(".");
    console.log("name = ", file.file.name);
    file.status = "uploading";
    file.message = t("myOrder.uploading");
    // 直接调用 cos sdk 的方法
    cos.uploadFile(
      {
        Bucket: "jys-1319989102",
        Region: "ap-singapore",
        Key: `/screenshot/jysWeb/${new Date().toLocaleDateString()}/${Md5.hashStr(
          file.file.name.substring(0, index + 1)
        )}${Date.now()}.${file.file.name.substring(
          index + 1,
          file.file.name.length
        )}`,
        Body: file.file,
        SliceSize: 1024 * 1024 * 300,
        onProgress: function (progressData) {
          if (progressData.percent === 1) {
            file.status = "done";
          }
        },
      },
      async function (err, data: any) {
        if (err) {
          file.status = "failed";
          return;
        }
        pictureList.value.push({
          url: `https://${data.Location}`,
          file_name: file.file.name,
        });
      }
    );
  } catch (error: any) {
    file.status = "failed";
    showToast(`error:${error}`);
  }
};
const deleteImg = (file: any) => {
  let index = pictureList.value.findIndex(
    (item: any) => item.file_name === file.file.name
  );
  if (index !== -1) {
    pictureList.value.splice(index, 1);
  }
};
// 复制订单号
const copyCode = (val: string) => {
  copyText(".copy", val);
};
</script>

<style lang="scss" scoped>
@import "./scss/upload.scss";
</style>
