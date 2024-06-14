import Clipboard from 'clipboard'
import { showToast } from 'vant';
export function copyText(name: string, value: any) {
  let clipboard = new Clipboard(name, {
    text: function () {
      return value
    }
  })
  clipboard.on('success', function (e) {
    showToast('复制成功')
  })
}