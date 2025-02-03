const emailInput = document.getElementById("user-email");
const passInput = document.getElementById("inputPassword2");

const subBtn = document.getElementById("loginBtn");

subBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    if(emailInput.value === "" || passInput.value === ""){
        alert ("Fill the inputs ,Please.");
    }else{
        window.location.href = 'homePage.html';
    }
})
