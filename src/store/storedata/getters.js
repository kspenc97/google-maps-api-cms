import axios from 'axios';


export default {
    storesGetter: async function(){
      try{
      const stores = await axios.get('http://localhost:3000/stores').then((res)=>{
        return res.data
      });
      return stores 
    }catch(err){
      console.log(`Error getting stores: ${err}`)
    }
    }
  };
  