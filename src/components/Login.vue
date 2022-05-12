<template>
  <div class="hello">
  <div class="loginOption" id="loginOption">
    <form id="login-form" class="login-form">
        <div class="login" id="login">
            <h2 class="login-title" id="login-title">Acadia Solutions Login</h2>
            <input type="email" id="email-input" class="input" placeholder="Enter Email Here">
            <input type="password" id="password-input" class="input" placeholder="Enter password here">
                          <router-link to="/authorized" class="loginBtn">

            <button id="loginBtn" class="loginBtn">
                            Submit

              </button>
              </router-link>

        </div>
    </form>

</div>
</div>

</template>

<script>
export default {
  name: 'Login',
  props: {
    msg: String
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');

:root{
    --off-black: rgb(236, 236, 236);
}

html, body {
    margin:0px;
    
   }




.loginOption{
    background-image: url('../assets/images/code.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 100vh;
    padding: 40px;
    
}

.login{
    display: flex;
    flex-direction: column;
    padding: 50px;
    margin-left: 20px;
    margin-right: 20px;
    border: 1px solid whitesmoke;
    background-color: rgba(0, 0, 0, .3);
    border-radius: 90px;
    box-shadow: 2px 3px 7px 3px rgba(255, 255, 255, 0.4);
    }

    .login-title{
    font-family: 'Lato', sans-serif;
    font-size: 35px;
    color: rgba(255, 255, 255, .8);
    display: flex;
    justify-content: center;
    }


.login input{
    display: flex;
    justify-content: center;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid whitesmoke;
    margin: 10px;
    box-shadow: 0 0 10px 5px rgba(248, 248, 248, 0.3);
    border: 3px solid whitesmoke;

}
.login input.success{
    border: 3px solid darkgreen;
}
.login input.fail{
    border: 3px solid maroon;

}


.loginBtn{
    display: flex;
    justify-content: center;
    padding: 17px;
    scale: .8;
    border-radius: 37px;
    font-size: 27px;
    color: teal;
    border: none;
    box-shadow: 0 0 10px 5px rgba(218, 218, 218, 0.3);
    transition: scale .2s;
}

.loginBtn:hover{
    display: flex;
    scale: .9;
    justify-content: center;
    padding: 17px;
    border-radius: 37px;
    font-size: 27px;    
    color: white;
    background-color: teal;
    border: none;
    box-shadow: 0 0 10px 5px rgba(219, 219, 219, 0.3);
    transition: scale .2s;

}






@media screen and (max-width: 768){
        .login-form{
               margin: 0px; 
        }
}


</style>
