import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      persons: new Map(),
      products: new Map(),
    };
  },
});

export default store;
