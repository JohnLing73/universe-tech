import { createApp } from 'vue';
import App from './App.vue';

import * as Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import BaseCard from './components/UI/BaseCard.vue';

const app = createApp(App);
app.use(VueAxios, axios);

app.component('base-card', BaseCard);

app.mount('#app')
