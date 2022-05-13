<template>
    <div class="store-list-div-container" id="store-list-div-container">
        <!--  -->
                           <div v-if="showModal === true">
                            <PinModal
                            @resFromModal="modalAnswer"
                            />
                            </div>
        <!--  -->
       <div class='list-and-controls-div'>
             <div class="list-switch-container">
                <ListSorter
                @sorterChange="sorterHandle"
                />
            </div>
        <!--  -->
            <div>
                <div class="store-list-div">
                <div class="store-group-div" v-for="storeGroup in this.displayedStores" :key="storeGroup.setMarkerClass">
                 <div v-if="storeGroup.stores.length > 0"> <!-- THIS DIV CHECKS IF THERE ARE STORES THAT FIT THE GIVEN CRITERIA -->
                <div class='list-marker-row'>
                <div :class="storeGroup.setMarkerClass"></div>
                </div>
                <div class="store-row-div">
                <!--  -->    
                <div  class='store-list-inner-div' v-for="store in storeGroup.stores" v-bind:key="store.id">
                   <p @click="launchModal" class='store-address'>{{store.storeAddress}}</p>
                    <p class="store-title">{{store.storeName}}</p> <!-- Sends ID of clicked store into function -->
                    <p class='list-window-profit-metric'>{{returnProfitMetric(store)}}</p>
                    <hr class="between-notes-hr">

                    <div class="list-notes-column"> 
                    <div  v-for="noteRow in store.storeNotes" :key="noteRow.noteId">
                        <div class='list-note-row'>
                        <p>{{noteRow.noteLeft}}</p><p class="note-spacer"> | </p>
                        <p>{{noteRow.noteMiddle}}</p><p class="note-spacer"> | </p>
                        <p>{{noteRow.noteRight}}</p>
                    </div>
                   </div>
                   </div>   
                    <hr class="between-notes-hr">
                    <div :class="timeDivCalc(store)">
                                                        <!-- Using Vue.js mixin from General.js to calculate days ago value -->
                        <p class="store-time">{{`Last Visited ${$_daysAgo(store.lastVisited)} days ago`}}</p>
                    </div>                
                    <button class='edit-store-btn' @click="editTrayRefresh(store)">Edit</button> <!-- Sends ID of clicked store into function -->
                </div>
                <!--  -->
                </div>
                <!--  -->
                </div>
                <!--  -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import PinModal from '../components/PinModal.vue';
import General from '../helpers/mixins/General';
import ListSorter from '../components/ListSorter.vue';

