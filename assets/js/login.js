window.addEventListener('DOMContentLoaded', function(){

    let login_btn = this.document.getElementById("login");
    let form = this.document.getElementById("form");
    let shown = this.document.getElementById("shown");
    let hide = this.document.getElementById("hide");
    let passwordField = document.getElementById("password");
    
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

    login_btn.addEventListener('click', login)

})
function login(){
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let result = document.getElementById("result");

    if(!email.value || !password.value){
        result.innerHTML = `
            <div class="alert alert-danger" role="alert">
                email and password are required !
            </div>
        `
    }else if(email.value === 'admin@gmail.com' && password.value === '123'){
        console.log('login success');
        result.innerHTML = `
            <div class="alert alert-success" role="alert">
                Login Done Successfully :)
            </div>
        `
        email.disabled = true
        password.disabled = true
        this.disabled = true

        setTimeout(()=>{
            console.log("sleep")
            window.open('index.html', "_self");

        }, 2000)
    }else{
        console.log('login faild');
        result.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Email/Password is invalid :(
            </div>
        `;
    }
    clearFields(email, password)
}

function clearFields(emailField, passwordField){
    emailField.value = ""
    passwordField.value = ""
}
