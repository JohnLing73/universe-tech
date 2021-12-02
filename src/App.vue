<template>
  <each-repository :arr='arr'></each-repository>
  <transition name='hint'>
    <h3 v-if='loadingStatus'>There are no more repository left...</h3>
  </transition>
</template>
<script>
import axios from "axios";
import { onMounted, ref, onUnmounted, computed } from "vue";
export default {
  name: "App",
  setup() {
    const arr = ref([]);
    const page = ref(1);
    async function fetchData() {
      if(page.value !== null){
        const response = await axios.get(
          `https://api.github.com/users/JohnLing73/repos?&page=${page.value}&per_page=4`,
        );
        
        arr.value = arr.value.concat(response.data);
        return (response.headers.link.indexOf("rel=\"next\"") > -1) ? page.value++ : page.value = null;
      }else{
        return;
      }
    }

    const bottomDistance = 10;
    const loading = ref(false);
    async function scrollListener() {
      if(loading.value || !page.value) {
        return;
      }
      if(window.scrollY + window.innerHeight > document.body.scrollHeight - bottomDistance) {
        loading.value = true;
        await fetchData();
        loading.value = false;
      }

    }

    const loadingStatus = computed(function() {
      return (page.value === null);
    })

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
      loading,
      loadingStatus
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

  .hint-enter-from,
  .hint-leave-to {
    opacity: 0;
    transform: translateY(50px);
  }
  .hint-enter-active,
  .hint-leave-active {
    transition: all 2s ease-in-out;
  }
  .hint-enter-to,
  .hint-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
