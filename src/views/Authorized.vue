<template>
  <div class="main-div">
    <div class="dashboard">

     

        <label class="switch-hero">
                <input class="switch-input-hero" type="checkbox" id='viewSwitch' @click="viewSwitch">
                <span class="slider-hero">View</span>
        </label>

    </div>
<div class="map-container" id="map-container">
    <GoogleMap
    :key='this.refreshMapInc'
    @editTraySignal="loadEditTray" 
    @refreshList="masterListRefresh"
    />
    <div class="logout-btn-div">
    <button id="logout-btn" class="logout-btn" @click="logoutClick">Log Out</button>
    </div>
</div>
    <StoreList
        @editTraySignal="loadEditTray" 
        :class="this.storeListCont" 
        id="store-list-container"
        :fullList="this.fullList"
        :key="this.refreshListInc"
        />

  <div v-if="this.editSwitch === true" >
    <div class="edit-window-conditional">
      <EditWindow
            @closeEditWindow="this.closeEditWindow"
            @refreshAfterRemove="this.refreshAfterRemove"
            @refreshList="this.masterListRefresh" 
            :id2Edit="this.injectedId"
            :key="this.injectedId"
          />
      </div>
</div>
<!--         AIzaSyDEDm7wbT2wyFn2AGKfhBh8RsYNMjjJ_-o     Google maps API key under kylewazhere14@gmail.com-->
<!-- AIzaSyB64BTq9-MAtCEYQSYqxGs1dsqH5oJgxH4                 -->
  <div class='bg-div'></div>
  </div>
</template>


<script>

import GoogleMap from '../components/GoogleMap.vue';
import StoreList from '../components/StoreList.vue';
import EditWindow from '../components/EditWindow.vue';
import { mapGetters, mapActions } from 'vuex';
import storesDb from '../helpers/mixins/storesDb';


export default {
  name: 'Authorized',
  mixins: [storesDb],
  components: {
    GoogleMap,
    StoreList,
    EditWindow,
  },
 data(){
     return{
         storeView: false,
         injectedId: '',
         editSwitch: false,
         refreshMapInc: 0,
         refreshListInc: 0,
         fullList: null,
         displayList: true,
         storeListCont: 'store-list-container-completely-hide'
     }
 },


methods:{
    ...mapGetters('storedata', [
        'storesGetter'
    ]),
    ...mapActions('storedata', [
      'updateStores'
    ]),
    viewSwitch(){
    const storeListCont = document.getElementById('store-list-container');
    const mapCont = document.getElementById('map-container');
    const logOut = document.getElementById('logout-btn');
    /////////////////////
    if(this.storeView === false){
        this.storeListCont = 'store-list-container'
        let interval = setInterval(()=>{
                    clearInterval(interval);
          mapCont.classList.add('hide');  
          storeListCont.classList.add('show');
          logOut.classList.add('hide');
          this.storeView=true;
        }, 3)
        
    }else if(this.storeView===true){
        mapCont.classList.remove('hide');
        storeListCont.classList.remove('show');
        logOut.classList.remove('hide');
        this.storeView=false;
       let interval = setInterval(()=>{
                    clearInterval(interval);
          this.storeListCont = 'store-list-container-completely-hide'
        }, 1111);
    } 
    },
    closeEditWindow(){
      this.editSwitch = false;
      this.$forceUpdate();
    },
    logoutClick(){
        console.log('logout button clicked');
    },
    loadEditTray(event){
      this.editSwitch = true;
      this.injectedId = event.idOfSelected;
    },
    async storeGet(){
      return await this.$_getStores();
    },
    masterListRefresh(){
          setTimeout(()=>{
            this.storeGet().then((res) =>{
                    this.$nextTick(()=>{
                        this.fullList = res.data;
                        this.refreshListInc++;
            });           
          });
       }, 300);
    },
    refreshAfterRemove(){
      //Method 1, force dom refresh
      window.location.reload();
    }
},
created(){
  this.masterListRefresh();
},



}



