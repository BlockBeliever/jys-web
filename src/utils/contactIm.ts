import { setupWebViewJavascriptBridge } from '@/utils/bridge'
// flutter交互
setupWebViewJavascriptBridge(function (bridge: any) {
  async function defaultHandler(message: any) {
    return new Promise(resolve => {
      let data = {
        'Javascript Responds': 'defaultHandler Wee!'
      };
      setTimeout(() => resolve(data), 0);
    });
  }
  bridge.init(defaultHandler);
  async function responsePayDapp(data: any) {
  }
  bridge.registerHandler('responsePayDapp', responsePayDapp);
});
const contactIm = (uid1: number | undefined, uid2: number | undefined) => {
  (window as any).WebViewJavascriptBridge.callHandler('contactCustomService',
    JSON.stringify({ uid: uid1, contact_id: uid2 }),
    function (responseData: any) {
    });
}
export default contactIm
