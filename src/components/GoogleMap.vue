<template>
  <div>
    <StoplightSwitchMap 
      @StoplightMapChange="catchMapMode"
    />
    <div v-if="this.pin_mode_for_map === false">
      <GmapMap
        :center="{lat:39.720043, lng:-104.991531}"
        :zoom="10"
        :key="this.pin_mode_for_map"
        map-type-id="terrain"
        @click="makeMarker"
        class='map-class'
        >
      <GmapMarker
        :key="index"
        v-for="(m, index) in this.markersLocal"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        :icon="genMarker(m)"
        @click="onMarkerClick"
        />
  <div v-if="infoWindow.open === true">
     <gmap-info-window
        :options="{
          maxWidth: 300,
          pixelOffset: { width: 0, height: -35 }
        }"
        :position="infoWindow.position"
        :opened="infoWindow.open"
        @closeclick="infoWindow.open=false">
          <PinWindow 
              :injectedId="forWindowData.storeId"
              @loadEditTray="editTrayRefresh"
          />

        

    </gmap-info-window>
</div>
  <gmap-polygon :paths="paths"></gmap-polygon>
</GmapMap>
</div>
<!--  -->
<!--  -->
<!--  -->
<div v-if="this.pin_mode_for_map === true">

    <GmapMap
  :center="{lat:39.720043, lng:-104.991531}"
  :zoom="10"
  :key="this.pin_mode_for_map"
  map-type-id="terrain"
  @click="makeMarker"
  class='map-class'
>
  <GmapMarker
    :key="index"
    v-for="(m, index) in this.markersLocal"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    :icon="genMarker(m)"
    @click="
    onMarkerClick
    "

  />

  <div v-if="infoWindow.open === true">
     <gmap-info-window
        :options="{
          maxWidth: 300,
          pixelOffset: { width: 0, height: -35 }
        }"
        :position="infoWindow.position"
        :opened="infoWindow.open"
        @closeclick="infoWindow.open=false">
          <PinWindow
              :injectedId="forWindowData.storeId"
              @loadEditTray="editTrayRefresh"
          />

        

    </gmap-info-window>
</div>
  <gmap-polygon :paths="paths"></gmap-polygon>
</GmapMap>







</div>
<!--  -->
<!--  -->
<!--  -->

  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import storesDb from '../helpers/mixins/storesDb';
import General from '../helpers/mixins/General';
import PinWindow from './PinWindow.vue';
import StoplightSwitchMap from './StoplightSwitchMap.vue';
//import axios from 'axios';
/* eslint-disable no-unused-vars */
import bluePin from '../assets/map-icons/blue-pin.png'; 
import yellowPin from '../assets/map-icons/yellow-pin.png'; 
import greenPin from '../assets/map-icons/green-pin.png'; 
import redPin from '../assets/map-icons/red-pin.png'; 
import greyPin from '../assets/map-icons/grey-pin.png'; 
import purplePin from '../assets/map-icons/purple-pin.png'; 
import orangePin from '../assets/map-icons/orange-pin.png'; 


