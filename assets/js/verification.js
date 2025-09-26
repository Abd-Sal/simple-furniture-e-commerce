window.addEventListener('DOMContentLoaded', function(){
    let reg_email = this.document.getElementById('reg-email');
    let verify = this.document.getElementById("verify");
    let form = this.document.getElementById("form");

    let localEmail = this.localStorage.getItem('email');
    if(localEmail){

        reg_email.innerText += ` (${localEmail})`
    }else{
        this.document.body.innerHTML = `
            <div class="alert alert-danger" role="alert">
                404 Not Found
            </div>
        `
    }
    form.addEventListener('submit', e=>{
        e.preventDefault();
    });

    verify.addEventListener('click', Verify)

})
function Verify(){
    let code = document.getElementById("code");
    let result = document.getElementById("result");
    if(!code.value){
        result.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Verification code is required
            </div>
        `
    }else if(code.value === "123456"){
        code.disabled = true
        this.disabled = true

        localStorage.removeItem('email')
        result.innerHTML = `
            <div class="alert alert-success" role="alert">
                Verfication code is correct
            </div>
        `
        setTimeout(()=>{
            window.open('reset-password-page.html', "_self");
        }, 2000)
    }else{
        result.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Verification code invalid 
            </div>
        `
    }
    clearFields(code)
}

function clearFields(field){
    field.value = ""
}
