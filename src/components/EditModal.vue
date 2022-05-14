<template>
  <div class='modal-background'>
      <div class='modal-container'>
      <p class="modal-question">{{this.modalQuestion}}</p>
      <div class="modal-button-cont">
      <button @click="dispatchConfirm" class="modal-button">Confirm</button>
      <button @click="dispatchCancel" class="modal-button">Cancel</button>
      </div>
      </div>
  </div>
</template>

<script>

export default {
      props: [
      'inboundVal',
      ],
      data(){
          return{
              modalQuestion: this.question,
          }
      },
      methods:{
          dispatchCancel(){
                this.$emit('resFromModal', {modalAnswer: 'CLOSE_MODAL'});
          },
          dispatchConfirm(){
              switch(this.inboundVal){
                  case 'delete_store_btn':
                    this.$emit('resFromModal', {modalAnswer: 'CONFIRM_DELETE_STORE'});
                   break;
                   case 'delete_note_btn':
                     this.$emit('resFromModal', {modalAnswer: 'CONFIRM_DELETE_NOTE'});
                    break;
                    case 'edit_address_btn':
                      this.$emit('resFromModal', {modalAnswer: 'CONFIRM_EDIT_ADDRESS'});
                    break;
                    case 'delete_profit_btn':
                      this.$emit('resFromModal', {modalAnswer: 'CONFIRM_DELETE_PROFIT'});
                    break;
                    case 'reset_timer_btn':
                      this.$emit('resFromModal', {modalAnswer: 'CONFIRM_RESET_TIMER'});
                    break;
              }
          },
      },
      created(){
          switch(this.inboundVal){
              case 'delete_store_btn':
                  this.modalQuestion = 'Are you sure you want to delete this store from the database?';
                break;
              case 'delete_note_btn':
                  this.modalQuestion = 'Are you sure you want to delete this note from the database?';
                  break;
               case 'reset_timer_btn':
                   this.modalQuestion = 'Are you sure you want to reset the timer for this store?';
                break;
                case 'delete_profit_btn':
                    this.modalQuestion = 'Are You sure you want to delete this saved store profit from the database?';
                break;
                case 'edit_address_btn':
                    this.modalQuestion = 'Are you sure you want to edit the address of this store?';
                break;
          }
      },
}
</script>

<style scoped>
.modal-background{
    background-color: rgba(3, 14, 21, .29);
    backdrop-filter: blur(9px) contrast(.8);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: center;
    /* Stops overflow pt 1 */
    padding: .1px;
    /*  */
  -webkit-animation: editFadeIn .5s ease-out;
    animation: editFadeIn .5s ease-out;

}
@keyframes editFadeIn {
   from{
          transform: translateY(10%);
          -webkit-filter: opacity(40%) blur(81px);
          filter: opacity(0%) blur(41px);

        }
    to{
          transform: translateY(0%);

       -webkit-filter: opacity(100%) blur(0px);
        filter: opacity(100%) blur(0px);

    }
}
.modal-container{
    /* Stops overlfow pt 2 */
    box-sizing: border-box;
    height: 100%;
    background-color: rgba(3, 14, 21, .59);
    backdrop-filter: blur(15px) contrast(.9);
    filter: contrast(1.57) saturate(2.7);
    padding: 15px;
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
    background-color: rgba(161, 217, 255, 0.28);
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
    .modal-button{
    scale: .8;
    justify-content: center;
    font-size: 27px;    
    color: white;
    background-color: rgba(138, 208, 255, 0.33);
    backdrop-filter: blur(8px) contrast(1.14) saturate(1.4);
    border: none;
    box-shadow: inset 0 0 29px 11px rgba(39, 39, 39, 0.2);
    box-shadow: 0 0 10px 5px rgba(219, 219, 219, 0.17);
    }

}
</style>