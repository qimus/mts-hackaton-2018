import configureStore from './configureStore'

let store;

export default {
    getStore() {
        if (!store) {
            store = configureStore();
        }

        return store;
    },
    setStore(s) {
        store = s;
    }
};
