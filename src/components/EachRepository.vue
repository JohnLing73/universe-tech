<template>
  <div v-for='(item, index) in arr' :key='item.id'>
    <base-card>
      <template #default>
        <h2>Title {{ index + 1 }}: {{ item.name }}</h2>
      </template>
      <template #description>
        <p>Description: {{ item.description }}</p>
      </template>
      <template #url>
        <p>URL: <a :href="item.html_url">{{ item.html_url}}</a></p>
      </template>
    </base-card>
  </div>
</template>
<script>
export default {
  props: {
    arr: {
      type: Array
    }
  }
}
</script>
<style lang="scss">
  
</style>