document.addEventListener("DOMContentLoaded", function () {
    //For Header
    const title = document.getElementById("title");
    const lead = document.getElementById("lead");
    const description = document.getElementById("description");
    const catArr = JSON.parse(localStorage.getItem("community"));

    title.innerText = catArr[0];
    lead.innerText = catArr[1];
    description.innerText = catArr[2];

    //For NavBar button.
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

    
    //For Threads.
    const modalTitle = document.getElementById("exampleModalLabel");
    modalTitle.innerText = `Join ${localStorage.getItem("title")} Community`;

    const exModal = document.getElementById("exampleModal");
    var modalInstance = new bootstrap.Modal(exModal, {});
    const formElements = document.querySelectorAll(".form-control");
    const emptyMsg = document.getElementById("emptyMessage");
    const saveBtn = document.getElementById("modalSave");
    const cont = document.getElementById("cardContainer");
    const noUser = document.getElementById("noUser");
    const joinNotLogin = document.getElementById("joinNotLogin");

    const joinBtn = document.getElementById("joinBtn");
    const leaveBtn = document.getElementById("leaveBtn");

    const userData = JSON.parse(localStorage.getItem("userData"));
    const communityData = JSON.parse(localStorage.getItem("communityData"));
    if(Object.keys(communityData).length == 0 || !(Object.keys(communityData)).includes(title.innerText)){
        communityData[title.innerText] = [];
        localStorage.setItem("communityData", JSON.stringify(communityData));
    }

    const communityMembers = JSON.parse(localStorage.getItem("communityMembers"));
    if(Object.keys(communityMembers).length == 0 || !(Object.keys(communityMembers)).includes(title.innerText)){
        communityMembers[title.innerText] = [];
        localStorage.setItem("communityMembers", JSON.stringify(communityMembers));
    }
    

    if((communityData[title.innerText]).length > 0){
        noUser.classList.add("d-none");
        for(let i=0;i<(communityData[title.innerText]).length;i++){
            cont.innerHTML += (communityData[title.innerText])[i];
        }
    }else{
        noUser.classList.remove("d-none");
    }

    checkBtns();
    
    //Flags.
    var isEmpty = false;
    let validDesignation = false;
    let formSubmitted = false;
    let hasJoined = false;
    
    const uName = document.getElementById("nameInput");
    const uMail = document.getElementById("mailInput");
    
    uName.value = sessionStorage.getItem("username");
    uName.disabled = true;
    uMail.value = sessionStorage.getItem("usermail");
    uMail.disabled = true;
    
    
    //check for empty inputs.
    saveBtn.addEventListener("click", ()=>{
        emptyMsg.innerText = "One or more input fields are empty!"
        for (let i=2; i<formElements.length; i++){
                if(formElements[i].value == ""){
                    formElements[i].classList.add("border-danger");
                    emptyMsg.classList.remove("d-none");
                    isEmpty = true;
                }else if(i == formElements.length - 1 && !isEmpty){
                    formValidation();
                }else {
                    isEmpty = false;
                }
        }
    });

    leaveBtn.addEventListener("click", ()=>{
        let userDataIndex = (userData[uMail.value]).indexOf(catArr[0]);
        (userData[uMail.value]).splice(userDataIndex, 1);
        localStorage.setItem("userData", JSON.stringify(userData));

        let communityMembersIndex = (communityMembers[catArr[0]]).indexOf(uMail.value);
        (communityMembers[catArr[0]]).splice(communityMembersIndex, 1);
        localStorage.setItem("communityMembers", JSON.stringify(communityMembers));

        let communityDataArr = communityData[catArr[0]];
        console.log(communityDataArr);
        for(let i=0;i<communityDataArr.length;i++){
            if(communityDataArr[i].search(sessionStorage.getItem("usermail")) > -1){
                console.log(communityDataArr[i]);
                (communityData[catArr[0]]).splice(communityDataArr[i], 1);
                break;
            }
        }
        console.log(communityDataArr);
        localStorage.setItem("communityData", JSON.stringify(communityData));

        location.reload();
    });

    //If user types after empty input warning.
    formElements.forEach(element =>{
        element.addEventListener("click", ()=>{
            if(element.classList.contains("border-danger")){
                element.addEventListener("keydown", ()=>{
                    element.classList.remove("border-danger");
                });
                element.addEventListener("change", ()=>{
                    element.classList.remove("border-danger");
                });
            }
        });
    });

    function formValidation(){
        const uLead = document.getElementById("leadInput").value;
        const uDesignation = document.getElementById("posInput").value;
        const uExperience = document.getElementById("expInput").value;

        for (let i = 0; i < uDesignation.length; i++) {
            let ch = uDesignation.charCodeAt(i);
            if (!(ch >= 65 && ch <= 90) && !(ch >= 97 && ch <= 122) && !(ch >= 48 && ch <= 57)) {
                validDesignation = false;
                break;
            } else {
                validDesignation = true;
            }
        }

        if(validDesignation){
            formSubmit(uLead, uDesignation, uExperience);
        }else{
            formElements[3].classList.add("border-danger");
            emptyMsg.classList.remove("d-none");
            emptyMsg.innerText = "Designation Field contains an Invalid Character!";
        }
        
    }

    function formSubmit(uLead, uDesignation, uExperience){

        let expString = `Experience : ${uExperience} Years`;

        cont.innerHTML += `<div class="card mt-5"><div class="card-body">
            <h5 class="card-title" id="cardTitle">${uName.value}</h5>
            <p>Contact: <a href="mailto: ${uMail.value}" style="text-decoration:none;color:blue">Send Mail</a></p>
            </p>
            <p class="card-text" id="cardLead">${uLead}</p>
            </div>
            <div class="card-footer text-body-secondary d-flex justify-content-between">
            <p id="cardExp">${expString}</p>
            <p>${uDesignation}</p>
            </div>
            </div>`;

        noUser.classList.add("d-none");
        formSubmitted = true;
        modalInstance.hide();
        updateUserData();
        updateCommunityMembers();
        updateCommunityData();
        checkBtns();
    }

    function checkBtns(){
        if(sessionStorage.getItem("loggedin") == null){
            joinBtn.classList.add("d-none");
            leaveBtn.classList.add("d-none");
            joinNotLogin.classList.remove("d-none");
        }else{
            joinBtn.classList.remove("d-none");
            leaveBtn.classList.add("d-none");
            joinNotLogin.classList.add("d-none");
            if((userData[sessionStorage.getItem("usermail")]).includes(catArr[0])){
                joinBtn.innerText = "Joined";
                joinBtn.disabled = true;
                joinBtn.classList.add("col-9");
                leaveBtn.classList.remove("d-none");
                leaveBtn.classList.add("col-2")
            }
        }
    }

    function updateUserData(){
        const userArr = Object.keys(userData);
        
        for(let i=0; i<userArr.length; i++){
            
            if(uMail.value == userArr[i]){
                    (userData[userArr[i]]).push(title.innerText);
                    localStorage.setItem("userData", JSON.stringify(userData));
                    hasJoined = true;
                    joinBtn.innerText = "Joined";
                    joinBtn.disabled = true;
            }
        }
    }

    function updateCommunityMembers(){
        const communityArr = Object.keys(communityMembers);

        for(let i=0;i<communityArr.length;i++){
            if(title.innerText == communityArr[i]){
                (communityMembers[communityArr[i]]).push(uMail.value);
                localStorage.setItem("communityMembers", JSON.stringify(communityMembers));
            }
        }
    }

    function updateCommunityData(){
        const communityCards = Object.keys(communityData);

        for(let i=0;i<communityCards.length;i++){
            if(title.innerText == communityCards[i]){
                (communityData[communityCards[i]]).push(cont.innerHTML);
                localStorage.setItem("communityData", JSON.stringify(communityData));
            }
        }
    }

});