<template>
  <loading :loading-show="isLoading" />
  <div class="container">
    <div class="form-content">
      <div class="input-form">
        <div class="input-label">选择网络</div>
        <el-select 
          v-model="selectedCrypto" 
          placeholder="请选择网络" 
          size="large"
          class="full-width"
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
          v-model="cryptoAddress" 
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

const selectedCrypto = ref<string>("")
const cryptoAddress = ref<string>("")
const isLoading = ref<boolean>(false)

const handleConfirm = async () => {
  if (!selectedCrypto.value) {
    showToast("请选择网络")
    return
  }
  
  if (!cryptoAddress.value) {
    showToast("请输入地址")
    return
  }

  isLoading.value = true

  const { code } = await addAddress({
    currencyType: selectedCrypto.value,
    paymentAccount: cryptoAddress.value,
  })

  isLoading.value = false

  if (!code) {
    showToast("成功！")
  } else {
    showToast("失败！")
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