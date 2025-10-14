<template>
  <loading :loading-show="isLoading" />
  <div class="container">
    <div class="form-content">
      <div class="input-form">
        <div class="input-label">选择网络</div>
        <el-select 
          v-model="addressDetailItem.currencyType" 
          placeholder="请选择网络" 
          size="large"
          class="full-width"
          disabled
        >
          <el-option
            v-for="item in cryptoOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="input-form">
        <div class="input-label">添加地址</div>
        <el-input 
          v-model="addressDetailItem.paymentAccount" 
          placeholder="请输入地址" 
          size="large"
          class="full-width"
        />
      </div>
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
import { addAddress } from '@/api/address';
import Loading from "@/components/loading/index.vue";
import { addressDetail, updateAddress } from "@/api/address";

const router = useRouter()
const route = useRoute()

const cryptoOptions = [
  {
    label: "ERC20",
    value: "ERC20"
  },
  {
    label: "TRC20",
    value: "TRC20"
  },
]

const isLoading = ref<boolean>(false)

const addressDetailItem = ref<any>({})

const handleConfirm = async () => {
  if (!addressDetailItem.value.currencyType) {
    showToast("请选择网络")
    return
  }
  
  if (!addressDetailItem.value.paymentAccount) {
    showToast("请输入地址")
    return
  }

  isLoading.value = true

  try {
    const { code } = await updateAddress(addressDetailItem.value)

    isLoading.value = false

    if (!code) {
      showToast("成功！")
      router.back();
    } else {
      showToast("失败！")
    }
  } catch (e) {
    console.log("addChainAddress Error ===============> ", e)
  } finally {
    isLoading.value = false
  }
}

onActivated(async () => {
  console.log(route.params.id)
  isLoading.value = true
  try {
    const {code, data, error} = await addressDetail({id : Number(route.params.id)})
    if (!code) {
      addressDetailItem.value = data.item
    } else {
      showToast(error)
    }
  } catch (e) {
    console.log("address detail error =======================> ", e)
  } finally {
    isLoading.value = false
  }
});
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
  margin-bottom: 24px;
  
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