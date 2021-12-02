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
  <p v-if='!loading'>There are no more repository left...</p>
</template>
<script>
import axios from "axios";
import { onMounted, ref, onUnmounted } from "vue";
export default {
  name: "App",
  setup() {
    const arr = ref([]);
    let page = 1;
    async function fetchData() {
      if(page !== null){
        const response = await axios.get(
          `https://api.github.com/users/JohnLing73/repos?&page=${page}&per_page=4`,
        );
        
        arr.value = arr.value.concat(response.data);
        return (response.headers.link.indexOf("rel=\"next\"") > -1) ? page++ : page = null;
      }else{
        return;
      }
    }

    const bottomDistance = 10;
    const loading = ref(false);
    async function scrollListener() {
      if(loading.value) {
        return;
      }
      if(window.scrollY + window.innerHeight > document.body.scrollHeight - bottomDistance) {
        loading.value = true;
        await fetchData();
        loading.value = false;
      }

    }

    onMounted(() => {
      fetchData();
      window.addEventListener('scroll', scrollListener);
    });
    onUnmounted(() => {
      window.removeEventListener('scroll');
    });

    return {
      arr,
      fetchData,
      loading
    }
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  background: black;
  margin: 0;
  padding: 0;
  h1,
  p {
    color: whitesmoke;
  }
  a {
    color: cadetblue;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #84afdb;
  }
}
</style>
