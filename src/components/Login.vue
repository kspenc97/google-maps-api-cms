<template>
  <div class="loginOption" id="loginOption">
              <div class="login" id="login">

    <form id="login-form" class="login-form">
            <p class="acadia-login-title" id="login-title">Acadia Solutions</p>
            <input type="email" id="email-input" class="input" placeholder="Enter Email Here">
            <input type="password" id="password-input" class="input" placeholder="Enter password here">
                          <router-link to="/authorized" class="loginBtn"><p class='btn-text'>Log In</p></router-link>

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
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');
@font-face {
  font-family: Mont;
  src: url('~@/assets/fonts/Montserrat-Regular.ttf');
}
@font-face {
  font-family: Mont2;
  src: url('~@/assets/fonts/Montserrat-Light.ttf');
}
:root{
    --off-black: rgb(236, 236, 236);
}

html, body {
    
    margin:0px;
    
   }

.acadia-login-title{
    font-family: Mont2;
    color: rgba(236, 236, 236, 1);
    font-size: 38px;
    letter-spacing: 2px;
}



.loginOption{
    background-image: url('../assets/images/code.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: fixed;
    display: flex;
    flex-direction: column;
    transform: translateX(-10px) translateY(-10px);
    justify-content: center;
    height: 100vh;
    width: 100vw;
    padding: 0px;
    backdrop-filter: contrast(1.7);
    filter: hue-rotate(21deg) saturate(.9);
    background-color: rgba(0, 13, 36, 0.3);
    box-shadow: inset 0px 0px 217px 14px rgba(3, 18, 25, 0.9);;
    
}

.login{
    font-family: Mont2;
    height: 520px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 77px;
    margin-left: 5%;
    margin-right: 5%;
    border-style: none;
    background-color: rgba(0, 0, 0, .4);
    border-radius: 190px;
    box-shadow: inset 0px 0px 37px 14px rgba(2, 12, 17, 0.5);
    }
.login-form{
    display: flex;
    flex-direction: column;
    justify-content: center;
}

    .login-title{
    font-family: 'Lato', sans-serif;
    font-size: 35px;
    color: rgba(255, 255, 255, .8);
    display: flex;
    justify-content: center;
    }


.input{
    font-family: Mont;
    display: flex;

    align-self: center;
    width: 90%;
    padding: 29px;
    color: aliceblue;
    letter-spacing: 2px;
    font-size: 27px;
    border-radius: 50px;
    margin-bottom: 50px;
    box-shadow: 0 0 10px 5px rgba(248, 248, 248, 0.9);
    border-style: none;
    backdrop-filter: blur(3px) saturate(.9);
    background-color: rgba(25, 25, 25, 0.59);
    box-shadow: inset 0px 0px 37px 28px rgba(6, 40, 57, 0.75);

}



.loginBtn{
    width: 90%;
    align-self: center;
    font-family: Mont2;
    display: flex;
    justify-content: center;
    padding: 12px;
    scale: .8;
    border-radius: 100px;
    font-size: 27px;
    background-color: rgba(161, 217, 255, 0.3);
    backdrop-filter: blur(7.3px) contrast(1.14);
    border: none;
    box-shadow: inset 0 0 29px 11px rgba(39, 39, 39, 0.1);
    transition: scale .2s;
}
.btn-text{
    color: rgba(239, 239, 239, 0.8);
    text-decoration: underline;

}
.loginBtn:hover{
    display: flex;
    scale: .85;
    justify-content: center;
    padding: 17px;
    font-size: 27px;    
    color: white;
    background-color: rgba(138, 208, 255, 0.37);
    backdrop-filter: blur(8px) contrast(1.14) saturate(3);
    border: none;
    box-shadow: inset 0 0 29px 11px rgba(39, 39, 39, 0.1);
    box-shadow: 0 0 10px 5px rgba(219, 219, 219, 0.05);
    transition: scale .5s;

}






/* Any Computer Screen */
@media screen and (min-device-width: 821px){ 
  
}
/* TABLETS */
@media screen and (min-device-width: 481px) and (max-device-width: 820px) { 
    
}
/* Phone Screens */
@media only screen and (max-device-width: 480px) {
.login{
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 40px;
    padding-top: 30px;
    border-radius: 94px;
    align-self: center;
    justify-self: center;
    }

    .input{
   width: 70%;
    padding: 29px;
    color: aliceblue;
    letter-spacing: 2px;
    font-size: 21px;
    border-radius: 50px;
    margin-bottom: 50px;
   

}
.loginOption{
    padding: 2px;
    transform: scale(1.1) translateX(10px);

}
.loginBtn{
    padding: 5px;
    width: 80%;
}
}

</style>
