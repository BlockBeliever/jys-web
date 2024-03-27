import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "../assets/locales/en.json";
import zh from "../assets/locales/zh.json";
import th from "../assets/locales/th.json";
import vi from "../assets/locales/vi.json";
import ms from "../assets/locales/ms.json";

Vue.use(VueI18n)
export default new VueI18n({
    locale: localStorage.getItem("lang") || 'zh',
    fallbackLocale: 'zh',
    localeDir: "locales",
    messages: {
        en: en,
        zh: zh,
        th: th,
        vi: vi,
        ms: ms,
    }
})