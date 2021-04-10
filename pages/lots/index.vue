<template>
  <div>
    <search />
    <lots />
  </div>
</template>

<script>
import search from "@/components/search.vue";
import lots from "@/components/lots.vue";
export default {
  components: {
    search,
    lots
  }
};
</script>
