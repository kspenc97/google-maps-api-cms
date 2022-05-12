import { UPDATE_STORES, CREATE_STORE } from './mutation-types';

export default{
[UPDATE_STORES](state, data){

    state.stores = data.map(element => {
        return element;
    });
   return state;    
},
[CREATE_STORE](state, data){
    state.stores.push(data);

    //Object.assign(state, data)
    return state;    
},

};