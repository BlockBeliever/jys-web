<template>
  <loading :loading-show="isLoading" />
  <div class="container">
    <div class="form-content">
      <div class="input-form">
        <div class="input-label">选择货币</div>
        <el-select 
          v-model="addressDetailItem.currencyType" 
          placeholder="请选择货币种类" 
          size="large"
          class="full-width"
          disabled
        >
          <el-option
            v-for="item in currencyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="input-form">
        <div class="input-label">收款方式</div>
        <el-select 
          v-model="addressDetailItem.paymentMethod" 
          placeholder="请选择收款方式" 
          size="large"
          class="full-width"
          disabled
        >
          <el-option
            v-for="item in paymentMethodOptios"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="input-form">
        <div class="input-label">姓名</div>
        <el-input 
          v-model="addressDetailItem.accountName" 
          placeholder="请输入姓名" 
          size="large"
          class="full-width"
        />
      </div>
      <div class="input-form">
        <div class="input-label">
          {{ `${addressDetailItem.paymentMethod}账号` }}
        </div>
        <el-input 
          v-model="addressDetailItem.paymentAccount" 
          :placeholder="`请输入${addressDetailItem.paymentMethod}账号`" 
          size="large"
          class="full-width"
        />
      </div>
      <template v-if="selected1.includes(addressDetailItem.paymentMethod)">
        <div class="input-form">
          <div class="input-label">{{ `${addressDetailItem.paymentMethod}二维码` }}</div>
          <div class="upload">
            <van-uploader
              v-if="!androidAttrs"
              :before-read="beforeRead"
              :after-read="afterRead"
              @delete="deleteImg"
              v-model="fileList"
              multiple
              :max-count="1"
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
              :max-count="1"
              capture="camera"
              accept="image/*"
            >
            </van-uploader>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="input-form">
          <div class="input-label">开户银行</div>
          <el-input 
            v-model="addressDetailItem.bankAccount" 
            placeholder="请选择开户银行" 
            size="large"
            class="full-width"
          />
        </div>
        <div class="input-form">
          <div class="input-label">开户支行</div>
          <el-input 
            v-model="addressDetailItem.branchAccount" 
            placeholder="请输入开户支行" 
            size="large"
            class="full-width"
          />
        </div>
      </template>
    </div>

    <div class="button-container">
      <el-button 
        type="primary" 
        size="large" 
        class="confirm-button"
        @click="handleConfirm"
      >
        保存
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from "vant";
import { t } from "@/plugins/i18n";
import cos from "@/utils/cos";
import { Md5 } from "ts-md5";
import { addressDetail, updateAddress } from "@/api/address";
import Loading from "@/components/loading/index.vue";

const router = useRouter()
const route = useRoute()

const currencyOptions : Array<any> = [
  {
    label: "CNY",
    value: "CNY"
  },
  {
    label: "USD",
    value: "USD"
  },
]

const selected1 = ["支付宝", "微信", "汇旺", "ABA"]
const selected2 = ["银行卡", "VISA"]

const paymentMethodOptios = ref<any[]>([])

const androidAttrs = ref<boolean>(true);
const fileList = ref<any[]>([]);
const pictureList = ref<any[]>([]);
const isLoading = ref<boolean>(false)

const addressDetailItem = ref<any>({})

onActivated(async () => {
  const model = navigator.userAgent;
  androidAttrs.value = model.indexOf("Android") > -1;
  fileList.value = [];
  console.log(route.params.id)
  isLoading.value = true
  try {
    const {code, data, error} = await addressDetail({id : Number(route.params.id)})
    if (!code) {
      addressDetailItem.value = data.item
      fileList.value = [
        { url: addressDetailItem.value.paymentCode },
      ]
    } else {
      showToast(error)
    }
  } catch (e) {
    console.log("address detail error =======================> ", e)
  } finally {
    isLoading.value = false
  }
});

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
        Bucket: "jys-1327669833",
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

const handleConfirm = async () => {
  if (!addressDetailItem.value.currencyType) {
    showToast("请选择货币种类");
    return
  }
  if (!addressDetailItem.value.paymentMethod) {
    showToast("请选择收款方式");
    return
  }
  if (!addressDetailItem.value.accountName) {
    showToast("请输入姓名");
    return
  }
  if (!addressDetailItem.value.paymentAccount) {
    showToast(`请输入${addressDetailItem.value.paymentMethod}账号`)
    return
  }
  if (selected1.includes(addressDetailItem.value.paymentMethod)) {
    addressDetailItem.value.paymentCode = pictureList.value.length > 0 ? pictureList.value[0].url : addressDetailItem.value.paymentCode
  } else {
    if (!addressDetailItem.value.bankAccount) {
      showToast("请选择开户银行");
      return
    }
    if (!addressDetailItem.value.branchAccount) {
      showToast("请输入开户支行");
      return
    }
  }

  isLoading.value = true

  try {
    const { code } = await updateAddress(addressDetailItem.value)

    if (!code) {
      showToast("成功！")
      router.back();
    } else {
      showToast("失败！")
    }

  } catch (e) {
    console.log("addCurrencyAddress Error ===============> ", e)
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.form-content {
  flex: 1;
  padding: 20px 14px;
  overflow-y: auto;
}

.input-form {
  margin-bottom: 12px;
  
  .input-label {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }
  
  .full-width {
    width: 100%;
  }
}

.upload {
  background-color: #fff;

  :deep(.van-uploader__upload) {
    width: 160px;
    height: 160px;
    border-radius: 10px;
  }

  :deep(.van-uploader__preview) {
    width: 160px;
    height: 160px;
    border-radius: 10px;
  }

  :deep(.van-uploader__preview-image) {
    width: 160px;
    height: 160px;
    border-radius: 10px;
  }
}

.button-container {
  padding: 14px;
  background-color: #fff;
  position: sticky;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  
  .confirm-button {
    width: 100%;
    height: 48px;
    font-size: 16px;
    font-weight: 500;
    background-color: #0080E4;
    border-color: #0080E4;
    border-radius: 10px;
    
    &:hover {
      background-color: #0080E4;
      border-color: #0080E4;
    }
    
    &:active {
      background-color: #0080E4;
      border-color: #0080E4;
    }
  }
}
</style>