<template>
<div>
        <div class="hand-mode-display-toggle">
                <button class="hand-btn-left" @click="handModeToggleLeft">Left Hand</button>
                <button class="hand-btn-right" @click="handModeToggleRight">Right Hand</button>
        </div>
<!-- LEFT -->
<!-- LEFT -->
  <div class='edit-window-pane' v-if="this.handMode === false">
        <div v-if="this.showModal === true">
            <EditModal
            :inboundVal="this.modalVal"
            @resFromModal="modalHandler"
            />
        </div>
      <div class='time-bar-edit-window'> <!-- TOP SQUARE START -->
    <div class='stoplight-inputs-outer'>
        <!-- 1-S -->
    <div v-if='this.changeAddy === false' class='name-address-container'>
        <button class="edit-address-btn" @click="openModal" value="edit_address_btn">Edit Address</button>
        <div>
        <label  for="store-name"></label><p class="store-name-label">{{selectedStore.storeName}}</p>
        </div> 
        <div>
        <label  for="store-address"></label><p class="store-address-label">{{selectedStore.storeAddress}}</p>
         </div>
      </div>
      <div v-if='this.changeAddy === true' class='name-address-container'>
        <button class="save-address-btn" @click="doneChangingAddress">Save Changes</button>
        <div>
        <label for="store-name"></label><input class="store-name-input" name="store-name" type="text" v-model="selectedStore.storeName" />
        </div>
        <div>
        <label for="store-name"></label><input class="store-address-input" name="store-name" type="text" v-model="selectedStore.storeAddress" />
        </div>
      </div>
    <!-- 1-E -->
    <!-- 2-S -->
      <div class="stoplight-inputs-inner">
      <div class="stoplight-input-div">
            <label class="stoplight-input-title" for="till-yellow">Days till yellow</label><input class="stoplight-input" name="till-yellow" type="text" v-model="selectedStore.tillYellow" />
      </div>
      <div class="stoplight-input-div">
           <label class="stoplight-input-title" for="till-red">Days till red</label><input class="stoplight-input" name="till-red" type="text" v-model="selectedStore.tillRed" />
      </div>
      </div>
       <!-- 2-E -->
    <!-- 3-S  -->
      <div class="above-timer-buttons">
      <button class='delete-store-btn' @click="openModal" value="delete_store_btn">Delete Store</button>
      <button class='reset-store-btn' @click="openModal" value="reset_timer_btn">Reset Timer</button>
      </div>
    <!-- 3-E -->
    <!-- 4-S -->
      </div>
              <hr class='phone-size-hrs'/>
       

      <div class='pin-and-status'><!--  -->
         <!-- PIN_ASSEMBLY -->
        <div class='pin-edit-div'>
          <div class='pin-title-and-pin'>
          <p class='icon-title'>Current Pin Color</p>
          <div :class='this.pinClass'></div>
          </div>
            <select 
              class='icon-selector' 
              name="icon-selector" 
              id="" 
              :value="selectedStore.markerColor" 
              @change.prevent="selectChange($event)" 
              v-model="selectedStore.markerColor"
            >
            <option value="placeholder" disabled selected>Select your option</option>
            <option value="bluePin">Blue</option>
            <option value="greenPin">Green</option>
            <option value="greyPin">Grey</option>
            <option value="orangePin">Orange</option>
            <option value="purplePin">Purple</option>
            <option value="redPin">Red</option>
            <option value="yellowPin">Yellow</option>
          </select>
          <hr class='pin-edit-hr'>
      </div>
        <!-- Pin_end  -->
        <div class='timer-and-close'>
            <div :class="this.timeClass">
            <p>{{this.daysAgo}}</p>
            </div>
            <button class="close-button" @click='closeEditWindow'>Close Window</button>
        </div>
      </div>
     
      </div><!-- TOP SQUARE END -->
        <hr class='phone-size-hrs'/>
        <div class='bottom-column-edit-window'>
        <div class='notes-and-profit'>
        
        <!-- PHONE BOX START -->
    <div class='edit-window-phone-box-bottom' >
        <div class="edit-window-phone-box-controls">
            <select 
                  class='phone-box-controls' 
                  @change.prevent="phoneEditModeChange($event)" 
                        >
                        <option value="placeholder" disabled>Select an option</option>
                        <option value="PHONE_BOX_DISPLAY_PROFITS" selected>Display Profits List</option>
                        <option value="PHONE_BOX_DISPLAY_NOTES">Display Notes List</option>
            </select>
        </div>
            <!-- 1 -->
          <div :class='this.phoneProfitColumn' >
              <div class="edit-window-profits-controls">
                  <select 
                  class='profit-list-switch' 
                  @change.prevent="profitChange($event)" 
                        >
                        <option value="placeholder" disabled>Select an option</option>
                        <option value="DISPLAY_AVERAGE" selected>Average</option>
                        <option value="DISPLAY_MEDIAN">Median</option>
                        <option value="DISPLAY_RANGE">Range</option>
                        <option value="DISPLAY_MAX">Max</option>
                        <option value="DISPLAY_MIN">Min</option>
                        <option value="NEWEST_FIRST">List Newest First</option>
                        <option value="OLDEST_FIRST">List Oldest First</option>
                    </select>
                   <p class="edit-window-profit-metric">{{this.profitMetric}}</p>
                   <button class='add-profit-btn' @click.prevent="profitAdd">Add Profit</button>
              </div>
              <div class='edit-window-only-profit-rows' >
                <div v-for="profit in selectedStore.profitList" :key="profit.visitId">
                    <div class='profit-window-row'>
                    <input class='profit-input-right' name="profit-right" type="number" v-model="profit.visitProfit" /> |
                    <input class='profit-input-left' name="profit-left" type="text" v-model="profit.visitDate" /> |
                    <button class='profit-remove-button' @click.prevent="profitRemoveStart(profit.visitId)">x</button>
                    </div>
                </div>
               </div>

            </div>
            <!-- 2 -->
            <div :class='this.phoneNoteColumn' >
                <div class="edit-window-notes-controls">
                <select 
                  class='notes-switch' 
                  @change.prevent="notesChange($event)" 
                >
                        <option value="placeholder" disabled>Select an option</option>
                        <option value="NEWEST_FIRST" selected>Newest Notes</option>
                        <option value="OLDEST_FIRST">Oldest Notes</option>
                    </select>
                <button class="add-note-btn" @click.prevent="noteAdd">Add Note</button>
                   
              </div>
              <div class='edit-window-only-note-rows' >
                <div v-for="note in selectedStore.storeNotes" :key="note.noteId">
                    <div class='edit-window-note-row'>
                    <input class='note-input-right' name="store-note-right" type="text" v-model="note.noteRight" />
                    <input class='note-input-middle' name="store-note-middle" type="text" v-model="note.noteMiddle" />
                    <input class='note-input-left' name="store-note-left" type="text" v-model="note.noteLeft" />
                    <button class='note-remove-button' @click.prevent="noteRemoveStart(note.noteId)">x</button>
                    </div>
                </div>
               </div>
            </div>
            
            <!-- 3 -->
       </div>
        <!-- PHONE BOX END -->
        <!-- COMPUTER BOX START -->
        <div class='edit-window-computer-tablet-box-bottom'>
        <!-- 1 -->
          <div class='edit-window-profits-column' >
              <div class="edit-window-profits-controls">
                  <select 
                  class='profit-list-switch' 
                  @change.prevent="profitChange($event)" 
                        >
                        <option value="placeholder" disabled>Select an option</option>
                        <option value="DISPLAY_AVERAGE" selected>Average</option>
                        <option value="DISPLAY_MEDIAN">Median</option>
                        <option value="DISPLAY_RANGE">Range</option>
                        <option value="DISPLAY_MAX">Max</option>
                        <option value="DISPLAY_MIN">Min</option>
                        <option value="NEWEST_FIRST">List Newest First</option>
                        <option value="OLDEST_FIRST">List Oldest First</option>
                    </select>
                   <p class='edit-window-profit-metric'>{{this.profitMetric}}</p>
                   <button class='add-profit-btn' @click.prevent="profitAdd">Add Profit</button>
              </div>
              <div class='edit-window-only-profit-rows' >
                <div v-for="profit in selectedStore.profitList" :key="profit.visitId">
                    <div class='profit-window-row'>
                    <input class='profit-input-right' name="profit-right" type="number" v-model="profit.visitProfit" /> |
                    <input class='profit-input-left' name="profit-left" type="text" v-model="profit.visitDate" /> |
                    <button class='profit-remove-button' @click.prevent="profitRemoveStart(profit.visitId)">x</button>
                    </div>
                </div>
               </div>

            </div>
            <!-- 2 -->
            <div class='edit-window-notes-column' >
                <div class="edit-window-notes-controls">
                <select 
                  class='notes-switch' 
                  @change.prevent="notesChange($event)" 
                >
                        <option value="placeholder" disabled>Select an option</option>
                        <option value="NEWEST_FIRST" selected>Newest Notes</option>
                        <option value="OLDEST_FIRST">Oldest Notes</option>
                    </select>
                <button class="add-note-btn" @click.prevent="noteAdd">Add Note</button>
                   
              </div>
              <div class='edit-window-only-note-rows' >
                <div v-for="note in selectedStore.storeNotes" :key="note.noteId">
                    <div class='edit-window-note-row'>
                    <input class='note-input-right' name="store-note-right" type="text" v-model="note.noteRight" />
                    <input class='note-input-middle' name="store-note-middle" type="text" v-model="note.noteMiddle" />
                    <input class='note-input-left' name="store-note-left" type="text" v-model="note.noteLeft" />
                    <button class='note-remove-button' @click.prevent="noteRemoveStart(note.noteId)">x</button>
                    </div>
                </div>
               </div>
            </div>
            <!-- 3 -->
        </div><!-- EDIT WINDOW COMPUTER BOX END -->
        </div>

