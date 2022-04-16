import {reqgetCategoryList,reqGetBannerList,reqFloorList} from "../../api/index";

const state = {
    categoryList: [],
    bannerList: [],
    //floor组件的数据
    floorList:[]
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        //删除 从16开始的三个
        categoryList.splice(16,3)
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList;
    }
};
const actions = {
    async categoryList({commit}) {
        let result = await reqgetCategoryList();
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data);
        }
    },
    //获取首页轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit("GETBANNERLIST", result.data);
        }
    },
    //获取floor数据
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        if (result.code == 200) {
            //提交mutation
            commit("GETFLOORLIST", result.data);
        }
    },
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
};