</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');
@font-face {
  font-family: Mont;
  src: url('~@/assets/fonts/Montserrat-Regular.ttf');
}
@font-face {
  font-family: Mont2;
  src: url('~@/assets/fonts/Montserrat-Light.ttf');
}
.main-div{
    box-sizing: border-box;
}
.dashboard{
  position: sticky;
  display: flex;
  justify-content: center;
  width: 100vw;
}
.bg-div{
  background-image: url('../assets/images/bg-image-5.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  position: fixed;
  top: 0; left: 0; bottom: 0; right: 0;
  z-index: -10;
  filter: blur(0px);
  /*  */
  box-shadow: 4px 0px 23px 7px rgba(46,46,46,0.58) inset;
  -webkit-box-shadow: 4px 0px 23px 7px rgba(46,46,46,0.58) inset;
  -moz-box-shadow: 4px 0px 23px 7px rgba(46,46,46,0.58) inset;

}

/* The switch START - the box around the slider */
.switchCont-hero{
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  margin-top: 10px;
  margin-bottom: 20px;
}
.switchTitle-hero{
  font-size: 14px;
  font-family: Mont2;
  
}
.switch-hero{
    position: relative;
    display: inline-block;
    width: 150px;
    height: 24px;
    padding: 15px;
    transform: translateX(-3px);
    margin-bottom: 21px;
  }
  
  /* Hide default HTML checkbox */
  .switch-input-hero{
    opacity: 0;
    
    width: 0;
    height: 0;
    /*  */
    
  }
  /* The slider */
  .slider-hero{
    position: absolute;
    
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(161, 161, 161, 0.03);
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 32px;
    padding-top: 17px;
      font-family: Mont;
    color: rgb(34, 77, 90);

    /*  */
    -webkit-box-shadow: inset 0px 0px 7px 3px #000000; 
    box-shadow: inset 0px 0px 7px 3px #000000;
  }
  
  .slider-hero:before {
    position: absolute;
    content: "";
    height: 7px;
    width: 7px;
    left: 11px;
    bottom: 8px;
    background-color: rgba(249, 249, 249, 0.3);
    -webkit-transition: 1.1s;
    transition: 1.1s;
    padding: 15px;
    border-radius: 32px;
     /*  */
    -webkit-box-shadow: 0px 0px 7px 3px #000000; 
    box-shadow: 0px 0px 7px 3px #000000;
  }
  
  .switch-input-hero:checked + .slider-hero{
    background-color: rgba(237, 237, 237, 0.2);
  }
  
  .switch-input-hero:focus + .slider-hero{
    box-shadow: 1 1 1px #2196F3;
  }
  
  .switch-input-hero:checked + .slider-hero:before {
    -webkit-transform: translateX(120px);
    -ms-transform: translateX(120px);
    transform: translateX(120px);
  }
  /* Switch END */

/* Animation div's */
.edit-window-conditional{
  position: fixed;
  width: 100%;
  -webkit-animation: editFadeIn .5s ease-out;
    animation: editFadeIn .5s ease-out;

}
@keyframes editFadeIn {
   from{
          transform: translateY(30%);
          -webkit-filter: opacity(10%) blur(51px);
          filter: opacity(0%) blur(51px);

        }
    to{
          transform: translateY(0%);

       -webkit-filter: opacity(100%) blur(0px);
        filter: opacity(100%) blur(0px);

    }
}
.map-container{
    width: 95vw;
    height: 55vh;
    box-shadow: 2px 3px 5px 3px rgba(32, 32, 32, 0.4);
    position: fixed;
    visibility: visible;
    transform: translateX(2vw);
    transition: transform 1s ease-in-out;
    }
.map-container.hide{
   transform: translateX(105vw);
   }
.store-list-container{
    top: calc(100vh - 90vh);
    position: absolute;
    visibility: visible;
    transform: translateX(-100vw);
    transition: transform 1s ease-in-out;
}
.store-list-container.show{
    transform: translateX(4vw);
}
.store-list-container-completely-hide{
    top: calc(100vh - 77vh);
    position: fixed;
    visibility: hidden;
    transform: translateX(-100vw);
    transition: transform 1s ease-in-out;
    overflow: hidden;
}
/* Logout button */
.logout-btn-div{
    position: relative;
    top: 105%;
    left: 35%;
}
    .logout-btn{
        display: flex;
        justify-content: center;
        padding: 10px;
        width: 30vw;
        scale: .8;
        border-radius: 20px;
        color: rgba(4, 72, 72, 0.8);
        background-color: rgba(235, 235, 235, 0.49);
        backdrop-filter: blur(2px);
        border: none;
        box-shadow: 0 0 21px 5px rgba(218, 218, 218, 0.35);
        transition: scale .9s;
        visibility: visible;

    }
    .logout-btn.hide{
        scale: 0;
    }
    .logout-btn:hover{
        display: flex;
        scale: .9;
        justify-content: center;
        padding: 10px;
        border-radius: 20px;
        color: rgba(255, 255, 255, 0.49);
        background-color: rgba(0, 128, 128, 0.49);
        border: none;
        box-shadow: 0 0 8px 5px rgba(219, 219, 219, 0.3);
        transition: scale .9s;
    }


/* Any Computer Screen */
@media screen and (min-device-width: 821px){ 
     
   
  
 

}
/* TABLETS */
@media screen and (min-device-width: 481px) and (max-device-width: 820px) { 
     
          

}
/* Phone Screens */
@media only screen and (max-device-width: 480px) {
    .store-list-container.show{
    transform: translateX(3vw);
    overflow-y: scroll;
    overflow-x: hidden;
        }
    .map-container{
      transform: translateX(0.5vw);
        }
        .switch-hero{
          
          transform: translateX(-3px);
        }

}
</style>