<!-- LEFT ENDDDDDD -->
        </div>
  </div>

<!-- RIGHT -->
<!-- RIGHT -->
  <div class='edit-window-pane' v-if="this.handMode === true">
        <div v-if="this.showModal === true">
            <EditModal
            :inboundVal="this.modalVal"
            @resFromModal="modalHandler"
            />
        </div>
      <div class='time-bar-edit-window'><!-- TOP SQUARE START -->
    <div class='stoplight-inputs-outer'>
    <div class="above-timer-buttons">
      <button class='delete-store-btn' @click="openModal" value="delete_store_btn">Delete Store</button>
      <button class='reset-store-btn' @click="openModal" value="reset_timer_btn">Reset Timer</button>
      </div>
      <div class="stoplight-inputs-inner">
      <div class="stoplight-input-div">
            <label class="stoplight-input-title" for="till-yellow">Days till yellow</label><input class="stoplight-input" name="till-yellow" type="text" v-model="selectedStore.tillYellow" />
      </div>
      <div class="stoplight-input-div">
           <label class="stoplight-input-title" for="till-red">Days till red</label><input class="stoplight-input" name="till-red" type="text" v-model="selectedStore.tillRed" />
      </div>
      </div>
       <!--  -->
    <!--  -->
      <div v-if='this.changeAddy === false' class='name-address-container'>
        <button class="edit-address-btn" @click="openModal" value="edit_address_btn">Edit Address</button>
        <div>
        <label for="store-name"></label><p class="store-name-label">{{selectedStore.storeName}}</p>
        </div> 
        <div>
        <label for="store-address"></label><p class="store-address-label">{{selectedStore.storeAddress}}</p>
         </div>
      </div>
      <div v-if='this.changeAddy === true' class='name-address-container'>
        <button class="save-address-btn" @click="doneChangingAddress">Save Changes</button>  
        <div>
        <label for="store-name"></label><input class="store-name-input" name="store-name" type="text" v-model="selectedStore.storeName" />
        </div>  
        <div>
        <label for="store-name"></label><input class="store-address-input" name="store-name" type="text" v-model="selectedStore.storeAddress" />
        </div>
      </div>
    <!--  -->
    <!--  -->
      </div>
              <hr class='phone-size-hrs'/>
       

      <div class='pin-and-status'>
         
        <div class='timer-and-close'>
            <div :class="this.timeClass">
            <p>{{this.daysAgo}}</p>
            </div>
            <button class="close-button" @click='closeEditWindow'>Close Window</button>
        </div>
        <div class='pin-edit-div'>
        <div class='pin-title-and-pin'>
          <p class='icon-title'>Current Pin Color</p>
          <div :class='this.pinClass'></div>
        </div>
            <select 
              class='icon-selector' 
              name="icon-selector" 
              id="" 
              :value="selectedStore.markerColor" 
              @change.prevent="selectChange($event)" 
              v-model="selectedStore.markerColor"
            >
            <option value="placeholder" disabled selected>Select your option</option>
            <option value="bluePin">Blue</option>
            <option value="greenPin">Green</option>
            <option value="greyPin">Grey</option>
            <option value="orangePin">Orange</option>
            <option value="purplePin">Purple</option>
            <option value="redPin">Red</option>
            <option value="yellowPin">Yellow</option>
          </select>
          <hr class='pin-edit-hr'>
      </div>

      </div>
     
      </div>
         <hr class='phone-size-hrs'/>

<div class='edit-window-computer-tablet-box-bottom'><!-- COMPUTER BOX START -->
    <div class='bottom-column-edit-window'>
        <div class='notes-and-profit'>
            <!-- 1 -->
          <div class='edit-window-profits-column' >
              <div class="edit-window-profits-controls">
                   <button class='add-profit-btn' @click.prevent="profitAdd">Add Profit</button>
                   <p class='edit-window-profit-metric'>{{this.profitMetric}}</p>
                   <select 
                  class='profit-list-switch' 
                  @change.prevent="profitChange($event)" 
                >
                        <option value="placeholder" disabled>Select an option</option>
                        <option value="DISPLAY_AVERAGE" selected>Average</option>
                        <option value="DISPLAY_MEDIAN">Median</option>
                        <option value="DISPLAY_RANGE">Range</option>
                        <option value="DISPLAY_MAX">Max</option>
                        <option value="DISPLAY_MIN">Min</option>
                        <option value="NEWEST_FIRST">List Newest First</option>
                        <option value="OLDEST_FIRST">List Oldest First</option>
                    </select>
              </div>
              <div class='edit-window-only-profit-rows' >
                <div v-for="profit in selectedStore.profitList" :key="profit.visitId">
                    <div class='profit-window-row'>
                    <button class='profit-remove-button' @click.prevent="profitRemoveStart(profit.visitId)">x</button> |
                    <input class='profit-input-left' name="profit-left" type="text" v-model="profit.visitDate" /> | 
                    <input class='profit-input-right' name="profit-right" type="number" v-model="profit.visitProfit" />
                    </div>
                </div>
               </div>

            </div>
            <!-- 2 -->
            <div class='edit-window-notes-column' >
                <div class="edit-window-notes-controls">
                <button class="add-note-btn" @click.prevent="noteAdd">Add Note</button>
                   <select 
                  class='notes-switch' 
                  @change.prevent="notesChange($event)" 
                >
                        <option value="placeholder" disabled>Select an option</option>
                        <option value="NEWEST_FIRST" selected>Newest Notes</option>
                        <option value="OLDEST_FIRST">Oldest Notes</option>
                    </select>
              </div>
              <div class='edit-window-only-note-rows' >
                <div v-for="note in selectedStore.storeNotes" :key="note.noteId">
                    <div class='edit-window-note-row'>
                    <button class='note-remove-button' @click.prevent="noteRemoveStart(note.noteId)">x</button>
                    <input class='note-input-left' name="store-note-left" type="text" v-model="note.noteLeft" />
                    <input class='note-input-middle' name="store-note-middle" type="text" v-model="note.noteMiddle" /> 
                    <input class='note-input-right' name="store-note-right" type="text" v-model="note.noteRight" />
                    </div>
                </div>
               </div>
            </div>
            <!-- 3 -->
        </div>
    </div>
