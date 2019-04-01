<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage" style="float:right;">
    <div>
      {{ $t('navbar.switLange') }}
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">中文</el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('setLanguage', lang)
      this.$message({
        message: 'Switch Language Success',
        type: 'success'
      })
    }
  }
}
</script>

<style  lang="scss">
.international {
  font-size: 14px;
  cursor: pointer;
  vertical-align: -5px!important;
  .el-dropdown {
    display: inline-block;
    position: absolute;
    color: #606266;
    font-size: 14px;
    right: 150px;
   }
}
</style>

