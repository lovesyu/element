import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './mock'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Blob from './excel/Blob'
import Export2Excel from './excel/Export2Excel'
Vue.use(ElementUI);
localStorage.removeItem('token')
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