export default {
    name: 'StoreList',
    components:{
        PinModal,
        ListSorter,
    },
    mixins: [General],
    props: ['fullList'],
    data(){
       return{
        storesLocal: [],
        displayedStores: [],
        colorList: ['bluePin', 'redPin', 'greenPin', 'greyPin', 'yellowPin', 'orangePin', 'purplePin'],
        statusList: ['redPin', 'yellowPin', 'greenPin'],
        showModal: false,
        listMode: 'STATUS_SORT',
        topStatus: 'redPin',
        topColor: 'bluePin',
      }
    },
      computed: {
          ...mapState('storedata', {
      storesData: state => state.stores
    }),
      },
        methods:{
            returnProfitMetric(storeObj){
                let profitData = this.$_genProfitData(storeObj);
                return profitData.profitAverage;
            },
            async sortComp(){
                switch(this.listMode){
                    case 'COLOR_SORT':
                        this.$nextTick(()=>{
                            this.displayedStores = this.calculateColors();
                        });
                    break;
                    case 'STATUS_SORT':
                        this.$nextTick(()=>{
                            this.displayedStores = this.calculateTimes();
                        });
                    break;
                }
            },
            calculateColors(){
                let forDisplayed = [];
                    if(this.fullList !== null){
                        let storeSet = [];
                        forDisplayed = this.colorList.map((color)=>{
                            storeSet = this.fullList.filter((store)=>{
                                if(store.markerColor === color){
                                    return store;
                                }
                            });
                            let packedSet = {
                                stores: storeSet,
                                setMarkerClass: color, 
                            }
                            return packedSet;
                        });
                    }
                    let sortColor = this.topColor
                        forDisplayed.sort(function(a,b){
                            if(a.setMarkerClass !== sortColor || b.setMarkerClass === sortColor){
                                return 1
                            }
                            if(a.setMarkerClass === sortColor && b.setMarkerClass !== sortColor){
                                return -1
                            }
                        });
                return forDisplayed;
            },
            calculateTimes(){
                let forDisplayed = [];
                    if(this.fullList !== null){
                        let storeSet = [];
                        forDisplayed = this.statusList.map((statusColor)=>{
                            storeSet = this.fullList.filter((store)=>{
                                let status = this.$_genPinStoplight(store);
                                if(status === statusColor){
                                    return store;
                                }
                            });
                            let packedSet = {
                                stores: storeSet,
                                setMarkerClass: statusColor, 
                            }
                            return packedSet;
                        });
                    }
                let sortStatus = this.topStatus;
                    forDisplayed.sort(function(a,b){
                        if(a.setMarkerClass !== sortStatus || b.setMarkerClass === sortStatus){
                            return 1
                        }
                        if(a.setMarkerClass === sortStatus && b.setMarkerClass !== sortStatus){
                            return -1
                        }
                    });         
                return forDisplayed;
            },
            sorterHandle(payload){
                console.log(payload);
                let potentialMode = payload.mode;
                let potentialColor = payload.color;
                let potentialStatus = payload.status;
                console.log(potentialStatus);
                if(potentialMode !== undefined){
                    this.listMode = potentialMode;
                }
                if(potentialColor !== undefined){
                    this.topColor = potentialColor;
                }
                if(potentialStatus !== undefined){
                    this.topStatus = potentialStatus;
                }
                this.sortComp();
            },
      ...mapActions('storedata', [
             'createStore',
             'updateStores'
            ]),
      ...mapGetters('storedata', [
            'storesGetter'
            ]),
        launchModal(){
            this.showModal = true;
        },
        editTrayRefresh(storeToEdit){
            this.$emit('editTraySignal', {idOfSelected: storeToEdit.storeId});
        },
        timeDivCalc(storeData){
            let classVal = this.$_genStoplight(storeData);



            return classVal;
        },
       
        //Runs on component creation
        async getStores(){
          //Resetting Component State
              this.storesLocal=[];
          //Saving Global State into component State
          this.storesLocal = await this.storesGetter();
        },



},

    created(){
      //Loads in stores from global state upon creation of component 
      //this.getStores();
      this.storesLocal = this.fullList;


      
    },
    mounted(){
        setTimeout(() => {
            this.sortComp();
        }, 500);
    }
 
  
}
</script>

<style scoped>
.list-switch-container{
    width: 90%;
    box-sizing: border-box;
    box-shadow: inset 0px 0px 5px 3px rgba(32, 32, 32, 0.4);
    border-radius: 100px;
    
}
.list-and-controls-div{
    display: flex;
    flex-direction: column;
    width: 100vw;
    flex-wrap: wrap;
    
}
.store-list-div{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 95%;
}
.store-group-div{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 95%;
}
.store-row-div{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
}
.store-list-inner-div{
    display: flex;
    box-sizing: border-box;
    width: 340px;
    height: 440px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-content: space-evenly; 
    word-wrap: break-word;
    padding: 14px;
    margin: 17px;
    box-sizing: border-box;
    border-radius: 28px;
    margin-bottom: 10px;
   /*  width: inherit; - not sure what this does */
    color: rgb(255, 255, 255);
    backdrop-filter: blur(3px);

   background-color: rgba(9, 41, 61, 0.25);
   box-shadow: 0px 0px 5px 2px rgba(7, 51, 99, 0.59);
   transition: scale .15s ease-in-out;
}
.store-list-inner-div:hover{
    scale: .98;
    }
.store-title{
    font-family: Mont2;
    letter-spacing: 2.7px;
    font-size: 21px;
    margin: 2px;
    height: 4%;
    text-align: center;
    padding: 2px;
    color: #fff;
    -webkit-text-stroke-width: .04rem;
    -webkit-text-stroke-color: rgba(47, 47, 47, 0.33);
}
.list-window-profit-metric{
            font-family: Mont2;
            font-size: 21px;
            height: 2%;
            z-index: 5;
            letter-spacing: 2.5px;
            
            color: aliceblue;
            -webkit-box-shadow:  0px 0px 11px 5px rgba(83, 113, 145, 0.17); 
            box-shadow:   0px 0px 11px 5px rgba(79, 109, 141, 0.17);
    }
