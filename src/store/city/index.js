const state = {
    cityName: decodeURIComponent(localStorage.getItem("cityName")) || '北京',
    cityId: localStorage.getItem("cityId") || 110100
};

const actions = {

};

const mutations = {
    CITY_INFO(state, payload) {
        state.cityName = payload.name;
        state.cityId = payload.id;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}