document.addEventListener("DOMContentLoaded", () => {

    let alertBox = document.getElementById("alerts");

    let radioLogin = document.getElementById("login");
    let radioSignup = document.getElementById("signup");
    let loginForm = document.getElementById("loginForm");
    let signupForm = document.getElementById("signupForm");

    // Function to show login form and hide sign-up form
    function showLoginForm() {
        loginForm.style.display = "block";
        signupForm.style.display = "none";
    }
    showLoginForm();

    // Function to show sign-up form and hide login form
    function showSignupForm() {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    }

    // Add event listeners to the radio buttons
    radioLogin.addEventListener("change", function () {
        if (this.checked) {
            showLoginForm();
        }
    });

    radioSignup.addEventListener("change", function () {
        if (this.checked) {
            showSignupForm();
        }
    });

    //signup Input Validation.

    let signupBtn = document.getElementById("signupBtn");
    let signupFormElements = document.querySelectorAll(".signupFormElement");
    
    
    
    //Other Varibles.
    let emailReq = ["@gmail.com", "@gmail.in", "@hotmail.com", "@yahoo.in", "@outlook.in"];
    const signupUserArr = JSON.parse(localStorage.getItem("users"));
    let loginUserArr = [];
    let isEmpty = false;
    const userData = JSON.parse(localStorage.getItem("userData"));
    
    //For empty.
    signupBtn.addEventListener("click", () => {
        for (let i = 0; i < signupFormElements.length; i++) {
            if (signupFormElements[i].value == "") {
                isEmpty = true;
                signupFormElements[i].classList.add("border-danger");
                signupFormElements[i].nextElementSibling.classList.remove("d-none");
            } else if(i == signupFormElements.length -1&& !isEmpty){
                signupValidate();
            }
        }
    })

    //Validation.
    function signupValidate() {

        let signupEmail = document.getElementById("signupEmail").value;
        let signupName = document.getElementById("signupName").value;
        let signupPass = document.getElementById("signupPass").value;

        let sliceString = signupEmail.slice(signupEmail.indexOf("@"));

        //Flags
        let validEmail = false;
        let emailExist = false;
        let validName = false;
        let validPass = false;
        
        //Email Validation.
        if(localStorage.getItem("users") != null){

            let existingEmail = JSON.parse(localStorage.getItem("users"));
            for(let i=1;i<existingEmail.length;i=i+3){
                
                if(existingEmail[i] === signupEmail){
                    emailExist = true;
                }
                
            }
        }
        
        for (let i = 0; i < emailReq.length; i++) {
            if (sliceString == emailReq[i]) {
                validEmail = true;
                break;
            } else if (i == emailReq.length - 1 && !validEmail) {
                validEmail = false;
            }
        }

        //Username Validation.
        for (let i = 0; i < signupName.length; i++) {
            let ch = signupName.charCodeAt(i);
            if (!(ch >= 65 && ch <= 90) && !(ch >= 97 && ch <= 122) && !(ch >= 48 && ch <= 57)) {
                validName = false;
                break;
            }else{
                validName = true;
            } 
        }

        //Password Validation.
        if (signupPass.length >= 8 && signupPass.length <= 32) {
            validPass = true;
        } else {
            validPass = false;
        }

        if (validEmail && validName && validPass && !emailExist) {

            signupUserArr.push(signupName, signupEmail, signupPass);
            console.log(signupUserArr);
            localStorage.setItem("users", JSON.stringify(signupUserArr));

            signupFormElements.forEach(element =>{
                element.value = "";
            })
            radioLogin.checked = true;
            showLoginForm();

        }
        if(!validEmail){
            signupFormElements[1].classList.add("border-danger");
            signupFormElements[1].parentElement.nextElementSibling.classList.remove("d-none");
            signupFormElements[1].parentElement.nextElementSibling.innerText = "Invalid Email !";

        }
        if(!validName){
            signupFormElements[0].classList.add("border-danger");
            signupFormElements[0].parentElement.nextElementSibling.classList.remove("d-none");
            signupFormElements[0].parentElement.nextElementSibling.innerText = "Username contains invalid Characters.";

        }
        if(!validPass){
            signupFormElements[2].classList.add("border-danger");
            signupFormElements[2].parentElement.nextElementSibling.classList.remove("d-none");
            signupFormElements[2].parentElement.nextElementSibling.innerText = "Password too short.";

        }
        if(emailExist){
            signupFormElements[1].classList.add("border-danger");
            signupFormElements[1].nextElementSibling.classList.remove("d-none");
            alertBox.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                Email Already in Use, Please Login to continue.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;

        }
    }

    //if user enters data;

    signupFormElements.forEach(element => {
        element.addEventListener("click", () => {
            if (element.classList.contains("border-danger")) {
                element.addEventListener("keydown", () => {
                    element.classList.remove("border-danger");
                    element.nextElementSibling.classList.add("d-none");
                    element.parentElement.nextElementSibling.classList.add("d-none");
                })
            }
        })
        element.addEventListener("change", () => {
            if (element.classList.contains("border-danger")) {
                element.addEventListener("keydown", () => {
                    element.classList.remove("border-danger");
                    element.nextElementSibling.classList.add("d-none");
                    element.parentElement.nextElementSibling.classList.add("d-none");
                })
            }
        })
    })

    //Login Validation.

    let loginBtn = document.getElementById("loginBtn");
    let loginFormElements = document.querySelectorAll(".loginFormElement");

    loginBtn.addEventListener("click", () => {
        for (let i = 0; i < loginFormElements.length; i++) {
            if (loginFormElements[i].value == "") {
                // console.log(signupFormElements[i].value);
                isEmpty = true;
                loginFormElements[i].classList.add("border-danger");
                loginFormElements[i].nextElementSibling.classList.remove("d-none");
            } else if (i == loginFormElements.length - 1 && !isEmpty) {
                loginValidate();
            }
        }
    });

    function loginValidate() {
        let loginEmail = document.getElementById("loginEmail").value;
        let loginPass = document.getElementById("loginPass").value;
        // console.log(loginEmail);

        loginUserArr = JSON.parse(localStorage.getItem("users"));

        for (let i = 0; i < loginUserArr.length; i = i + 3) {
            if (loginUserArr[i + 1] == loginEmail && loginUserArr[i + 2] == loginPass) {

                sessionStorage.setItem("loggedin", "true");
                sessionStorage.setItem("username", loginUserArr[i]);
                sessionStorage.setItem("usermail", loginUserArr[i + 1]);
                if(userData[loginEmail] == undefined){
                    userData[loginEmail] = [];
                    localStorage.setItem("userData", JSON.stringify(userData));
                }


                setTimeout(() => {
                    location.replace("index.html");
                }, 1000);

            } else {
                alertBox.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error</strong>Invalid Credentials entered.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
            }
        }
    }
});