.store-address{
    font-family: Mont;
    justify-content: center;
    align-content: center;
    align-items: center;
    font-weight: bolder;
    word-wrap: break-word;
    height: 5%;
    padding: 3px;
    letter-spacing: 1.7px;
    font-style: italic;
    font-size: 14px;
    border-radius: 12px;
    -webkit-box-shadow: 0px 0px 22px 5px rgba(9, 153, 255, 0.05);
    -moz-box-shadow: 0px 0px 22px 5px rgba(9, 153, 255, 0.05);
    box-shadow:  0px 0px 22px 5px rgba(9, 153, 255, 0.05);
     color: rgb(57, 173, 223);
}
.store-address:hover{
    font-family: Mont;
    justify-content: center;
    align-content: center;
    align-items: center;
    font-weight: bolder;
    word-wrap: break-word;
    padding: 3px;
    font-size: 14px;
    border-radius: 32px;
    -webkit-box-shadow: 0px 0px 52px 5px rgba(9, 153, 255, 0.11);
    -moz-box-shadow:    0px 0px 52px 5px rgba(9, 153, 255, 0.11);
    box-shadow:  0px 0px 52px 5px rgba(9, 153, 255, 0.11);
    color: rgb(40, 191, 255);
}
        .list-notes-column{

                height: 45%;
                width: 100%;
                overflow-y: hidden;
                -webkit-box-shadow: inset 0px 0px 11px 5px rgb(17, 41, 54, .39);
                -moz-box-shadow: inset 0px 0px 11px 5px rgb(17, 41, 54, .39);
                box-shadow: inset 0px 0px 11px 5px rgb(17, 41, 54, .39);
        }
        .list-notes-column:hover{
            overflow-y: scroll;
        }
        .list-note-row{
            margin-left: 17px;
            margin-right: 17px;
            font-family: Mont2;
            font-size: 15px;
            word-break: break-all;
            justify-content: space-evenly;
            display: flex;
            flex-direction: row;
        }
.between-notes-hr{
    width: 100%;
    margin: 0;
    border-color: rgba(33, 49, 80, 0.2);
    border-style: solid;
}
.edit-store-btn{
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 28px;
    box-shadow: inset 0px 0px 9px 1px rgba(0, 0, 0, 0.9);
    border-style: none;
    font-family: Mont2;
    letter-spacing: 5px;
    width: 80%;
    font-size: 19px;
    padding: 12px;
    color: #fff;
    -webkit-text-stroke-width: .04rem;
    -webkit-text-stroke-color: rgba(47, 47, 47, 0.33);
}
.edit-store-btn:hover{
    background-color: rgba(0, 0, 0, 0.2);
    -webkit-text-stroke-width: .04rem;
    -webkit-text-stroke-color: rgba(47, 47, 47, 0);
}
/* Time Div */
.time-div-green{
   margin: 10px;
   word-wrap: break-word;
   padding: 7px;
   width: 87%;
   border-radius: 35px;
   border-style: none;
   background-color: rgba(6, 183, 0, 0.2);
   box-shadow: inset 0px 0px 9px 1px rgba(9, 43, 44, 0.50);
}
.store-time{
    font-family: Mont2;
    word-wrap: break-word;
    font-weight: bolder;
    padding: 5px;
    font-size: 15px;
    margin: 5px;
    letter-spacing: 1.7px;
}
.time-div-yellow{
    margin: 10px;
   word-wrap: break-word;
   padding: 7px;
   width: 87%;
   border-radius: 35px;
   border-style: none;
   background-color: rgba(133, 148, 1, 0.2);
   box-shadow: inset 0px 0px 9px 1px rgba(12, 22, 22, 0.47);

}
.time-div-red{
   margin: 10px;
   word-wrap: break-word;
   padding: 7px;
   width: 87%;
   border-radius: 35px;
   border-style: none;
   background-color: rgba(148, 1, 1, 0.3);
   box-shadow: inset 0px 0px 9px 1px rgba(12, 22, 22, 0.57);


}
.list-marker-row{
        width: 100%;
        justify-content: center;
        display: flex;
}



