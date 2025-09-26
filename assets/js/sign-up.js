window.addEventListener('DOMContentLoaded', function(){

    let sign_up = this.document.getElementById("sign-up");
    let form = this.document.getElementById("form");
    let shown = this.document.getElementById("shown");
    let hide = this.document.getElementById("hide");
    let passwordField = document.getElementById("password");
    let agreement = this.document.getElementById("agree");
    
    shown.addEventListener('click', function(){
        passwordField.type  = "text"
        shown.classList.add('hidden')
        hide.classList.remove('hidden')
    })

    hide.addEventListener('click', function(){
        passwordField.type  = "password"
        hide.classList.add('hidden')
        shown.classList.remove('hidden')
    })

    form.addEventListener('submit', e=>{
        e.preventDefault();
    });

    sign_up.disabled = !agreement.checked
    agreement.addEventListener('change', (e)=>{
        sign_up.disabled = !e.target.checked
    })

    sign_up.addEventListener('click', signup)

})
function signup(){
    let name = document.getElementById("name");
    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let result = document.getElementById("result");

    if(name.value && username.value && email.value && password.value){
        result.innerHTML = `
            <div class="alert alert-success" role="alert">
                Sign up  Successfully :)
            </div>
        `
        name.disabled = true
        username.disabled = true
        email.disabled = true
        password.disabled = true
        this.disabled = true

        setTimeout(()=>{
            window.open('login.html', "_self");
        }, 2000)
    }else{
        result.innerHTML = `
            <div class="alert alert-danger" role="alert">
                All fields are required!
            </div>
        `
    }
    clearFields()
}

function clearFields(){
    console.log('enter')
    let allFields = document.querySelectorAll('input[type="text"],input[type="password"],input[type="email"]')
    allFields.forEach(field => field.value = "")
}
