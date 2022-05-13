<template>
  <!-- Switch -->
    <div class="switchCont-gate-2">

      <div class='list-settings-tray'>
        <!--  -->
        <div v-if="orderSwitchVal=== 'color' ">
        <div class='list-settings-box'>
        <p class="select-list-label">Top Color</p>
            <select 
                  class='select-list-switch' 
                  @change.prevent="selectChange($event)" 
                >
                <option value="placeholder" disabled>Select an option</option>
                <option value="color bluePin" selected>Blue</option>
                <option value="color redPin">Red</option>
                <option value="color greenPin">Green</option>
                <option value="color purplePin">Purple</option>
                <option value="color orangePin">Orange</option>
                <option value="color greyPin">Grey</option>
                <option value="color yellowPin">Yellow</option>
              </select>
           </div>
        </div>
        <!--  -->
        <div v-if="orderSwitchVal === 'stoplight' ">
          <div class='list-settings-box'>
            <p class="select-list-label">Top Status</p>
                <select 
                      class='select-list-switch' 
                      @change.prevent="selectChange($event)" 
                    >
                    <option value="placeholder" disabled >Select an option</option>
                    <option value="status redPin" selected>Red</option>
                    <option value="status yellowPin">Yellow</option>
                    <option value="status greenPin">Green</option>
                  </select>
            </div>
        </div>


              <div class='list-settings-box'>
                      <p class="select-list-label">Sort Mode</p>
                          <select 
                                class='select-list-switch' 
                                @change.prevent="selectChange($event)" 
                              >
                              <option value="placeholder" disabled >Select an option</option>
                              <option value="mode STATUS_SORT" selected>Sort by Status</option>
                              <option value="mode COLOR_SORT">Sort by Color</option>
                            </select>
              </div>
    </div>

     


    </div>
</template>

<script>
export default {
data(){
    return{
        // for export when switch is clicked
        stoplightSwitch: false,
        orderSwitchVal: 'stoplight'
    }
},
computed:{
  orderSwitch(){
    return this.orderSwitchVal;
  }
},
methods:{
     selectChange(event){
      let splitArr = event.target.value.split(" ");
        switch(splitArr[0]){
          case 'mode':
            this.calcSecondarySelect(splitArr[1]);
            this.$emit('sorterChange', { mode: splitArr[1]});
          break;
          case 'color':
              this.$emit('sorterChange', { color: splitArr[1]});
          break;
          case 'status':
            this.$emit('sorterChange', { status: splitArr[1]});
          break;
        }
    },
    calcSecondarySelect(calc){
      switch(calc){
        case 'STATUS_SORT':
            this.orderSwitchVal = 'stoplight';
        break;
        case 'COLOR_SORT':
            this.orderSwitchVal = 'color';
        break;
      }
    },
     stoplightSwitchClick(){
      if(this.stoplightSwitch === false){
        this.stoplightSwitch = true;
        this.$emit('StoplightMapChange', {stoplightMapVal: this.stoplightSwitch})
      }else if(this.stoplightSwitch === true){
        this.stoplightSwitch = false;
        this.$emit('StoplightMapChange', {stoplightMapVal: this.stoplightSwitch})

      }
    },
}
}
</script>

<style scoped>
.select-list-switch{
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
.select-list-switch:hover{
  color: rgb(30, 52, 69);
  background-color: rgba(12, 12, 12, 0.21);
  -webkit-box-shadow: inset 0px 0px 7px 3px rgba(9, 30, 53, 0.7); 
  box-shadow: inset 0px 0px 7px 3px rgba(9, 30, 53, 0.7); 

}

/* Made to add more settings in here */
.list-settings-tray{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
}
.list-settings-box{
  width: 280px;
}








/* The switch START - the box around the slider */
.switchCont-gate-2{
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  margin-top: 10px;
  margin-bottom: 20px;
}
.switchTitle-gate-2{
  font-size: 14px;
  font-family: Mont2;
  
}
.switch-gate-2{
    position: relative;
    display: inline-block;
    
    width: 100px;
    height: 24px;
    padding: 15px;
    
  }
  
  /* Hide default HTML checkbox */
  .switch-input-gate-2{
    opacity: 0;
    
    width: 0;
    height: 0;
    /*  */
    
  }
  /* The slider */
  .slider-gate-2{
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
    
    /*  */
    -webkit-box-shadow: inset 0px 0px 7px 3px #000000; 
    box-shadow: inset 0px 0px 7px 3px #000000;
  }
  
  .slider-gate-2:before {
    position: absolute;
    content: "";
    height: 7px;
    width: 7px;
    left: 11px;
    bottom: 8px;
    background-color: rgba(249, 249, 249, 0.5);
    -webkit-transition: .2s;
    transition: .2s;
    padding: 15px;
    border-radius: 32px;
     /*  */
    -webkit-box-shadow: 0px 0px 7px 3px #000000; 
    box-shadow: 0px 0px 7px 3px #000000;
  }
  
  .switch-input-gate-2:checked + .slider-gate-2{
    background-color: rgba(237, 237, 237, 0.2);
  }
  
  .switch-input-gate-2:focus + .slider-gate-2{
    box-shadow: 1 1 1px #2196F3;
  }
  
  .switch-input-gate-2:checked + .slider-gate-2:before {
    -webkit-transform: translateX(70px);
    -ms-transform: translateX(70px);
    transform: translateX(67px);
  }
  /* Switch END */





@media screen and (min-device-width: 821px){ 
  



}
/* TABLETS */
@media screen and (min-device-width: 481px) and (max-device-width: 820px) { 
  

}
/* Phone Screens */
@media only screen and (max-device-width: 480px) {
  .list-settings-box{
    width: 159px;
  }

}
</style>