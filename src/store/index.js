import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    WeekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  },
  mutations: {},
  actions: {},
  modules: {}
});
