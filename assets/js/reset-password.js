window.addEventListener('DOMContentLoaded', function(){
    let shown = this.document.getElementById("shown");
    let hide = this.document.getElementById("hide");
    let passwordField = document.getElementById("password");
    let reset = document.getElementById("reset");
    
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

    reset.addEventListener('click', resetPassword);
});
function resetPassword(){
    let passwordField = document.getElementById("password");
    let result = document.getElementById("result");

    if(passwordField.value){
        passwordField.disabled = true
        this.disabled = true

        result.innerHTML = `
            <div class="alert alert-success" role="alert">
                password reset successfully
            </div>
        `
        setTimeout(()=>{
            window.open('login.html', "_self");
        }, 2000)
    }else{
        result.innerHTML = `
            <div class="alert alert-danger" role="alert">
                New password is required
            </div>
        `
    }
    clearFields(passwordField)
}
function clearFields(field){
    field.value = ""
}

