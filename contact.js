document.addEventListener("DOMContentLoaded", ()=>{

    //For Navigation Bar. 
    let noLogin = document.getElementById("noLogin");
    let Login = document.getElementById("Login");
    if (sessionStorage.getItem("loggedin") == "true") {
        noLogin.style.display = "none";
        Login.style.display = "block";
        Login.innerHTML = `Welcome <a href="user.html" class="text-decoration-none text-dark"><b>${sessionStorage.getItem("username")}</b></a>`;
    } else {
        noLogin.style.display = "block";
        Login.style.display = "none";
    }
    //Flags.
    let formSubmitted = false;
    let emptyFlag = false;

    //Submit Form.
    let formElements = document.querySelectorAll(".formElement");
    let submit = document.getElementById("submitBtn");
    let uname = document.getElementById("contactName");
    let mail = document.getElementById("contactEmail");
    let alerts = document.getElementById("alerts");


    if (sessionStorage.getItem("loggedin") == "true") {
        uname.value = sessionStorage.getItem("username");
        mail.value = sessionStorage.getItem("usermail");
    }
        
    
    submit.addEventListener("click", ()=>{
        //check for empty.
        for(let i=0; i<formElements.length; i++){
            if(formElements[i].value == "" && !formSubmitted){
                formElements[i].classList.add("border-danger");
                formElements[i].nextElementSibling.classList.remove("d-none");
                emptyFlag = true;
            }else if(i == formElements.length - 1 && !emptyFlag){
                submitForm();
            }else{
                emptyFlag = false;
            }
        }
    })

    formElements.forEach(element =>{
        element.addEventListener("click", ()=>{
            if(element.classList.contains("border-danger")){
                element.addEventListener("keydown", ()=>{
                    element.classList.remove("border-danger");
                    element.nextElementSibling.classList.add("d-none");
                })
            }
        })
    });

    function submitForm(){
        formSubmitted = true;
        alerts.innerHTML = `<div class="alert alert-primary alert-dismissible fade show" role="alert">
        <strong>Form Submitted!</strong> We will get back to you shortly.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`

        formElements[2].value = "";
        formElements[3].value = "";
        
    }

    
});