/* Any Computer Screen */
@media screen and (min-device-width: 821px){ 
  
}
/* TABLETS */
@media screen and (min-device-width: 481px) and (max-device-width: 820px) { 
    
}
/* Phone Screens */
@media only screen and (max-device-width: 480px) {
    .list-switch-container{
        width: 90%;
        box-sizing: border-box;
        box-shadow: inset 0px 0px 5px 3px rgba(32, 32, 32, 0.4);
        border-radius: 55px;
        padding-left: 10px;
        padding-right: 10px;
    }
    .store-list-inner-div{
        width: 90%;
    }

    
}





 /* icon imports */
    .bluePin{
        filter: opacity(.95);
        background-image: url('../assets/map-icons/blue-pin.png');
        height: 79px;
        width: 79px;
        background-repeat: no-repeat;
        background-position: center;
        align-self: center;
        background-color: rgba(1, 46, 98, 0.21);
        box-shadow: inset 0px 0px 17px 8px rgba(0, 0, 0, 0.17);
        border-radius: 11px;
        backdrop-filter: blur(4px);
        margin-top: 17px;
        padding: 5.9px;
        background-color: rgba(9, 41, 61, 0.25);
    }
    .greenPin{
        filter: opacity(.95);
        background-image: url('../assets/map-icons/green-pin.png');
        height: 79px;
        width: 79px;
        background-repeat: no-repeat;
        background-position: center;
        align-self: center;
        background-color: rgba(1, 46, 98, 0.21);
        box-shadow: inset 0px 0px 17px 8px rgba(0, 0, 0, 0.17);
        border-radius: 11px;
        backdrop-filter: blur(4px);
        margin-top: 17px;
        padding: 5.9px;
        background-color: rgba(9, 41, 61, 0.25);
    }
    .greyPin{
        filter: opacity(.95);
        background-image: url('../assets/map-icons/grey-pin.png');
        height: 79px;
        width: 79px;
        background-repeat: no-repeat;
        background-position: center;
        align-self: center;
        background-color: rgba(1, 46, 98, 0.21);
        box-shadow: inset 0px 0px 17px 8px rgba(0, 0, 0, 0.17);
        border-radius: 11px;
        backdrop-filter: blur(4px);
        margin-top: 17px;
        padding: 5.9px;
        background-color: rgba(9, 41, 61, 0.25);
    }
    .orangePin{
        filter: opacity(.95);
        background-image: url('../assets/map-icons/orange-pin.png');
        height: 79px;
        width: 79px;
        background-repeat: no-repeat;
        background-position: center;
        align-self: center;
        background-color: rgba(1, 46, 98, 0.21);
        box-shadow: inset 0px 0px 17px 8px rgba(0, 0, 0, 0.17);
        border-radius: 11px;
        backdrop-filter: blur(4px);
        margin-top: 17px;
        padding: 5.9px;
        background-color: rgba(9, 41, 61, 0.25);
    }
    .purplePin{
        filter: opacity(.95);
        background-image: url('../assets/map-icons/purple-pin.png');
        height: 79px;
        width: 79px;
        background-repeat: no-repeat;
        background-position: center;
        align-self: center;
        background-color: rgba(1, 46, 98, 0.21);
        box-shadow: inset 0px 0px 17px 8px rgba(0, 0, 0, 0.17);
        border-radius: 11px;
        backdrop-filter: blur(4px);
        margin-top: 17px;
        padding: 5.9px;
        background-color: rgba(9, 41, 61, 0.25);
    }
    .redPin{
        filter: opacity(.95);
        background-image: url('../assets/map-icons/red-pin.png');
       height: 79px;
        width: 79px;
        background-repeat: no-repeat;
        background-position: center;
        align-self: center;
        background-color: rgba(1, 46, 98, 0.21);
        box-shadow: inset 0px 0px 17px 8px rgba(0, 0, 0, 0.17);
        border-radius: 11px;
        backdrop-filter: blur(4px);
        margin-top: 17px;
        padding: 5.9px;
        background-color: rgba(9, 41, 61, 0.25);
    }
    .yellowPin{
        filter: opacity(.95);
        background-image: url('../assets/map-icons/yellow-pin.png');
        height: 79px;
        width: 79px;
        background-repeat: no-repeat;
        background-position: center;
        align-self: center;
        background-color: rgba(1, 46, 98, 0.21);
        box-shadow: inset 0px 0px 17px 8px rgba(0, 0, 0, 0.17);
        border-radius: 11px;
        backdrop-filter: blur(4px);
        margin-top: 17px;
        padding: 5.9px;
        background-color: rgba(9, 41, 61, 0.25);
    }
</style>