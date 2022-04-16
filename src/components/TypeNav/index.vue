<template>
    <div>
        <!-- 商品分类导航 -->
        <div class="type-nav">
            <div class="container">
                <div @mouseleave="leaveShow" @mouseenter="enterShow">
                    <h2 class="all">全部商品分类</h2>
                    <!--过渡动画-->
                    <transition name="sort">
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId"
                                 :class="{cur:currentIndex==index}">
                                <h3 @mouseenter="changeIndex(index)">
                                    <a :data-categoryName="c1.categoryName"
                                       :data-category1Id="c1.categoryId"
                                    >{{c1.categoryName}}</a>
                                </h3>
                                <div class="item-list clearfix" v-show="currentIndex==index">
                                    <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName"
                                                   :data-category1Id="c2.categoryId"
                                                >{{c2.categoryName}}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName"
                                                       :data-category1Id="c3.categoryId"
                                                    >{{c3.categoryName}}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </transition>
                </div>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import throttle from "lodash/throttle.js";

    export default {
        name: "TypeNav",
        data() {
            return {
                currentIndex: -1,
                show: true,
            };
        },
        mounted() {
             //如果不是Home路由组件，将typeNav进行隐藏
            if (this.$route.path != "/home") {
                this.show = false;
            }
        },
        computed: {
            ...mapState({
                categoryList: state => state.home.categoryList
            })
        },
        methods: {
            //三级联动节流
            changeIndex: throttle(function (index) {
                this.currentIndex = index;
            }, 50),
            //进行路由跳转的回调函数
            /*
             不能使用 router-link 因为他是个组件 数据量太大，创建太多组件导致卡顿
             进行优化  最好的解决方案:编程式导航＋事件委派
             存在一些问题:事件委派，是把全部的子节点【h3、dt、dl、em】的事件委派给父亲节点
             点击a标签的时候，才会进行路由跳转【怎么能确定点击的一定是a标签】
             存在另外一个问题:即使你能确定点击的是a标签，如何区分是一级、二级、三级分类的标签。
             */
            goSearch(event) {
                //event.target:获取到的是出发事件的元素(div、h3、a、em、dt、dl)
                //第一个问题:把子节点当中a标签，我加上自定义属性data-categoryName，其余的子节点是没有的
                let element = event.target;

                //获取到当前出发这个事件的节点【h3、a、dt、dl】，需要带有data-categoryname这样节点【一定是a标签】
                // 节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
                let {categoryname, category1id, category2id, category3id} = element.dataset;

                //第二个问题解决了：点击的到底是不是a标签（只要这个标签身上带有categoryname）一定是a标签
                //当前这个if语句：一定是a标签才会进入
                if (categoryname) {
                    //准备路由跳转的参数对象
                    let loction = {name: "search"};
                    let query = {categoryName: categoryname};
                    //一定是a标签：一级目录
                    if (category1id) {
                        query.category1Id = category1id;
                        //一定是a标签：二级目录
                    } else if (category2id) {
                        query.category2Id = category2id;
                        //一定是a标签：三级目录
                    } else {
                        query.category3Id = category3id;
                    }
                    //判断：如果路由跳转的时候，带有params参数，捎带脚传递过去
                    if (this.$route.params) {
                        loction.params = this.$route.params;
                        //动态给location配置对象添加query属性
                        loction.query = query;
                        //路由跳转
                        this.$router.push(loction);
                    }
                }
            },

            enterShow(){
                if (this.$route.path != "/home") {
                    this.show = true;
                }
            },
            leaveShow(index){
                this.currentIndex = -1;
                //判断如果是Search路由组件的时候才会执行
                if (this.$route.path != "/home") {
                    this.show = false;
                }
            }
        }
    };
</script>
<style scoped lang="less">
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: block;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    .cur {
                        background: skyblue;
                    }
                }
            }
            //过渡动画的样式
            //过渡动画开始状态（进入）
            .sort-enter {
                height: 0px;
            }
            // 过渡动画结束状态（进入）
            .sort-enter-to {
                height: 461px;
            }
            // 定义动画时间、速率
            .sort-enter-active {
                transition: all 0.3s linear;
            }
        }
    }
</style>
