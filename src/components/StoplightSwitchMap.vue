<template>
  <!-- Switch -->
    <div class="switchCont-map">
        <div v-if="stoplightSwitch">
        <p class="switchTitle-map">Change Pin Mode</p>
        </div>
        <div  v-if="!stoplightSwitch">
        <p class="switchTitle-map">Change Pin Mode</p>
        </div>
        <label class="switch-map">
                <input class="switch-input-map" type="checkbox" id='viewSwitch' @click="stoplightSwitchClick">
                <span class="slider-map"></span>
        </label>
    </div>
    <!-- Switchend -->
</template>

<script>
export default {
data(){
    return{
        // for export when switch is clicked
        stoplightSwitch: false,
    }
},
methods:{
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


/* The switch START - the box around the slider */
.switchCont-map{
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  margin-top: 10px;
  margin-bottom: 20px;
}
.switchTitle-map{
  font-size: 14px;
  font-family: Mont2;
  
}
.switch-map{
    position: relative;
    display: inline-block;
    
    width: 100px;
    height: 24px;
    padding: 15px;
    
  }
  
  /* Hide default HTML checkbox */
  .switch-input-map{
    opacity: 0;
    
    width: 0;
    height: 0;
    /*  */
    
  }
  /* The slider */
  .slider-map{
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
  
  .slider-map:before {
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
  
  .switch-input-map:checked + .slider-map{
    background-color: rgba(237, 237, 237, 0.2);
  }
  
  .switch-input-map:focus + .slider-map{
    box-shadow: 1 1 1px #2196F3;
  }
  
  .switch-input-map:checked + .slider-map:before {
    -webkit-transform: translateX(70px);
    -ms-transform: translateX(70px);
    transform: translateX(67px);
  }
  /* Switch END */





@media screen and (min-device-width: 821px){ 
  



}
/* TABLETS */
@media screen and (min-device-width: 481px) and (max-device-width: 820px) { 
  .switchCont-gate-2{
    align-content: center;
    right: 10px;
    padding: 15px;
    line-height: 20px;
    position: relative;
  }
  .switchTitle-gate-2{
    align-self: center;
    font-size: 14px;
    padding: 5px;
  }

}
/* Phone Screens */
@media only screen and (max-device-width: 480px) {
  .switchCont-gate-2{
    align-content: center;
    right: 10px;
    padding: 15px;
    line-height: 20px;
    position: relative;
  }
  .switchTitle-gate-2{
    align-self: center;
    font-size: 14px;
    padding: 5px;
  }

}
</style>