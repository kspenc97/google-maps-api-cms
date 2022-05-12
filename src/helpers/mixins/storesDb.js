import axios from "axios";

export default{
    methods:{
        $_postStore(singleStore){
            axios.post('http://localhost:3000/stores/addstore', singleStore);
        },
        $_updateStore(singleStore){
            axios.patch(`http://localhost:3000/stores/${singleStore.storeId}`, singleStore);
        },
        $_deleteStore(singleStore){
            axios.delete(`http://localhost:3000/stores/${singleStore.storeId}`);
        },
        async $_getStores(){
            return await axios.get('http://localhost:3000/stores');
        },
    }
}