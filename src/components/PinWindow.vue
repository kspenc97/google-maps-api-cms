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
             <p>Average profit: {{this.returnProfitMetric(this.selectedStore)}}</p>           
             <p>Notes</p>           
              <div class='notes-area-pin-window' v-for="noteRow in this.selectedStore.storeNotes" :key="noteRow.noteId">
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
      returnProfitMetric(storeObj){
                let profitData = this.$_genProfitData(storeObj);
                return profitData.profitAverage;
            },
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
  color: rgba(0, 20, 50, 0.9);
  background-color: rgba(8, 127, 246, 0.1);
  border-radius: 40px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 9px;
  padding-bottom: 9px;
  box-shadow: inset 0px 0px 5px 1px rgba(5, 38, 40, 0.85); 
}
.store-address-link{
  font-family: Mont;
  text-decoration: underline;
  font-size: 15px;
  color: rgb(0, 123, 205);
  background-color: rgba(8, 127, 246, 0.1);
  border-radius: 40px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 9px;
  padding-bottom: 9px;
  box-shadow: inset 0px 0px 5px 1px rgba(5, 38, 40, 0.85);
}
.store-address-link:hover{
  color: rgb(66, 170, 240);
  transform: scale(1.005);
}
.store-pin-edit{
  background-color: rgba(8, 127, 246, 0.5);
  font-size: 21px;
  border-style: none;
  background-color: rgba(8, 127, 246, 0.3);
  border-radius: 40px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 9px;
  padding-bottom: 9px;
  box-shadow: inset 0px 0px 7px 1px rgba(5, 38, 40, 0.85);
}
.store-pin-edit:hover{
    background-color: rgba(0, 88, 133, 0.5);
    box-shadow: inset 0px 0px 3px 1px rgba(5, 38, 40, 0.85);
}
.notes-area-pin-window{
    border-radius: 1px;
    font-family: Mont;
    box-shadow: inset 0px 0px 7px 2px rgba(5, 38, 40, 0.9);
    padding: 9px;
}
.note-spacer{
  padding-left: 10px;
  padding-right: 10px;
}
/* Time Div */
        .pin-window-time-div-green{
            font-family: Mont2;
            font-size: 17px;
            display: flex;
            flex-direction: column;
            color: rgba(17, 17, 17, 0.8);
            margin: 15px;
            word-wrap: break-word;
            padding-left: 34px;
            padding-right: 34px;
            padding-top: 9px;
            padding-bottom: 9px;
            border-radius: 40px;
            border-style: none;
            background-color: rgba(7, 201, 0, 0.4);
            box-shadow: inset 0px 0px 7px 2px rgba(5, 38, 40, 0.85);
        }
        .pin-window-time-div-yellow{
            font-family: Mont2;
            font-size: 17px;
            display: flex;
            flex-direction: column;
            color: rgba(17, 17, 17, 0.8);
            margin: 15px;
            word-wrap: break-word;
            padding-left: 34px;
            padding-right: 34px;
            padding-top: 9px;
            padding-bottom: 9px;
            border-radius: 40px;
            border-style: none;
            background-color: rgba(133, 148, 1, 0.45);
            box-shadow: inset 0px 0px 7px 2px rgba(5, 38, 40, 0.85);
        }
        .pin-window-time-div-red{
          font-family: Mont2;
            font-size: 17px;
            display: flex;
            flex-direction: column;
            color: rgba(17, 17, 17, 0.8);
            margin: 15px;
            word-wrap: break-word;
            padding-left: 34px;
            padding-right: 34px;
            padding-top: 9px;
            padding-bottom: 9px;
            border-radius: 40px;
            border-style: none;
            background-color: rgba(148, 1, 1, 0.45);
            box-shadow: inset 0px 0px 9px 2px rgba(5, 38, 40, 0.85);
        }
</style>