export default {
    name: "GoogleMap",
    mixins: [storesDb, General],
    components:{
      PinWindow,
      StoplightSwitchMap
    },
    data(){
      return{
        infoWindow: {
          position: {lat: 0, lng: 0},
          open: false,
          //template: ''
        },
        // False value will be stoplight mode
        pin_mode_for_map: false,
        forWindowData: {},
        markerTemp: [],
        markersLocal: [],
        center: {lat: 39.742, lng: -104.991},
        paths: [],

      }
    },
    watch:{
        infoWindow: {
            handler(){
         
            },
            deep: true
        }
    },
    computed: mapState('storedata', {
      storesData: state => state.stores
    }),
    methods:{
      ...mapActions('storedata', [
      'createStore',
      'updateStores'
    ]),
      ...mapGetters('storedata', [
        'storesGetter'
    ]),
    ////////////////// TOOLS
    ////////////////// TOOLS
    ////////////////// TOOLS
    //
    /////////////////////////////////////////////////////////////////////////
    // Only saves the Local displayed to the global state at any given time
    saveLocalToState(){
        this.updateStores(this.markersLocal);
        
      },
    /////////////////////////////////////////////////////////////////////////
    // Only for clearling local markers in UI, won't touch global state
    clearLocalMap(){
        this.paths=[];
        this.markersLocal = [];
      },
    /////////////////////////////////////////////////////////////////////////
    // Only for logging global state stores at a given point
    logCurrentStores(){
        console.log(this.storesData);
      },
    /////////////////////////////////////////////////////////////////////////
    //Only for logging directions between 2 points
    drawDirection(){
        //this.paths = [home, work]
      },
    returnPin(colorToReturn){
      let markerOptions = {
        url: null
      }
        switch(colorToReturn){
          case 'bluePin':
              markerOptions.url = bluePin;
          break;
          case 'greenPin':
              markerOptions.url = greenPin;
          break;
          case 'greyPin':
              markerOptions.url = greyPin;
          break;
          case 'orangePin':
              markerOptions.url = orangePin;
          break;
          case 'purplePin':
              markerOptions.url = purplePin;
          break;
          case 'redPin':
              markerOptions.url = redPin;
          break;
           case 'yellowPin':
              markerOptions.url = yellowPin;
          break;
        }
      return markerOptions;
    },
    returnStoplightPin(currentPinData){
      let markerOptions ={
          url: null
      };
      let pinColorString = this.$_genPinStoplight(currentPinData);
        switch(pinColorString){
          case 'redPin':
            markerOptions.url = redPin;
          break;
          case 'yellowPin':
            markerOptions.url = yellowPin;
          break;
          case 'greenPin':
            markerOptions.url = greenPin;
          break;
        }
      return  markerOptions;
    },
    genMarker(currentPinData){
      if(this.pin_mode_for_map=== false){
          return this.returnPin(currentPinData.markerColor);
      } else{
          return this.returnStoplightPin(currentPinData);
      }

    },
    //////////////////////////////////////////////////////////////////////////
    //
    //
    ////////////////// TOOLS END
    ////////////////// TOOLS END
    ////////////////// TOOLS END
    //
    //This function loads all the global state and/or clicked markers into the map
      createStoreLocal(){
        this.markersLocal = [];
        // P-T-1---> Filling up local markers array for v-for loop
        //array is being filled by markerTemp[] as well as the current data for the store
        this.markerTemp.forEach((marker)=>{
              this.markersLocal.push(marker)
            });
        this.storesData.forEach((marker)=>{
          this.markersLocal.push(marker);
        });
        // P-T-2---> local que is cleared
        this.markerTemp = [];
        //PT 2:
        this.saveLocalToState();

      },
    catchMapMode(newMapMode){
      this.pin_mode_for_map = newMapMode.stoplightMapVal;
     
    },
    async getAddress(lat, lng){
      const geocodeAPI = 'AIzaSyDZLn7MXGkeh2kmHcnREkLRbZPXsQ3d4aQ';
      let address = await axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${geocodeAPI}`);
      return address.data.results[0].formatted_address;
    },
    async makeMarker(e){
      let markerId = uuidv4();
      // NOTES SYSTEM NEED ADD SUBTRACT
      let note1Id = uuidv4();
      let note2Id = uuidv4();
      let visitId = uuidv4();

      let currentTime = Date.now();
      let currentLat = e.latLng.lat();
      let currentLng = e.latLng.lng();
      let pinAddress = await this.getAddress(currentLat, currentLng);
      console.log(pinAddress);
      const marker = {
            storeName: 'store-name-here',
            storeAddress: pinAddress,
            profitList:[
              {
                visitDate: '',
                visitProfit: 0,
                visitId: visitId,
              }
            ],
            storeNotes: [
              {
                noteLeft: 'testLeft1',
                noteMiddle: 'testMiddle1',
                noteRight: 'testRight1',
                noteId: note1Id,
              },
              {
                noteLeft: 'testLeft2',
                noteMiddle: 'testMiddle2',
                noteRight: 'testRight2',
                noteId: note2Id,
              },
              ],
            position: {lat: e.latLng.lat(), lng: e.latLng.lng()},
            storeId: markerId,
            lastVisited: currentTime,
            tillRed: 14,
            tillYellow: 7,
            markerColor: 'bluePin',
            
            //icon: `/images/map-icons/fas fa-map-marker-alt fa-maroon.png`,
        };
        console.log('about to send..')
        console.log(marker);
        this.$_postStore(marker);
        this.markerTemp.push(marker);
        this.createStoreLocal();
        this.$emit('refreshList');


    },
    onMarkerClick(e){
      let clickedLng = e.latLng.lng();
      let clickedLat = e.latLng.lat();
      this.forWindowData = this.markersLocal.find((localMark)=>{
        if(localMark.position.lat === clickedLat && localMark.position.lng === clickedLng){
          return localMark
        }
      });
      console.log(this.forWindowData);
      this.openPinWindow();
      //Now that local state is set we can refresh the Pin window using that local state
    },
    openPinWindow() {
            // 1. Sets position using local state 'infoWindow{}' object
            this.infoWindow.position = {lat:this.forWindowData.position.lat, lng:this.forWindowData.position.lng}

            // 3. opens pin window
            this.infoWindow.open = true
        },
    //This is the function that pushes a new store into the edit tray
    editTrayRefresh(event){
        this.$emit('editTraySignal', {idOfSelected: event.idOfSelected});
        //2. Closing Pin Window on map
        this.infoWindow.open = false;
        },
    async getStores(){
          this.markersLocal = await this.storesGetter();
          // Saves gotten stores to global state
          //
          this.saveLocalToState();
          // Loads gotten stores into UI
          //
          this.createStoreLocal();      
    }
    },
    //End methods.
    //
    // HOOKS
    // HOOKS
    // HOOKS
    //
    created(){
      //Loads in stores from global state upon creation of component 
      this.getStores();
    },
    
  
 
}
</script>

<style>

.edit-tray-hero{
  color: aqua;
  background-color: blue;
  width: 500px;
}

.map-class{
    width: 95vw;
    height: 55vh;
    box-shadow: 2px 3px 5px 3px rgba(32, 32, 32, 0.4);
    position: fixed;
    visibility: visible;
}
</style>