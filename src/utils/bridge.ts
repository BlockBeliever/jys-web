export const setupWebViewJavascriptBridge = (callback: any) => {
  if ((window as any).WebViewJavascriptBridge) { return callback(((window as any).WebViewJavascriptBridge)) }
  if ((window as any).WVJBCallbacks) { return (window as any).WVJBCallbacks.push(callback); }
  (window as any).WVJBCallbacks = [callback];
  let WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'https://__bridge_loaded__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
}