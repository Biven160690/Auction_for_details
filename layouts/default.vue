<template>
  <div>
    <NavBar />
    <Nuxt />
  </div>
</template>

<script>
import NavBar from "../components/navbar";
export default {
  components: {
    NavBar
  }
};
</script>

<style>
.container {
  max-width: 1185px;
  padding: 12px;
  margin-right: auto;
  margin-left: auto;
}
</style>
