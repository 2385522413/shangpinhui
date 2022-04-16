import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入element ui
import { Button,MessageBox,Message,} from 'element-ui';
Vue.component(Button.name,Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;

import TypeNav from './components/TypeNav/index'
import Carsousel from "./components/Carsousel";
import Pagination from "./components/Pagination";


//引入MockServer.js----mock数据
import "./mock/mockServe";
//引入仓库进行注册
import store from "./store";

import * as API from "./api/index"

//search的图片懒加载
import atm from "./assets/1.gif"
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: atm,
})

//引入表单验证
import "./plugins/validate";

Vue.component(TypeNav.name, TypeNav);
Vue.component(Carsousel.name, Carsousel);
Vue.component(Pagination.name, Pagination);
//引入swiper样式
import "swiper/css/swiper.css";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  store,
}).$mount('#app')
