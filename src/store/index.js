import { createStore } from "vuex";
import coaches from "./modules/coaches";

export default createStore({
  modules: {
    coaches,
  },
  state() {},
});
