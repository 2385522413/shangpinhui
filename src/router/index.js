import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

/*//让路由守卫的错误不显示(用路由守卫记得加上这句，重写下抛出错误机制)
*
*  https://blog.csdn.net/weixin_48940933/article/details/117303240?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_ecpm_v1~rank_v31_ecpm-2-117303240.pc_agg_new_rank&utm_term=%E8%B7%AF%E7%94%B1%E5%AE%88%E5%8D%AB%E6%8A%A5%E9%94%99&spm=1000.2123.3001.4430*/
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
Vue.use(VueRouter);
/*import Home from "../pages/Home/index";*/

//引入store
import store from "../store";

let router = new VueRouter({
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        //返回的这个y=0，代表的滚动条在最上方
        return {y: 0};
    }
});

//全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
    //to:获取到要跳转到的路由信息
    //from：获取到从哪个路由跳转过来来的信息
    //next: next() 放行  next(path) 放行
    //方便测试 统一放行
    //  next();
    //获取仓库中的token-----可以确定用户是登录了
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    //用户登录了
    if (token) {
        //已经登录而且还想去登录------不行
        if (to.path == "/login" || to.path == "/register") {
            next("/");
        } else {
            //已经登陆了,访问的是非登录与注册
            //登录了且拥有用户信息放行
            if (name) {
                next();
            } else {
                //登陆了且没有用户信息
                //在路由跳转之前获取用户信息且放行
                try {
                    await store.dispatch("getUserInfo");
                    next();
                } catch (error) {
                    //token失效从新登录
                    await store.dispatch("userLogout");
                    next("/login");
                }
            }
        }
    } else {
        //未登录去上面这些路由-----登录
        let toPath = to.path;
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
            //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
            next('/login?redirect='+toPath);
        }else{
            //去的不是上面这些路由（home|search|shopCart）---放行
            next();
        }
    }
});


export default router;
