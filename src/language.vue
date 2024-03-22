<template>
  <div class="test">
    <div>{{$t("name")}}</div>
    <button @click="setLanguage()">{{language === 'zh' ? 'English' : '简体中文'}}</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      language: 'zh'
    }
  },
  methods: {
    setLanguage () {
      this.language = this.language === 'zh' ? 'tw' : 'zh'
      // 切换语言
      this.$i18n.locale = this.language
      console.log(this.$t('language.zh'))
    }
  }
}
</script>