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
    background-color: rgba(3, 14, 21, .29);
    backdrop-filter: blur(1px);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: center;

}
.modal-container{
    width: 30vw;
    height: 30vh;
    background-color: rgba(3, 14, 21, .59);
    backdrop-filter: blur(5px);
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
</style>