</div><!-- COMPUTER BOX END -->
        

    <!-- PHONE BOX START -->
    <div class='edit-window-phone-box-bottom' >
        <div class="edit-window-phone-box-controls">
            <select 
                  class='phone-box-controls' 
                  @change.prevent="phoneEditModeChange($event)" 
                        >
                        <option value="placeholder" disabled>Select an option</option>
                        <option value="PHONE_BOX_DISPLAY_PROFITS" selected>Display Profits List</option>
                        <option value="PHONE_BOX_DISPLAY_NOTES">Display Notes List</option>
            </select>
        </div>
        <div class='notes-and-profit'>
        <!-- 1 -->
          <div :class='this.phoneProfitColumn' >
              <div class="edit-window-profits-controls">
                   <button class='add-profit-btn' @click.prevent="profitAdd">Add Profit</button>
                   <p class='edit-window-profit-metric'>{{this.profitMetric}}</p>
                   <select 
                  class='profit-list-switch' 
                  @change.prevent="profitChange($event)" 
                >
                        <option value="placeholder" disabled>Select an option</option>
                        <option value="DISPLAY_AVERAGE" selected>Average</option>
                        <option value="DISPLAY_MEDIAN">Median</option>
                        <option value="DISPLAY_RANGE">Range</option>
                        <option value="DISPLAY_MAX">Max</option>
                        <option value="DISPLAY_MIN">Min</option>
                        <option value="NEWEST_FIRST">List Newest First</option>
                        <option value="OLDEST_FIRST">List Oldest First</option>
                    </select>
              </div>
              <div class='edit-window-only-profit-rows' >
                <div v-for="profit in selectedStore.profitList" :key="profit.visitId">
                    <div class='profit-window-row'>
                    <button class='profit-remove-button' @click.prevent="profitRemoveStart(profit.visitId)">x</button> |
                    <input class='profit-input-left' name="profit-left" type="text" v-model="profit.visitDate" /> | 
                    <input class='profit-input-right' name="profit-right" type="number" v-model="profit.visitProfit" />
                    </div>
                </div>
               </div>

            </div>
            <!-- 2 -->
            <div :class='this.phoneNoteColumn' >
                <div class="edit-window-notes-controls">
                <button class="add-note-btn" @click.prevent="noteAdd">Add Note</button>
                   <select 
                  class='notes-switch' 
                  @change.prevent="notesChange($event)" 
                >
                        <option value="placeholder" disabled>Select an option</option>
                        <option value="NEWEST_FIRST" selected>Newest Notes</option>
                        <option value="OLDEST_FIRST">Oldest Notes</option>
                    </select>
              </div>
              <div class='edit-window-only-note-rows' >
                <div v-for="note in selectedStore.storeNotes" :key="note.noteId">
                    <div class='edit-window-note-row'>
                    <button class='note-remove-button' @click.prevent="noteRemoveStart(note.noteId)">x</button>
                    <input class='note-input-left' name="store-note-left" type="text" v-model="note.noteLeft" />
                    <input class='note-input-middle' name="store-note-middle" type="text" v-model="note.noteMiddle" /> 
                    <input class='note-input-right' name="store-note-right" type="text" v-model="note.noteRight" />
                    </div>
                </div>
               </div>
            </div>
            <!-- 3 -->
        </div>
    </div>
    <!-- PHONE BOX END -->



<!--  -->
<!--  -->
<!--  -->
  </div>


  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import storesDb from '../helpers/mixins/storesDb';
import General from '../helpers/mixins/General';
import { v4 as uuidv4 } from 'uuid';
import EditModal from '../components/EditModal.vue';
import axios from 'axios';

