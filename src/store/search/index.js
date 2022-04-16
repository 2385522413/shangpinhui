import {reqGetSearchInfo} from "../../api/index";

const state = {
    searchList:{},
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
const actions = {
    async getSearchList({commit},params = {}) {
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            //提交mutation
            commit("GETSEARCHLIST", result.data);
        }
    }
};
const getters = {
    goodsList(state){
        return state.searchList.goodsList||[];
    },
    trademarkList(state){
        return state.searchList.trademarkList||[];
    },
    attrsList(state){
        return state.searchList.attrsList||[];
    }
};
export default {
    state,
    mutations,
    actions,
    getters
};
