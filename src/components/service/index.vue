<template>
  <van-nav-bar
    class="navBar"
    :title="$t('myOrder.helpCenter')"
    :border="false"
    @click-left="onClickLeft"
  >
    <template #left>
      <van-icon name="arrow-left" size="18" color="black" />
    </template>
  </van-nav-bar>
</template>

<script setup>
const router = useRouter();
onActivated(() => {
  const element = document.getElementById("meiqia-container");
  if (element) {
    element.style.display = "block";
  }

  init();
});
const parse = (query) => {
  var qs = {};
  var i = query.indexOf("?");
  if (i < 0 && query.indexOf("=") < 0) {
    return qs;
  } else if (i >= 0) {
    query = query.substring(i + 1);
  }
  var parts = query.split("&");
  for (var n = 0; n < parts.length; n++) {
    var part = parts[n];
    var key = part.split("=")[0];
    var val = part.split("=")[1];
    key = key.toLowerCase();
    if (typeof qs[key] === "undefined") {
      qs[key] = decodeURIComponent(val);
    } else if (typeof qs[key] === "string") {
      var arr = [qs[key], decodeURIComponent(val)];
      qs[key] = arr;
    } else {
      qs[key].push(decodeURIComponent(val));
    }
  }
  return qs;
};
const init = () => {
  (function (m, ei, q, i, a, j, s) {
    m[i] =
      m[i] ||
      function () {
        (m[i].a = m[i].a || []).push(arguments);
      };
    (j = ei.createElement(q)), (s = ei.getElementsByTagName(q)[0]);
    j.async = true;
    j.charset = "UTF-8";
    j.src = "https://static.meiqia.com/widget/loader.js";
    s.parentNode.insertBefore(j, s);
  })(window, document, "script", "_MEIQIA");
  var data = parse(window.location.search);
  var entId = data.entid || data.eid;
  if (Object.prototype.toString.call(entId) === "[object Array]") {
    entId = +entId[0];
  } else {
    entId = +entId;
  }
  _MEIQIA("entId", "fbacb03376b36f85658d0a1991df0ce2" || entId);
  _MEIQIA("standalone", function (config) {
    if (config.color) {
      document.body.style["background-color"] = "#" + config.color;
    }
    if (config.url) {
      document.body.style["background-image"] = "url(" + config.url + ")";
      document.body.style["background-repeat"] = "no-repeat";
      document.body.style["background-size"] = "100% 100%";
    }
  });
  _MEIQIA("withoutBtn");
  if (data.metadata) {
    try {
      var metadata = JSON.parse(data.metadata);
      _MEIQIA("metadata", metadata);
    } catch (e) {}
  }
  if (data.language) {
    if (data.languagelocal !== "true") {
      _MEIQIA("language", data.language);
    }
  }
  if (data.languagelocal === "true") {
    _MEIQIA("languageLocal", true);
  }
  if (data.subsource) {
    _MEIQIA("subSource", data.subsource);
  }
  if (data.fallback) {
    _MEIQIA("fallback", +data.fallback);
  }
  if (data.clientid) {
    _MEIQIA("clientId", data.clientid);
  }
  if (data.agentid || data.groupid) {
    _MEIQIA("assign", {
      agentToken: data.agentid || null,
      groupToken: data.groupid || null,
    });
  }
  _MEIQIA("showPanel", {
    greeting: data.greeting || "",
    agentToken: data.agentid || null,
    groupToken: data.groupid || null,
  });
};
const onClickLeft = () => {
  const element = document.getElementById("meiqia-container");
  element.style.display = "none";
  history.back();
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/common.scss";

.navBar {
  position: relative;
  width: 100%;
  height: 62px;
  // background: linear-gradient(180deg, #2E6BDB 0%, #5588DC 100%);
  z-index: 999999999;
  display: flex;
  align-items: center;
  justify-content: center;

  :deep(.van-nav-bar__content) {
    width: 100%;
  }
}
</style>
