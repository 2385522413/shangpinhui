import Home from "../pages/Home/index";

export default [
    {
        path: '/center',
        component: () =>
            import("../pages/Center/index"),
        children: [
            {
                // path: '/center/myorder',
                path: 'myorder',
                component: () =>
                    import("../pages/Center/myOrder"),
            },
            {
                path: 'grouporder',
                component: () =>
                    import("../pages/Center/groupOrder"),
            },

            {
                path: '',
                redirect: 'myorder'
            }
        ]
    },
    {
        path: '/paysuccess',
        name: "PaySuccess",
        /* 只有从支付界面, 才能跳转到支付成功的界面 */
        beforeEnter (to, from, next) {
            if (from.path==='/pay') {
                next()
            } else {
                next('/pay')
            }
        },
        component: () =>
            import("../pages/PaySuccess/index"),
        meta: {show: true}

    },
    {
        path: '/pay',
        name: "Pay",
        /* 只能从交易界面, 才能跳转到支付界面 */
        beforeEnter (to, from, next) {
            if (from.path==='/trade') {
                next()
            } else {
                next('/trade')
            }
        },
        component: () =>
            import("../pages/Pay/index"),
        meta: {show: true}
    },
    {
        path: "/trade",
        name: "Trade",
        /* 只能从购物车界面, 才能跳转到交易界面 */
        beforeEnter (to, from, next) {
            if (from.path==='/shopcart') {
                next()
            } else {
                next('/shopcart')
            }
        },
        component: () =>
            import("../pages/Trade/index"),
        meta: {show: true}
    },
    {
        path: "/shopcart",
        name: "ShopCart",
        component: () =>
            import("../pages/ShopCart/index")
    },
    {
        path: "/addcartsuccess",
        name: "AddCartSuccess",
        component: () =>
            import("../pages/AddCartSuccess/index")
    },
    {
        path: "/detail/:skuId",
        name: "Detail",
        component: () =>
            import("../pages/Detail/index")
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
        meta: {show: true}
    },
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/login",
        meta: {show: false},
        component: () =>
            import("../pages/Login/index")
    },
    {
        path: "/register",
        meta: {show: false},
        component: () =>
            import("../pages/Register/index")
    },
    {
        /*  :keyword?  */
        path: "/search/:keyword?",
        name: "search",
        meta: {show: true},
        component: () =>
            import("../pages/Search/index")
    }
];

