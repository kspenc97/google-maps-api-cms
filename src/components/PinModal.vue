<template>
  <div class='modal-background'>
      <div class='modal-container'>
      <p class="modal-question">Load Address in Google Maps?</p>
      <div class="modal-button-cont">
      <button @click="dispatchConfirm" class="modal-button">Confirm</button>
      <button @click="dispatchCancel" class="modal-button">Cancel</button>
      </div>
      </div>
  </div>
</template>

<script>

export default {
/*       props: [
      'question',
      ],
      data(){
          return{
              modalQuestion: this.question,
          }
          
      }, */
      methods:{
          dispatchCancel(){
              this.$emit('resFromModal', {modalAnswer: false});
          },
          dispatchConfirm(){
              this.$emit('resFromModal', {modalAnswer: true});
          },
      }
}
</script>

<style scoped>
.modal-background{
    z-index: 5;
    background-color: rgba(3, 14, 21, .79);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: center;
 -webkit-animation: editFadeIn .5s ease-in-out;
    animation: editFadeIn .5s ease-in-out;

}
@keyframes editFadeIn {
   from{
          transform: translateY(10%);
          -webkit-filter: opacity(40%) blur(41px);
          filter: opacity(40%) blur(41px);

        }
    to{
        transform: translateY(0%);
       -webkit-filter: opacity(100%) blur(2px);
        filter: opacity(100%) blur(2px);

    }
}
.modal-container{
    width: 100%;
    height: 70%;
    padding-bottom: 20px;
    background-color: rgba(3, 14, 21, .59);
    backdrop-filter: blur(11px);
    display: flex;
    flex-direction: column;
        vertical-align: center;

}
.modal-question{
    font-size: 24px;
    color: whitesmoke;
    margin-bottom: 10%;
    letter-spacing: .3rem;
}
.modal-button-cont{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    vertical-align: center;
    align-content: center;
}

.modal-button{
    margin-bottom: 10%;
    margin-left: 7%;
    margin-right: 7%;
    /*  */
    color: rgba(239, 239, 239, 0.8);
    text-decoration: underline;
    width: 90%;
    align-self: center;
    font-family: Mont2;
    display: flex;
    justify-content: center;
    padding: 12px;
    scale: .8;
    border-radius: 100px;
    font-size: 27px;
    background-color: rgba(161, 217, 255, 0.48);
    backdrop-filter: saturate(.8) blur(7.3px) contrast(1.9);
    border: none;
    box-shadow: inset 0 0 29px 11px rgba(39, 39, 39, 0.1);
    transition: scale .2s;
}
.modal-button:hover{
    display: flex;
    scale: .9;
    justify-content: center;
    font-size: 27px;    
    color: white;
    background-color: rgba(138, 208, 255, 0.33);
    backdrop-filter: blur(8px) contrast(1.14) saturate(1.4);
    border: none;
    box-shadow: inset 0 0 29px 11px rgba(39, 39, 39, 0.2);
    box-shadow: 0 0 10px 5px rgba(219, 219, 219, 0.17);
    transition: scale .5s;

}




@media screen and (min-device-width: 821px){ 
  



}
/* TABLETS */
@media screen and (min-device-width: 481px) and (max-device-width: 820px) { 
 

}
/* Phone Screens */
@media only screen and (max-device-width: 480px) {
    .modal-button-cont{
        flex-direction: column;
    }
    .modal-container{
        width: 100%;
        height: 100%;
        padding: 15px;
    }
    .modal-button{
    scale: .7;
    justify-content: center;
    font-size: 21px;    
    color: white;
    background-color: rgba(138, 208, 255, 0.33);
    backdrop-filter: blur(8px) contrast(1.14) saturate(1.4);
    border: none;
    box-shadow: inset 0 0 29px 11px rgba(39, 39, 39, 0.2);
    box-shadow: 0 0 10px 5px rgba(219, 219, 219, 0.17);
    }

}
</style>