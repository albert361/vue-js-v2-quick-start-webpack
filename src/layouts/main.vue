<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
  export default {
  }
</script>

<style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 15px 30px;
    background: #f9f7f5;
  }
</style>