export default {
    name: 'EditWindow',
    components:{
        EditModal
    },
    mixins: [storesDb, General],
    props: [
      'id2Edit',
      ],
    data(){
      return{
          //true is righthanded
          handMode: true,
          selectedStore: {},
          timeClass: '',
          daysAgo: '',
          pinClass: '',
          changeAddy: false,
          showModal: false,
          modalQuestion: '',
          noteChoppingBlock: '',
          profitChoppingBlock: '',
          addressChoppingBlock: '',
          profitMetric: '',
          noteSortOrder: 'NEWEST_FIRST',
          profitSortOrder: 'NEWEST_FIRST',
          displayedProfitMetric: 'DISPLAY_AVERAGE',
          phoneProfitColumn: 'edit-window-profits-column-phone',
          phoneNoteColumn: 'edit-window-notes-column-phone'
          }
    },
    watch:{
        selectedStore: {
            handler(){
                let interval = setInterval(()=>{
                    clearInterval(interval);
                    this.executeUpdate();
                    this.refreshClock();
                    this.refreshDaysCount();
                    this.$emit('refreshList');
                    this.profitRefresh();
                }, 200);
            },
            deep: true
        }
    },
    computed: {
        ...mapState('storedata', {
      storesData: state => state.stores
    }),
    },
    methods:{
          ...mapGetters('storedata', [
        'storesGetter'
    ]),
        handModeToggleRight(){
            if(this.handMode === false){
                this.handMode = true;
            }
        },
        handModeToggleLeft(){
            if(this.handMode === true){
                this.handMode = false;
            }
        },
        phoneEditModeChange(event){
            let phoneBoxMode = event.target.value;
                switch(phoneBoxMode){
                    case 'PHONE_BOX_DISPLAY_PROFITS':
                        this.phoneNoteColumn= 'edit-window-notes-column-phone-hide';
                        this.phoneProfitColumn= 'edit-window-profits-column-phone';
                    break;
                    case 'PHONE_BOX_DISPLAY_NOTES':
                        this.phoneProfitColumn= 'edit-window-profits-column-phone-hide';
                        this.phoneNoteColumn= 'edit-window-notes-column-phone';
                    break;
                }
        },
        
        loadPinImg(){
             let settingSwitch = this.selectedStore.markerColor;
                switch(settingSwitch){
                    case 'bluePin':
                        this.pinClass = 'bluePin';
                    break;
                    case 'greenPin':
                        this.pinClass = 'greenPin';
                    break;
                    case 'greyPin':
                        this.pinClass = 'greyPin';
                    break;
                    case 'orangePin':
                        this.pinClass = 'orangePin';
                    break;
                    case 'purplePin':
                        this.pinClass = 'purplePin';
                    break;
                    case 'redPin':
                        this.pinClass = 'redPin';
                    break;
                    case 'yellowPin':
                        this.pinClass = 'yellowPin';
                    break;
                    }
        },
    profitChange(event){
      let profitCalc= event.target.value;
      let profitData = this.$_genProfitData(this.selectedStore);
        switch(profitCalc){
          case 'DISPLAY_AVERAGE':
            this.profitMetric = profitData.profitAverage;
          break;
          case 'DISPLAY_MEDIAN':
            this.profitMetric = profitData.profitMedian
          break;
          case 'DISPLAY_RANGE':
            this.profitMetric = profitData.profitRange;
          break;
          case 'DISPLAY_MAX':
            this.profitMetric = profitData.profitMax;
          break;
          case 'DISPLAY_MIN':
            this.profitMetric = profitData.profitMin;
          break;
          case 'NEWEST_FIRST':
            this.profitSortOrder = 'NEWEST_FIRST';
            this.profitOrderRefresh();
          break;
          case 'OLDEST_FIRST':
            this.profitSortOrder = 'OLDEST_FIRST';
            this.profitOrderRefresh();
          break;
        }
    },
    profitRefresh(){
        let profitData = this.$_genProfitData(this.selectedStore);
        switch(this.displayedProfitMetric){
            case 'DISPLAY_AVERAGE':
            this.profitMetric = profitData.profitAverage;
          break;
          case 'DISPLAY_MEDIAN':
            this.profitMetric = profitData.profitMedian
          break;
          case 'DISPLAY_RANGE':
            this.profitMetric = profitData.profitRange;
          break;
          case 'DISPLAY_MAX':
            this.profitMetric = profitData.profitMax;
          break;
          case 'DISPLAY_MIN':
            this.profitMetric = profitData.profitMin;
          break;
        }
  
    },
    notesChange(event){
    let noteCalc= event.target.value;
        switch(noteCalc){
          case 'NEWEST_FIRST':
            this.noteSortOrder = 'NEWEST_FIRST';
            this.notesRefresh();
          break;
          case 'OLDEST_FIRST':
            this.noteSortOrder = 'OLDEST_FIRST';
            this.notesRefresh();
          break;
          
        }
    },
    notesRefresh(){
        let noteCalc = this.noteSortOrder;
        switch(noteCalc){
          case 'NEWEST_FIRST':
            this.selectedStore.storeNotes = this.selectedStore.storeNotes.sort(function(a, b) {
                    if(a.noteTime > b.noteTime){
                        return -1;
                    }else if(a.noteTime < b.noteTime){
                      return 1;
                    } else{
                        return 0
                    }

                });
          break;
          case 'OLDEST_FIRST':
            this.selectedStore.storeNotes = this.selectedStore.storeNotes.sort(function(a, b) {
                    if(a.noteTime > b.noteTime){
                        return 1;
                    } else if(a.noteTime < b.noteTime){
                      return -1;
                    }else{
                        return 0
                    }             

                    });
          break;
        }
    },
    profitOrderRefresh(){
        let profitCalc = this.profitSortOrder;
        switch(profitCalc){
          case 'NEWEST_FIRST':
            this.selectedStore.profitList = this.selectedStore.profitList.sort(function(a, b) {
                    if(a.visitTime > b.visitTime){
                        return -1;
                    }else if(a.visitTime < b.visitTime){
                      return 1;
                    } else{
                        return 0
                    }

                });
          break;
          case 'OLDEST_FIRST':
            this.selectedStore.profitList = this.selectedStore.profitList.sort(function(a, b) {
                    if(a.visitTime > b.visitTime){
                        return 1;
                    }else if(a.visitTime < b.visitTime){
                      return -1;
                    } else{
                        return 0
                    }

                });
          break;
        }
    },
    selectChange(event){
            this.selectedStore.markerColor = event.target.value;
            this.$_updateStore(this.selectedStore);
            this.loadPinImg();
            this.$nextTick(()=>{
            this.$emit('refreshList');
            });
        },
    openModal(e){
            this.showModal = true;
            this.modalVal = e.target.value;
    },
    openModalNoteDeletion(){
            this.showModal = true;
            this.modalVal = 'delete_note_btn';
    },
    openModalProfitDeletion(){
            this.showModal = true;
            this.modalVal = 'delete_profit_btn';
    },
    modalHandler(fromModal){
        let modalHandlerVal = fromModal.modalAnswer
         switch(modalHandlerVal){
                case 'CLOSE_MODAL':
                    this.showModal = false;
                break;
                case 'CONFIRM_DELETE_STORE':
                    this.deleteStore();
                    this.showModal = false;
                break;
                case 'CONFIRM_RESET_TIMER':
                    this.resetTimer();
                    this.showModal = false;
                break;
                case 'CONFIRM_EDIT_ADDRESS':
                    this.editAddress();
                    this.showModal = false;
                break;
                case 'CONFIRM_DELETE_NOTE':
                    this.noteRemoveFinalize();
                    this.showModal = false;
                break;
                case 'CONFIRM_DELETE_PROFIT':
                    this.profitRemoveFinalize();
                    this.showModal = false;
                break;
            }

    },
    editAddress(){
        this.changeAddy = true;
    },
    async doneChangingAddress(){
        let newAddressInfo = await this.getAddress();
        console.log(newAddressInfo)
        /* This is where the local selected store gets address and cords updated, after 100ms the watcher will update DB */
        this.selectedStore.storeAddress = newAddressInfo.newAddress;
        this.selectedStore.position.lat = newAddressInfo.newCoords.lat;
        this.selectedStore.position.lng = newAddressInfo.newCoords.lng;
        this.changeAddy = false;
    },
    async getAddress(){
                const geocodeAPI = 'AIzaSyDZLn7MXGkeh2kmHcnREkLRbZPXsQ3d4aQ';
                let address = await axios
                .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.selectedStore.storeAddress}&key=${geocodeAPI}`);
                /* Geocoding by store address the user just entered, taking the address string from the response, 
                    while unessesary, ensures that we get a well formatted address    */
               /*  */
               /*  */
                //Guards against entering a bad address, "ZERO_RESULTS" is the value returned from google's api if no resuls for geocode
                if(address.data.status === 'ZERO_RESULTS'){
                    let newAddress = this.addressChoppingBlock;
                    let newLat = this.selectedStore.position.lat;
                    let newLng = this.selectedStore.position.lng;
                    let newPackedInfo = {
                        newAddress: newAddress,
                        newCoords: {
                            lat: newLat,
                            lng: newLng
                            }
                        }
                        return newPackedInfo
                    }
                     else{
                        let newAddress = address.data.results[0].formatted_address;
                        this.addressChoppingBlock = address.data.results[0].formatted_address;
                        let newCoords = address.data.results[0].geometry.location;
                        let newPackedInfo = {
                            newAddress: newAddress,
                            newCoords: newCoords
                        }
                        return newPackedInfo;
                }
               
            },
    closeEditWindow(){
            this.$emit('closeEditWindow');
        },
    refreshAfterRemove(){
        this.$emit('refreshAfterRemove')
    },
        //Executed when button is pressed to patch store
    executeUpdate(){
                //from storesDb Mixin file, storesDb contains the 'higher level' way to activate a patch request
            this.$_updateStore(this.selectedStore);
        },
    refreshDaysCount(){
            this.daysAgo='';
            console.log(`ms since ${this.selectedStore.lastVisited}`)
            let count = this.$_daysAgo(this.selectedStore.lastVisited);
            this.daysAgo = `Last Visited ${count} days ago`;
        },
    refreshClock(){
            this.timeClass = '';
            let classHalf = this.$_genStoplight(this.selectedStore);
            this.timeClass = `edit-${classHalf}`;
            this.$forceUpdate();
        },
    noteRemoveStart(id2Remove){
        // 1. Note deletion component state set
            this.noteChoppingBlock = id2Remove;
            this.openModalNoteDeletion();
        },
    profitRemoveStart(id2Remove){
        // 1. Note deletion component state set
            this.profitChoppingBlock = id2Remove;
            this.openModalProfitDeletion();
        },
    noteRemoveFinalize(){
         this.selectedStore.storeNotes = this.selectedStore.storeNotes.filter((note) =>{
                                    // 2. Where note actually gets deleted
                return note.noteId !== this.noteChoppingBlock
            });
            this.$_updateStore(this.selectedStore);
    },
    profitRemoveFinalize(){
         this.selectedStore.profitList = this.selectedStore.profitList.filter((savedProfit) =>{
                                    // 2. Where note actually gets deleted
                return savedProfit.visitId !== this.profitChoppingBlock
            });
            this.$_updateStore(this.selectedStore);
    },
    noteAdd(){
            let newNoteId = uuidv4();
            let currentTime = Date.now();
            let newNote = {
                noteLeft: '',
                noteMiddle: '',
                noteRight: '',
                noteId: newNoteId,
                noteTime: currentTime,
              }
            this.selectedStore.storeNotes.unshift(newNote);
            this.$_updateStore(this.selectedStore);
        },
    profitAdd(){
            let newProfitId = uuidv4();
            let currentTime = Date.now();
            let newProfit = {
                visitDate: '',
                visitProfit: 0,
                visitId: newProfitId,
                visitTime: currentTime,
              }
            this.selectedStore.profitList.unshift(newProfit);
            this.$_updateStore(this.selectedStore);
        },
    deleteStore(){
   /*      let toRemove = this.storesData.find((store)=>{
            return store.storeId === id2Remove;
        }); */

        this.$_deleteStore(this.selectedStore);
        this.refreshAfterRemove();
        this.closeEditWindow();
    },
    resetTimer(){
        let newTime = Date.now();
        this.selectedStore.lastVisited = newTime;
    },
    },
    
    created(){
        this.selectedStore = this.storesData.find((store)=>{
            return store.storeId === this.id2Edit
        });
        this.$nextTick(()=>{
        this.addressChoppingBlock = this.selectedStore.storeAddress;
        this.profitRefresh();
        this.refreshClock();
        this.loadPinImg();
        this.notesRefresh();
        });
        
    },
    
}
</script>

<style>
    .hand-mode-display-toggle{
        display: none;
    }
    .edit-window-pane{
        height: 45%;
        box-sizing: border-box;
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 15px;
        margin-bottom: 10px;
        padding-bottom: 14px;
        backdrop-filter: blur(7px) contrast(1.2) saturate(.2);
        background-color: rgba(11, 21, 25, 0.7);
        display: flex;
        left: 0;
        right: 0;
        bottom: 0;
        transform: translateY(48%) scaleY(1.1) scaleX(1.004) translateX(-.5%);
        position: static;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        overflow: hidden;
    }
    .notes-and-profit{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }
    .phone-size-hrs{
        display: none;
    }
     .time-bar-edit-window{
        display: flex;
        flex-direction: row;
        width: 90%;
        justify-content: space-evenly;
    }
    .stoplight-input{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    
    
    .stoplight-inputs-outer{
        display: flex;
        box-sizing: border-box;
        flex-direction: row;
        width: 100%;
        justify-content: space-evenly;
    }
    .stoplight-inputs-inner{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .stoplight-input-div{
        margin-left: 5px;
    }
    .stoplight-input-title{
        color: white;
        font-family: Mont2;
        font-size: 9px;
    }
    .stoplight-input{
        width: 28px;
        text-align: center;
        font-family: Mont2;
        background-color: rgba(11, 21, 25, 0.7);
        padding-left: 12px;
        padding-right: 12px;
        padding-top: 3px;
        padding-bottom: 3px;
        margin-top: 11px;
        margin-bottom: 5px;
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 7px;
        font-size: 14.5px;
        border-style: none;
        word-wrap: break-word;
        color: rgba(255, 255, 255, 1);
    }
    .stoplight-input:focus{
        outline: none !important;
        border-color: #719ECE;
        box-shadow: 0 0 7px #719ECE;
    }
    .name-address-container{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .edit-address-btn{
            background-color: rgba(233, 173, 34, 0.2);
            box-shadow: inset 0px 0px 5.9px 1px rgba(0, 0, 0, 0.7);
            border-style: none;
            font-family: Mont2;
            width: 170px;
            padding-left: 34px;
            padding-right: 34px;
            padding-top: 0px;
            padding-bottom: 0px;
            border-radius: 40px;
            font-size: 17px;
            align-self: center;
            padding: 15px;
            color: #fff;
            -webkit-text-stroke-width: .04rem;
            -webkit-text-stroke-color: rgba(67, 172, 180, 0.33);
        }
    .edit-address-btn:hover{
            background-color: rgba(0, 0, 0, 0.1);
            -webkit-text-stroke-width: .04rem;
            -webkit-text-stroke-color: rgba(47, 47, 47, 0);
        }
    .save-address-btn{
            background-color: rgba(246, 255, 0, 0.2);
            box-shadow: inset 0px 0px 5.9px 1px rgba(0, 0, 0, 0.7);
            border-style: none;
            font-family: Mont2;
            width: 170px;
            padding-left: 34px;
            padding-right: 34px;
            padding-top: 0px;
            padding-bottom: 0px;
            border-radius: 40px;
            font-size: 17px;
            align-self: center;
            padding: 15px;
            color: #fff;
            -webkit-text-stroke-width: .04rem;
            -webkit-text-stroke-color: rgba(67, 172, 180, 0.33);
        }
    .save-address-btn:hover{
            background-color: rgba(0, 0, 0, 0.1);
            -webkit-text-stroke-width: .04rem;
            -webkit-text-stroke-color: rgba(47, 47, 47, 0);
        }
    .store-name-label{
        font-family: Mont2;
        font-size: 14px;
        word-wrap: break-word;
        color: rgba(255, 255, 255, 0.95);
    }
    .store-address-label{
    font-family: Mont2;
    justify-content: center;
    align-content: center;
    align-items: center;
    font-weight: bolder;
    word-wrap: break-word;
    padding: 5px;
    letter-spacing: 1.7px;
    font-style: italic;
    font-size: 14px;
    border-radius: 12px;
    -webkit-box-shadow: 0px 0px 22px 5px rgba(9, 153, 255, 0.05);
    -moz-box-shadow: 0px 0px 22px 5px rgba(9, 153, 255, 0.05);
    box-shadow:  0px 0px 22px 5px rgba(9, 153, 255, 0.05);  
     color: rgb(57, 173, 223);
        }
    .store-address-label:hover{
        font-family: Mont2;
        justify-content: center;
        align-content: center;
        align-items: center;
        font-weight: bolder;
        word-wrap: break-word;
        padding: 3px;
        border-radius: 12px;
        -webkit-box-shadow: 0px 0px 22px 5px rgba(9, 153, 255, 0.12);
        -moz-box-shadow:    0px 0px 22px 5px rgba(9, 153, 255, 0.12);
        box-shadow:  0px 0px 22px 5px rgba(9, 153, 255, 0.12);
        color: rgb(40, 191, 255);
        }
    .store-name-input{
        width: 210px;
        font-family: Mont2;
        background-color: rgba(11, 21, 25, 0.7);
        padding-left: 7px;
        padding-right: 7px;
        padding-top: 4px;
        padding-bottom: 4px;
        margin-top: 11px;
        margin-bottom: 5px;
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 40px;
        font-size: 14.5px;
        border-style: none;
        word-wrap: break-word;
        color: rgba(255, 255, 255, 0.95);
    }
    .store-name-input:focus{
        outline: none !important;
        border-color: #719ECE;
        box-shadow: 0 0 7px #719ECE;
    }
    .store-address-input{
        width: 210px;
        font-family: Mont2;
        background-color: rgba(11, 21, 25, 0.7);
        padding-left: 7px;
        padding-right: 7px;
        padding-top: 4px;
        padding-bottom: 4px;
        margin-top: 11px;
        margin-bottom: 5px;
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 40px;
        font-size: 14.5px;
        border-style: none;
        word-wrap: break-word;
        color: rgba(255, 255, 255, 0.95);
    }
    .store-address-input:focus{
        outline: none !important;
        border-color: #719ECE;
        box-shadow: 0 0 7px #719ECE;
    }
    .pin-and-status{
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-evenly;
    }
    .timer-and-close{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .above-timer-buttons{
        display: flex;
        flex-direction: column;
        padding-right: 10px;
        padding-left: 10px;
        justify-content: space-evenly;
    }
    .delete-store-btn{
            background-color: rgba(233, 34, 34, 0.2);
            box-shadow: inset 0px 0px 5.9px 1px rgba(0, 0, 0, 0.7);
            border-style: none;
            font-family: Mont2;
            padding-left: 34px;
            padding-right: 34px;
            padding-top: 0px;
            padding-bottom: 0px;
            border-radius: 12px;
            font-size: 15.9px;
            align-self: center;
            padding: 15px;
            color: #fff;
            -webkit-text-stroke-width: .04rem;
            -webkit-text-stroke-color: rgba(67, 172, 180, 0.33);
        }
    .delete-store-btn:hover{
            background-color: rgba(112, 0, 0, 0.537);
            -webkit-text-stroke-width: .04rem;
            -webkit-text-stroke-color: rgba(47, 47, 47, 0);
        }
    .reset-store-btn{
            background-color: rgba(233, 34, 34, 0.2);
            box-shadow: inset 0px 0px 5.9px 1px rgba(0, 0, 0, 0.7);
            border-style: none;
            font-family: Mont2;
            padding-left: 34px;
            padding-right: 34px;
            padding-top: 0px;
            padding-bottom: 0px;
            border-radius: 12px;
            font-size: 15.9px;
            align-self: center;
            padding: 15px;
            color: #fff;
            -webkit-text-stroke-width: .04rem;
            -webkit-text-stroke-color: rgba(67, 172, 180, 0.33);
        }
        .reset-store-btn:hover{
            background-color: rgba(112, 0, 0, 0.537);
            -webkit-text-stroke-width: .04rem;
            -webkit-text-stroke-color: rgba(47, 47, 47, 0);
        }
    /* Time Div */
   
        .edit-time-div-green{
            font-family: Mont2;
            font-size: 17px;
            display: flex;
            flex-direction: column;
            color: rgba(255, 255, 255, 0.7);
            margin: 15px;
            word-wrap: break-word;
            padding-left: 34px;
            padding-right: 34px;
            padding-top: 2px;
            padding-bottom: 2px;
            border-radius: 40px;
            border-style: none;
            background-color: rgba(7, 201, 0, 0.2);
            box-shadow: inset 0px 0px 9px 1px rgba(5, 38, 40, 0.85);
        }
        .edit-time-div-yellow{
            font-family: Mont2;
            font-size: 17px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: rgba(255, 255, 255, 0.7);
            margin: 15px;
            word-wrap: break-word;
            padding-left: 34px;
            padding-right: 34px;
            padding-top: 2px;
            padding-bottom: 2px;
            border-radius: 40px;
            border-style: none;
            background-color: rgba(178, 197, 0, 0.24);
            box-shadow: inset 0px 0px 7px 1px rgba(24, 21, 0, 0.85);
        }
        .edit-time-div-red{
            font-family: Mont2;
            font-size: 17px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: rgba(255, 255, 255, 0.7);
            margin: 15px;
            word-wrap: break-word;
            padding-left: 34px;
            padding-right: 34px;
            padding-top: 2px;
            padding-bottom: 2px;
            border-radius: 40px;
            border-style: none;
            background-color: rgba(197, 10, 0, 0.2);
            box-shadow: inset 0px 0px 7px 1px rgba(0, 0, 4, 0.85);
        }
        .close-button{
            background-color: rgba(31, 146, 228, 0.15);
            box-shadow: inset 0px 0px 5.9px 1px rgba(0, 0, 0, 0.7);
            border-style: none;
            font-family: Mont2;
            width: 85%;
            padding-left: 34px;
            padding-right: 34px;
            padding-top: 0px;
            padding-bottom: 0px;
            border-radius: 40px;
            font-size: 17px;
            align-self: center;
            padding: 15px;
            color: #fff;
            -webkit-text-stroke-width: .04rem;
            -webkit-text-stroke-color: rgba(47, 47, 47, 0.33);
        }
        .close-button:hover{
            background-color: rgba(0, 0, 0, 0.1);
            -webkit-text-stroke-width: .04rem;
            -webkit-text-stroke-color: rgba(47, 47, 47, 0);
        }
        .pin-edit-div{
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: space-evenly;
            justify-items: center;
            align-items: center;
        }
        .pin-title-and-pin{
            display: flex;
            flex-direction: column;
        }
        .icon-title{
            font-family: Mont2;
            font-size: 17px;
            color: white;
        }
       .icon-selector{
            font-family: Mont2;
            border-style: none;
            color: rgb(255, 255, 255);
            background-color: rgba(12, 12, 12, 0.14);
            border-radius: 28px;
            padding: 12px;
            width: 90%;
            font-size: 17px;
            /*  */
            -webkit-box-shadow: inset 0px 0px 7px 3px rgba(9, 30, 53, 0.59); 
            box-shadow: inset 0px 0px 7px 3px rgba(9, 30, 53, 0.59); 
            }
            .icon-selector:hover{
            color: rgb(15, 23, 28);
            background-color: rgba(12, 12, 12, 0.21);
            -webkit-box-shadow: inset 0px 0px 7px 3px rgba(9, 30, 53, 0.7); 
            box-shadow: inset 0px 0px 7px 3px rgba(9, 30, 53, 0.7); 

            }
        .pin-edit-hr{
            width: 75px;
        }
        .edit-window-phone-box-controls{
            padding-bottom: 10px;
        }
        .bottom-column-edit-window{
                display: flex;
                flex-direction: column;
                width: 90%;
            }
        .edit-window-computer-tablet-box-bottom{
            display: block;
            }
        .edit-window-phone-box-bottom{
            display: none;
            }
        .edit-window-notes-column{
            width: 100%;
            display: flex;
            box-sizing: border-box;
            flex-direction: column;
            justify-content: space-evenly;
            }
        .edit-window-notes-controls{
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
        }
        .phone-box-controls{
            font-family: Mont;
            border-style: none;
            color: rgb(255, 255, 255);
            background-color: rgba(12, 12, 12, 0.14);
            border-radius: 28px;
            padding-left: 12px;
            padding-right: 12px;
            padding-top: 7px;
            padding-bottom: 7px;
            width: 80%;
            font-size: 17px;
            /*  */
            -webkit-box-shadow: inset 0px 0px 7px 3px rgba(9, 30, 53, 0.59); 
            box-shadow: inset 0px 0px 7px 3px rgba(9, 30, 53, 0.59); 
        }
        .phone-box-controls:hover{
            color: rgb(13, 24, 24);
            background-color: rgba(12, 12, 12, 0.21);
            -webkit-box-shadow: inset 0px 0px 7px 3px rgba(9, 30, 53, 0.7); 
            box-shadow: inset 0px 0px 7px 3px rgba(9, 30, 53, 0.7); 
        }
        .notes-switch{
            font-family: Mont2;
            border-style: none;
            color: rgb(255, 255, 255);
            background-color: rgba(12, 12, 12, 0.14);
            border-radius: 111px;
            padding-left: 15px;
            padding-right: 15px;
            padding-top: 3px;
            padding-bottom: 3px;
            width: 35%;
            font-size: 17px;
            /*  */
            -webkit-box-shadow: inset 0px 0px 7px 3px rgba(9, 30, 53, 0.59); 
            box-shadow: inset 0px 0px 7px 3px rgba(9, 30, 53, 0.59); 
            }
        .notes-switch:hover{
            color: rgb(20, 34, 48);
            background-color: rgba(12, 12, 12, 0.21);
            -webkit-box-shadow: inset 0px 0px 7px 3px rgba(9, 30, 53, 0.7); 
            box-shadow: inset 0px 0px 7px 3px rgba(9, 30, 53, 0.7); 

            }
        .add-note-btn{
            background-color: rgba(31, 146, 228, 0.15);
            box-shadow: inset 0px 0px 5.9px 1px rgba(0, 0, 0, 0.7);
            border-style: none;
            font-family: Mont;
            width: 35%;
            padding-left: 34px;
            padding-right: 34px;
            padding-top: 0px;
            padding-bottom: 0px;
            border-radius: 40px;
            font-size: 17px;
            align-self: center;
            padding: 15px;
            color: #fff;
            -webkit-text-stroke-width: .04rem;
            -webkit-text-stroke-color: rgba(47, 47, 47, 0.33);
        }
        .add-note-btn:hover{
            background-color: rgba(0, 0, 0, 0.1);
            -webkit-text-stroke-width: .04rem;
            -webkit-text-stroke-color: rgba(47, 47, 47, 0);
        }
        .edit-window-only-note-rows{
            height: 300px;
            width: 100%;
            overflow-y: hidden;
        }
        .edit-window-only-note-rows:hover{
            overflow-y: scroll;
        }
        .edit-window-note-row{
            justify-content: space-evenly;
            display: flex;
            flex-direction: row;
            color: rgba(165, 157, 252, 0.1);

        }
        .note-remove-button{
            background-color: rgba(41, 41, 41, 0.2);
            box-shadow: inset 0px 0px 4.9px 1px rgba(0, 0, 0, 0.7);
            border-style: none;
            font-family: Mont2;
            padding-left: 34px;
            padding-right: 34px;
            padding-top: 3px;
            padding-bottom: 3px;
            margin-top: 7px;
            margin-bottom: 7px;
            margin-left: 11px;
            margin-right: 11px;
            border-radius: 5px;
            font-size: 17px;
            align-self: center;
            padding: 25px;
            color: #fff;
            -webkit-text-stroke-width: .04rem;
            -webkit-text-stroke-color: rgba(160, 218, 222, 0.59);
        }
        .note-remove-button:hover{
                background-color: rgba(176, 24, 24, 0.27);
                -webkit-text-stroke-width: .04rem;
                -webkit-text-stroke-color: rgba(47, 47, 47, 0);
            }
        .note-input-left{
            width: 210px;
            font-family: Mont;
            background-color: rgba(11, 21, 25, 0.7);
            padding-left: 7px;
            padding-right: 7px;
            padding-top: 7px;
            padding-bottom: 7px;
            margin-top: 4px;
            margin-bottom: 4px;
            margin-left: 4px;
            margin-right: 4px;
            border-radius: 10px;
            font-size: 17px;
            border-style: none;
            word-wrap: break-word;
            color: rgba(255, 255, 255, 0.95);
            box-shadow: 0 0 1px #c6e2ff;
        }
         .note-input-left:focus{
            outline: none !important;
            border-color: #719ECE;
            box-shadow: 0 0 12px #719ECE;
        }
        .note-input-middle{
            width: 210px;
            font-family: Mont;
            background-color: rgba(11, 21, 25, 0.7);
            padding-left: 7px;
            padding-right: 7px;
            padding-top: 7px;
            padding-bottom: 7px;
            margin-top: 4px;
            margin-bottom: 4px;
            margin-left: 4px;
            margin-right: 4px;
            border-radius: 10px;
            font-size: 17px;
            border-style: none;
            word-wrap: break-word;
            color: rgba(255, 255, 255, 0.95);
            box-shadow: 0 0 1px #c6e2ff;
        }
         .note-input-middle:focus{
            outline: none !important;
            border-color: #719ECE;
            box-shadow: 0 0 12px #719ECE;
        }
        .note-input-right{
            width: 210px;
            font-family: Mont;
            background-color: rgba(11, 21, 25, 0.7);
            padding-left: 7px;
            padding-right: 7px;
            padding-top: 7px;
            padding-bottom: 7px;
            margin-top: 4px;
            margin-bottom: 4px;
            margin-left: 4px;
            margin-right: 4px;
            border-radius: 10px;
            font-size: 17px;
            border-style: none;
            word-wrap: break-word;
            color: rgba(255, 255, 255, 0.95);
            box-shadow: 0 0 1px #c6e2ff;
        }
         .note-input-right:focus{
            outline: none !important;
            border-color: #719ECE;
            box-shadow: 0 0 12px #719ECE;
        }
        .profit-remove-button{
            background-color: rgba(41, 41, 41, 0.2);
            box-shadow: inset 0px 0px 4.9px 1px rgba(0, 0, 0, 0.7);
            border-style: none;
            font-family: Mont2;
            padding-left: 34px;
            padding-right: 34px;
            padding-top: 3px;
            padding-bottom: 3px;
            margin-top: 7px;
            margin-bottom: 7px;
            margin-left: 11px;
            margin-right: 11px;
            border-radius: 5px;
            font-size: 17px;
            align-self: center;
            padding: 25px;
            color: #fff;
            -webkit-text-stroke-width: .04rem;
            -webkit-text-stroke-color: rgba(179, 214, 216, 0.59);
        }
    .profit-remove-button:hover{
            background-color: rgba(176, 24, 24, 0.27);
            -webkit-text-stroke-width: .04rem;
            -webkit-text-stroke-color: rgba(47, 47, 47, 0);
        }
        /* PROFIT WINDOW */
        .edit-window-profits-column{
            display: flex;
            width: 100%;
            box-sizing: border-box;
            flex-direction: column;
            justify-content: top;
            }
        .edit-window-profits-controls{
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            padding-bottom: 20px;
        }
        .edit-window-profit-metric{
            font-family: Mont2;
            font-size: 17px;
            letter-spacing: 1px;
            color: aliceblue;
            -webkit-box-shadow:  0px 0px 11px 5px rgba(83, 113, 145, 0.17); 
            box-shadow:   0px 0px 11px 5px rgba(79, 109, 141, 0.17);
        }
        .profit-list-switch{
            font-family: Mont2;
            border-style: none;
            color: rgb(255, 255, 255);
            background-color: rgba(12, 12, 12, 0.14);
            border-radius: 111px;
            padding-left: 15px;
            padding-right: 15px;
            padding-top: 3px;
            padding-bottom: 3px;
            width: 35%;
            font-size: 17px;
            /*  */
            -webkit-box-shadow: inset 0px 0px 7px 3px rgba(9, 30, 53, 0.59); 
            box-shadow: inset 0px 0px 7px 3px rgba(9, 30, 53, 0.59); 
            }
        .profit-list-switch:hover{
            color: rgb(20, 32, 42);
            background-color: rgba(12, 12, 12, 0.21);
            -webkit-box-shadow: inset 0px 0px 7px 3px rgba(9, 30, 53, 0.7); 
            box-shadow: inset 0px 0px 7px 3px rgba(9, 30, 53, 0.7); 

            }
        .add-profit-btn{
            background-color: rgba(31, 146, 228, 0.15);
            box-shadow: inset 0px 0px 5.9px 1px rgba(0, 0, 0, 0.7);
            border-style: none;
            font-family: Mont;
            width: 35%;
            padding-left: 34px;
            padding-right: 34px;
            padding-top: 0px;
            padding-bottom: 0px;
            border-radius: 40px;
            font-size: 17px;
            align-self: center;
            padding: 15px;
            color: #fff;
            -webkit-text-stroke-width: .04rem;
            -webkit-text-stroke-color: rgba(47, 47, 47, 0.33);
        }
        .add-profit-btn:hover{
            background-color: rgba(0, 0, 0, 0.1);
            -webkit-text-stroke-width: .04rem;
            -webkit-text-stroke-color: rgba(47, 47, 47, 0);
        }
        .edit-window-only-profit-rows{
            height: 300px;
            width: 100%;
            overflow-y: hidden; 
        }
        .edit-window-only-profit-rows:hover{
            overflow-y:  scroll; 
        }
        .profit-window-row{
            justify-content: space-evenly;
            display: flex;
            flex-direction: row;
        }
         .profit-input-left{
            width: 370px;
            font-family: Mont;
            background-color: rgba(11, 21, 25, 0.7);
            padding-left: 7px;
            padding-right: 7px;
            padding-top: 7px;
            padding-bottom: 7px;
            margin-top: 9px;
            margin-bottom: 4px;
            margin-left: 4px;
            margin-right: 4px;
            border-radius: 10px;
            font-size: 17px;
            border-style: none;
            word-wrap: break-word;
            color: rgba(255, 255, 255, 0.95);
            box-shadow: 0 0 1px #c6e2ff;
        }
         .profit-input-left:focus{
            outline: none !important;
            border-color: #719ECE;
            box-shadow: 0 0 12px #719ECE;
        }    
         .profit-input-right{
            width: 370px;
            font-family: Mont;
            background-color: rgba(11, 21, 25, 0.7);
            padding-left: 7px;
            padding-right: 7px;
            padding-top: 7px;
            padding-bottom: 7px;
            margin-top: 9px;
            margin-bottom: 4px;
            margin-left: 4px;
            margin-right: 4px;
            border-radius: 10px;
            font-size: 17px;
            border-style: none;
            word-wrap: break-word;
            color: rgba(255, 255, 255, 0.95);
            box-shadow: 0 0 1px #c6e2ff;
        }
         .profit-input-right:focus{
            outline: none !important;
            border-color: #719ECE;
            box-shadow: 0 0 12px #719ECE;
        }     

/* Any Computer Screen */
@media screen and (min-device-width: 821px){ 
      @keyframes topBoxSlideIn {
        from{
          transform: translateX(-97%);
          filter: opacity(0%) blur(7px);
        }
        to{
          transform: translateX(-0%);
          filter: opacity(100%) blur(0px);
        }
      }
}
/* TABLETS */
@media screen and (min-device-width: 481px) and (max-device-width: 820px) { 
          @keyframes topBoxSlideIn {
            from{
              transform: translateX(-97%);
              filter: opacity(0%) blur(7px);
            }
            to{
              transform: translateX(-0%);
              filter: opacity(100%) blur(0px);
            }
          }
}
/* Phone Screens */
@media only screen and (max-device-width: 480px) {
    .hand-mode-display-toggle{
        display: block;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .hand-btn-right{
        padding-left: 7px;
        padding-right: 7px;
        padding-bottom: 25px;
        padding-top: 25px;
        border-radius: 28px;
        border-style: none;
        position: fixed;
        /*  */
        transform: translateY(-78px) translateX(319%);
         background-color: rgba(31, 146, 228, 0.15);
        box-shadow: inset 0px 0px 5.9px 1px rgba(0, 0, 0, 0.7);
        font-family: Mont2;
        /*  */
        color: #fff;
        -webkit-text-stroke-width: .04rem;
        -webkit-text-stroke-color: rgba(47, 47, 47, 0.33);  
    }
    .hand-btn-right:hover{
         background-color: rgba(0, 0, 0, 0.15);
    }
    .hand-btn-left{
        padding-left: 15px;
        padding-right: 15px;
        padding-bottom: 25px;
        padding-top: 25px;
        border-radius: 28px;
        background-color: rgba(31, 146, 228, 0.15);
        box-shadow: inset 0px 0px 5.9px 1px rgba(0, 0, 0, 0.7);
        border-style: none;
        font-family: Mont2;
        position: fixed;
        /*  */
        transform: translateY(-78px) translateX(2%);
        color: #fff;
        -webkit-text-stroke-width: .04rem;
        -webkit-text-stroke-color: rgba(47, 47, 47, 0.33);
    }
    .hand-btn-left:hover{
         background-color: rgba(0, 0, 0, 0.15);
    }
    .phone-size-hrs{
        display: inline;
        width: 90%;
        margin-top: 12px;
        margin-bottom: 12px;
    }
     .time-bar-edit-window{
        width: 95%;
        flex-direction: column;
    }
      .bottom-column-edit-window{
        width: 95%;
    }


  /*    .edit-window-pane{
        box-sizing: border-box;
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 15px;
        margin-bottom: 10px;
        padding-bottom: 5px;
        backdrop-filter: blur(7px) contrast(1.2) saturate(.2);
        background-color: rgba(11, 21, 25, 0.7);
        display: flex;
        left: 0;
        right: 0;
        bottom: 0;
        transform: translateY(70%);
        position: static;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        overflow: hidden;
    } */


    .edit-window-pane{
        transform: scaleX(1.02) translateY(-1%) translateX(-1.5%);
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 15px;
        margin-bottom: 0px;
        padding-bottom: 0px;
        height: 89%;
    }
    .edit-window-computer-tablet-box-bottom{
        display: none;
    }
    .edit-window-phone-box-bottom{
        display: block;
        height: 370px;
    }
    .edit-window-notes-column-phone{
            display: flex;
            box-sizing: border-box;
            flex-direction: column;
            justify-content: space-evenly;
            height: 310px;
            width: 100%;
            overflow-y: scroll;
            padding-bottom: 10px;
            padding-right: 7px;
            padding-top: 10px;
            border-radius: 9px;
            -webkit-box-shadow: inset 0px 0px 3px 3px rgb(17, 41, 54, .39);
            -moz-box-shadow: inset 0px 0px 3px 3px rgb(17, 41, 54, .39);
            box-shadow: inset 0px 0px 3px 3px rgb(17, 41, 54, .39);
        }
    .edit-window-notes-column-phone-hide{
        display: none;
    }
    .edit-window-profits-column-phone{
            display: flex;
            box-sizing: border-box;
            flex-direction: column;
            justify-content: space-evenly;
            height: 320px;
            width: 100%;
            overflow-y: scroll;
            padding-right: 7px;
            padding-bottom: 10px;
            border-radius: 9px;
            -webkit-box-shadow: 0px 0px 3px 3px rgb(17, 41, 54, .39);
            -moz-box-shadow: 0px 0px 3px 3px rgb(17, 41, 54, .39);
            box-shadow: 0px 0px 3px 3px rgb(17, 41, 54, .39); 
        }
    .edit-window-profits-column-phone-hide{
            display: none;
    }
    .store-address-label{
        font-size: 12px;
        }
    .store-name-input{
        width: 80%;
    }
    .store-address-input{
        width: 80%;
    }
    .name-address-container{
        width: 80%;
        padding-left: 5px;
        padding-right: 5px;
    }
    .pin-title-and-pin{
        flex-direction: row;
        padding-right: 10px;
    }
    .pin-edit-hr{
        display: none;
    }
    /* NOTES */
     .notes-and-profit{
        flex-direction: column;
    }
    .edit-window-notes-column{
        height: 185px;
        width: 100%;
        overflow-y: scroll;
        margin-bottom: 10px;
        padding-bottom: 20px;
        padding-right: 5px;
    }
    .edit-window-notes-controls{
        padding-bottom: 10px;
    }
    .edit-window-profits-column{
        height: 185px;
        width: 100%;
        overflow-y: scroll;
        padding-right: 5px;
        padding-bottom: 10px;
    }
    .edit-window-profits-controls{
        padding-bottom: 10px;
        padding-top: 10px;
    }
    .edit-window-profit-metric{
            font-size: 17px;
            letter-spacing: 1px;
            color: aliceblue;
            -webkit-box-shadow:  0px 0px 11px 5px rgba(83, 113, 145, 0.17); 
            box-shadow:   0px 0px 11px 5px rgba(79, 109, 141, 0.17);
        }
    .edit-window-only-profit-rows{
        overflow-y: scroll;
    }
    .edit-window-only-note-rows{
        overflow-y: scroll;
    }
    .edit-window-note-row{
        display: flex;
        flex-direction: row;
    }
    .stoplight-inputs-outer{
        flex-direction: row;
    }
    .stoplight-inputs-inner{
        width: 25%;
        flex-direction: column;
    }
    .above-timer-buttons{
        flex-direction: column;
        justify-content: space-evenly;
    }
    .pin-and-status{
        flex-direction: row;
    }
    .stoplight-inputs{
        flex-direction: column;
    }

    .note-input-left{
        width: 11%;
    }
    .note-input-middle{
        width: 34%;
    }
    .note-input-right{
        width: 34%;
    }
    .profit-input-right{
        width: 31%;
    }
    .profit-input-left{
        width: 31%;
    }
    .profit-remove-button{
        padding: 12px;
    }
    .note-remove-button{
        padding: 12px;

    }
}






/*  */
/*  */
/*  */
/*  */
/* icon imports */
    .bluePin{
        background-image: url('../assets/map-icons/blue-pin.png');
        height: 59px;
        width: 59px;
        background-repeat: no-repeat;
        background-position: center;
        align-self: center;
        box-shadow: inset 0px 0px 11px 3px rgba(0, 0, 0, 0.21);
        border-radius: 11px;
        backdrop-filter: blur(4px);
        margin-bottom: 3px;
        padding: 11px;
    }
    .greenPin{
        background-image: url('../assets/map-icons/green-pin.png');
        height: 59px;
        width: 59px;
        background-repeat: no-repeat;
        background-position: center;
        align-self: center;
        box-shadow: inset 0px 0px 11px 3px rgba(0, 0, 0, 0.21);
        border-radius: 11px;
        backdrop-filter: blur(4px);
        margin-bottom: 3px;
        padding: 11px;
    }
    .greyPin{
        background-image: url('../assets/map-icons/grey-pin.png');
        height: 59px;
        width: 59px;
        background-repeat: no-repeat;
        background-position: center;
        align-self: center;
        box-shadow: inset 0px 0px 11px 3px rgba(0, 0, 0, 0.21);
        border-radius: 11px;
        backdrop-filter: blur(4px);
        margin-bottom: 3px;
        padding: 11px;
    }
    .orangePin{
        background-image: url('../assets/map-icons/orange-pin.png');
        height: 59px;
        width: 59px;
        background-repeat: no-repeat;
        background-position: center;
        align-self: center;
        box-shadow: inset 0px 0px 11px 3px rgba(0, 0, 0, 0.21);
        border-radius: 11px;
        backdrop-filter: blur(4px);
        margin-bottom: 3px;
        padding: 11px;
    }
    .purplePin{
        background-image: url('../assets/map-icons/purple-pin.png');
        height: 59px;
        width: 59px;
        background-repeat: no-repeat;
        background-position: center;
        align-self: center;
        box-shadow: inset 0px 0px 11px 3px rgba(0, 0, 0, 0.21);
        border-radius: 11px;
        backdrop-filter: blur(4px);
        margin-bottom: 3px;
        padding: 11px;
    }
    .redPin{
        background-image: url('../assets/map-icons/red-pin.png');
        height: 59px;
        width: 59px;
        background-repeat: no-repeat;
        background-position: center;
        align-self: center;
        box-shadow: inset 0px 0px 11px 3px rgba(0, 0, 0, 0.21);
        border-radius: 11px;
        backdrop-filter: blur(4px);
        margin-bottom: 3px;
        padding: 11px;
    }
    .yellowPin{
        background-image: url('../assets/map-icons/yellow-pin.png');
        height: 59px;
        width: 59px;
        background-repeat: no-repeat;
        background-position: center;

        align-self: center;
        box-shadow: inset 0px 0px 11px 3px rgba(0, 0, 0, 0.21);
        border-radius: 11px;
        backdrop-filter: blur(4px);
        margin-bottom: 3px;
        padding: 11px;
    }
</style>