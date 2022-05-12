<template>
   <div class='store-pin-window' id='store-pin-window'>
     <div v-if="this.showModal === true">
     <PinModal
      @resFromModal="modalAnswer"
     />
    </div>
            <div class="pin-content">
            <p class='store-pin-title' id='store-pin-title'>{{this.selectedStore.storeName}}</p>
            <p @click="launchModal" class='store-address-link' id='store-pin-title'>{{this.selectedStore.storeAddress}}</p>
             <h1 :class="this.timeClass">{{this.daysAgo}}</h1>
             <button @click='this.populateEditWindow' class='store-pin-edit' id='store-pin-edit'>Edit Store</button>
             <hr>
             <p>Notes</p>           
              <div v-for="noteRow in this.selectedStore.storeNotes" :key="noteRow.noteId">
                <div class='pin-window-note-row'>
                  <p>{{noteRow.noteLeft}}</p><p class="note-spacer"> | </p>
                  <p>{{noteRow.noteMiddle}}</p><p class="note-spacer"> | </p>
                  <p>{{noteRow.noteRight}}</p>
              </div>
              <hr>
              </div>
              </div>
        </div>
</template>

<script>
import { mapState } from 'vuex';
import General from '../helpers/mixins/General';
import PinModal from '../components/PinModal.vue';

export default {
  name: 'EditWindow',
  components: {
    PinModal
  },
  mixins: [General],
  props: [
      'injectedId',
      ],
  data(){
      return{
        selectedStore: {},
        timeClass: '',
        daysAgo: '',
        showModal: false,
      }
    },
  watch:{
    injectedId(){
      this.selectedStore = this.storesData.find((store)=>{
                  return store.storeId === this.injectedId;
              });
      this.refreshClock();
      this.refreshDaysCount();
    }
  },
  computed: mapState('storedata', {
      storesData: state => state.stores
    }),
 methods:{
      populateEditWindow(){
        this.$emit('loadEditTray', {idOfSelected: this.selectedStore.storeId});
      },
      refreshDaysCount(){
            this.daysAgo='';
            let count = this.$_daysAgo(this.selectedStore.lastVisited);
            this.daysAgo = `Last Visited ${count} days ago`;
        },
      refreshClock(){
            this.timeClass = '';
            let classHalf = this.$_genStoplight(this.selectedStore);
            this.timeClass = `pin-window-${classHalf}`;
            this.$forceUpdate();
        },
      launchModal(){
        this.showModal = true;
      },
      modalAnswer(eve){
        if(eve.modalAnswer){
          this.showModal = false;
          this.launchExternalMap();
        }else{
          this.showModal = false;
        }
      },
      launchExternalMap(){
        let latVal = this.selectedStore.position.lat;
        let lonVal = this.selectedStore.position.lng;
        window.location.href = `https://www.google.com/maps/search/?api=1&query=${latVal}%2C${lonVal}`;
      },
 },


  created(){
    this.selectedStore = this.storesData.find((store)=>{
            return store.storeId === this.injectedId;
        });
    this.refreshClock();
    this.refreshDaysCount();
  },
}
</script>

<style>

.pin-window-note-row{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.store-pin-title{
  font-family: Mont2;
  font-size: 15px;
  color: rgb(0, 20, 50);
}
.store-address-link{
  font-family: Mont;
  text-decoration: underline;
  font-size: 15px;
  color: rgb(0, 123, 205);
}
.store-address-link:hover{
  color: rgb(66, 170, 240);
  transform: scale(1.005);
}
.note-spacer{
  padding-left: 10px;
  padding-right: 10px;
}
/* Time Div */
        .pin-window-time-div-green{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 10px;
            max-width: 700px;
            word-wrap: break-word;
            font-size: 14px;
            padding: 10px;
            border: .5px solid;
            border-radius: 35px;
            /*  width: inherit; - not sure what this does */
            color: #fff;
            background-color: rgba(6, 148, 1, 0.45);
            box-shadow: 1px 2px 5px 2px rgba(255, 255, 255, 0.4);
        }
        .pin-window-time-div-yellow{
            background-color: rgba(133, 148, 1, 0.45);
        }
        .pin-window-time-div-red{
            background-color: rgba(148, 1, 1, 0.45);
        }
</style>