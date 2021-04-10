<template>
  <div class="wrapper">
    <userSettings/><change-password/>
  </div>
</template>
<script>
import userSettings from '~/components/userSettings.vue';
import changePassword from '~/components/changePassword.vue';
export default {
  components: {
    userSettings,
    changePassword
  }
}
</script>
<style  scoped>
.wrapper{
width: 100%;
display: inline-flex;
justify-content: space-between;
}
</style>>

