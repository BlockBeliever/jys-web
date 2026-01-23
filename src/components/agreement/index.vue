<template>
  <div class="agreement-container">
    <van-nav-bar
      title="免责法律声明"
      :border="false"
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="18" color="black" />
      </template>
    </van-nav-bar>
    <div class="content-wrapper">
      <div class="content">
        <h1 class="title">C2C交易平台免责法律声明</h1>
        <p class="intro">
          本C2C交易平台（以下简称"平台"）仅为用户提供在线交易撮合、信息展示、支付结算辅助及物流信息查询等技术服务，并非交易双方主体。为明确平台与用户、用户与用户之间的权利义务，防范交易风险，特制定本免责声明，平台用户（包括卖家与买家）在使用平台服务前，应仔细阅读并充分理解本声明内容，一旦使用平台服务，即视为已接受本声明全部条款，愿意承担相应法律责任。
        </p>

        <section class="section">
          <h2 class="section-title">一、平台定位与责任限制</h2>
          <p class="paragraph">
            1. 平台作为中立的技术服务提供者，仅为交易双方提供交易场所及相关辅助服务，不参与交易双方的实际交易过程，不对卖家所售商品/服务的真实性、合法性、质量安全性、适用性等承担任何担保责任，也不对买家的付款能力、收货义务等承担保证责任。
          </p>
          <p class="paragraph">
            2. 平台对交易双方之间因商品/服务的质量、数量、价格、规格、成色、瑕疵、交付时间、售后服务等产生的全部交易纠纷，不承担直接赔偿、违约等法律责任，但会在合理范围内提供纠纷调解、证据留存协助等服务，调解结果仅为参考，不具有强制执行力。
          </p>
          <p class="paragraph">
            3. 因不可抗力（包括但不限于自然灾害、政策调整、法律法规变更、网络中断、系统故障、黑客攻击、第三方服务中断等不可预见、不可避免且无法克服的情形）导致平台服务中断、数据丢失、交易失败或延迟的，平台已尽合理注意义务并采取补救措施的，不承担任何责任；由此给用户造成的损失，由交易双方自行协商处理或根据法律规定分担。
          </p>
          <p class="paragraph">
            4. 平台不对第三方提供的支付、物流、鉴定等服务承担责任，用户因第三方服务产生的纠纷、损失，应自行与第三方协商解决，平台可提供必要的协助。
          </p>
        </section>

        <section class="section">
          <h2 class="section-title">二、用户行为与信息责任</h2>
          <p class="paragraph">
            1. 用户承诺在平台交易过程中，提供真实、准确、完整的个人信息（包括但不限于姓名、联系方式、地址、身份信息等）及商品/服务信息（包括但不限于名称、品牌、型号、规格、质量、成色、价格、瑕疵等），不得发布虚假信息、侵权信息、违法违规信息（包括但不限于假冒伪劣商品、违禁品、危险品等）。若因用户提供信息不实、虚假宣传或违法违规导致交易纠纷、第三方投诉、行政处罚或法律诉讼的，由该用户独立承担全部责任，给平台或其他用户造成损失的，应依法予以赔偿。
          </p>
          <p class="paragraph">
            2. 卖家应如实披露商品/服务的实际情况，对商品的瑕疵、使用痕迹、质量问题等进行明确说明并提供相应证据（图片、视频等），确保商品/服务与描述一致。因卖家隐瞒信息、虚假描述导致买家损失的，由卖家承担全部赔偿责任，与平台无关。
          </p>
          <p class="paragraph">
            3. 买家应在交易前仔细核对商品/服务信息，主动与卖家沟通确认细节，对商品的质量、适用性等进行独立判断。买家收到商品后，应及时验收，如发现问题需在平台约定时限内提出异议并保留相关证据；若因买家自身疏忽、操作不当、对商品认知偏差或未及时验收导致的损失，由买家自行承担。
          </p>
          <p class="paragraph">
            4. 用户应妥善保管平台账号、密码、支付信息等账户资料，不得将账户转让、出借或授权他人使用。因账户被盗用、密码泄露、操作失误等用户自身原因导致的账户安全问题、资金损失或交易纠纷，由用户自行承担责任，平台不承担赔偿义务。
          </p>
        </section>

        <section class="section">
          <h2 class="section-title">三、知识产权与合规责任</h2>
          <p class="paragraph">
            1. 用户承诺在平台发布的商品/服务信息、图片、文字、视频等内容，均拥有合法的知识产权或获得相关权利人授权，不侵犯任何第三方的商标权、专利权、著作权、隐私权、名誉权等合法权益。
          </p>
          <p class="paragraph">
            2. 若第三方主张用户发布的内容侵犯其知识产权或其他合法权益，平台在收到有效投诉及相关证据后，有权依法采取删除内容、屏蔽链接、暂停或终止用户账户使用等措施，无需提前通知该用户，且不承担任何赔偿责任。由此产生的纠纷、损失，由侵权用户与第三方自行解决，给平台造成损失的，侵权用户应予以赔偿。
          </p>
          <p class="paragraph">
            3. 用户应遵守国家法律法规及平台规则，不得利用平台从事走私、诈骗、洗钱、传销、倒卖违禁品等违法违规活动，不得扰乱平台交易秩序。若用户违反上述约定，平台有权采取限制账户功能、冻结资金、注销账户等措施，同时向相关部门举报，由此产生的法律责任由用户自行承担。
          </p>
        </section>

        <section class="section">
          <h2 class="section-title">四、风险提示与免责补充</h2>
          <p class="paragraph">
            1. 平台提醒用户，C2C交易存在信用风险、市场风险、质量风险等，用户应谨慎评估交易对方的履约能力，建议通过平台官方支付渠道完成交易，避免线下私下交易或脱离平台监管的交易行为。若用户自行进行线下交易或违规交易，产生的一切风险、损失及法律责任，均由用户自行承担，平台不提供任何保障或赔偿。
          </p>
          <p class="paragraph">
            2. 平台对用户在交易过程中产生的聊天记录、订单信息、支付凭证等数据，仅作为交易辅助证据留存，平台尽合理技术手段保障数据安全，但不保证数据的绝对完整性、永久性，因数据丢失导致用户无法举证的，平台不承担责任。
          </p>
          <p class="paragraph">
            3. 平台可根据法律法规更新、业务发展需要，对本免责声明进行修改，修改后的内容将在平台显著位置公示，公示之日起七日后生效。用户继续使用平台服务的，视为接受修改后的声明；若用户不接受，应立即停止使用平台服务。
          </p>
          <p class="paragraph">
            4. 本声明未尽事宜，按照国家相关法律法规及平台规则执行。若用户与平台之间、用户与用户之间因本声明产生争议，应首先协商解决；协商不成的，任何一方均有权向平台运营主体所在地有管辖权的人民法院提起诉讼。
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const onClickLeft = () => {
  if (route.meta.backTo) {
    router.push(route.meta.backTo);
  } else if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/');
  }
};
</script>

<style lang="scss" scoped>
.agreement-container {
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content-wrapper {
  flex: 1;
  margin-top: 8px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.content {
  padding: 20px 16px;
  background-color: #fff;
  margin: 10px;
  border-radius: 8px;
  line-height: 1.8;
  color: #333;

  .title {
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin: 0 0 16px 0;
    text-align: center;
  }

  .intro {
    font-size: 14px;
    color: #666;
    margin: 0 0 24px 0;
    text-align: justify;
  }

  .section {
    margin-bottom: 24px;

    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin: 0 0 12px 0;
    }

    .paragraph {
      font-size: 14px;
      color: #666;
      margin: 0 0 12px 0;
      text-align: justify;
      text-indent: 0;
    }
  }
}
</style>
