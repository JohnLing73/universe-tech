<template>
  <div class="base-card">
    <div>
      <slot></slot>
    </div>
    <div>
      <slot name="description"></slot>
    </div>
    <div>
      <slot name="url"></slot>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
  .base-card {
    max-width: 1140px;
    width: 100%;
    margin: 1rem auto;
    padding: 1rem;
    border: 3px solid rgb(169, 166, 214);
    border-radius: 12px;
  }
</style>