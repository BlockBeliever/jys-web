// 判断手机 - ios/andriod
function isIOS() {
  const u = navigator.userAgent;
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
}
/**
  * @description: 键盘弹起，输入框被遮挡
  */
function judgeInput() {
  if (isIOS()) {
    window.addEventListener('focusin', function () {
      console.log(1 + (document as any).activeElement.tagName);
      if (
        (document as any).activeElement.tagName === 'INPUT' ||
        (document as any).activeElement.tagName === 'TEXTAREA'
      ) {
        setTimeout(function () {
          (document as any).documentElement.scrollTop = (document as any).body.scrollHeight;
        }, 0);
      }
    });
  } else {
    // window.addEventListener('resize', function () {
      console.log(2 + (document as any).activeElement.tagName);
      if (
        (document as any).activeElement.tagName === 'INPUT' ||
        (document as any).activeElement.tagName === 'TEXTAREA'
      ) {
        setTimeout(function () {
          (document as any).activeElement.scrollIntoView();
        }, 0);
      }
    // });
  }
}

export {
  isIOS,
  judgeInput
}