import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        weathers: [],
        api_key: "fb74b19a83ad1e2d95c6c0dd8a276d61",
        url_base: "https://api.openweathermap.org/data/2.5/",
    },
    mutations: {
        downloadWeathers(state) {
            state.weathers = JSON.parse(localStorage.weathers);
        },
        addWeather(state, data) {
            state.weathers.push(data);
        },
        updateWeathers(state, info) {
            state.weathers = info;
        },
        deleteWeather(state, item) {
            state.weathers = state.weathers.filter(elem => elem.name !== item);
        },
    },
    actions: {
        downloadWeathers(ctx) {
            try {
                ctx.commit("downloadWeathers");
            } catch (e) {
                console.log(e)
            }
        },
        async fetchWeather(ctx, query) {
            await axios.get(`${ctx.state.url_base}weather?q=${query}&units=metric&APPID=${ctx.state.api_key}`).then((res) => {
                ctx.commit("addWeather", res.data);
            }).catch(e => {
                console.log(e)
            })
        },
        deleteWeatherByName(ctx, item) {
            try {
                ctx.commit("deleteWeather", item);
            } catch (e) {
                console.log(e)
            }
        },
        updateWeathers(ctx, info) {
            try {
                ctx.commit("updateWeathers", info);
            } catch (e) {
                console.log(e)
            }
        },
    },
    getters: {
        weathers: s => s.weathers
    },
})