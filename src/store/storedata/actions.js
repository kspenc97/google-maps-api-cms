import { UPDATE_STORES, CREATE_STORE } from './mutation-types';


export default{
    createStore({commit}, storeData){
        commit(CREATE_STORE, storeData)
    },
    updateStores({commit},stores){
        commit(UPDATE_STORES, stores)
    },
    
}

