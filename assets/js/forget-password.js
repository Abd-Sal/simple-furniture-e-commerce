window.addEventListener('DOMContentLoaded', function(){

    let send_otp = this.document.getElementById("send-otp");
    let form = this.document.getElementById("form");


    form.addEventListener('submit', e=>{
        e.preventDefault();
    });

    send_otp.addEventListener('click', SendOTP)

})
function SendOTP(){
    let email = document.getElementById("email");
    let result = document.getElementById("result");
    if(!email.value){
        result.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Email is required
            </div>
        `
    }else if(email.value.includes('@') && email.value.includes('.') && email.value.length > 3){
        email.disabled = true
        this.disabled = true

        localStorage.setItem('email', email.value.trim())
        result.innerHTML = `
            <div class="alert alert-success" role="alert">
                Verfication code sent successfully
            </div>
        `
        setTimeout(()=>{
            window.open('verification-page.html', "_self");
        }, 2000)
    }else{
        result.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Email format is wrong
            </div>
        `
    }
    clearFields(email)
}

function clearFields(emailField){
    emailField.value = ""
}
