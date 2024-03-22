export default {
    // 监听 vuex 中state下language的改变
    // 外部通过 this.$store.getters.language 调用
    language: state => state.app.language,
}