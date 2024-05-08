document.addEventListener("DOMContentLoaded", () => {
    //To display and manipulate cards.
    const cardsContainer = document.getElementById("cardsContainer");
    
    if(JSON.parse(localStorage.getItem("displayCards")) != null){
        cardsContainer.innerHTML = `${JSON.parse(localStorage.getItem("displayCards"))}`;
    }else{
       cardsContainer.innerHTML = `<h1 class="fw-bold text-center m-5">No Categories added yet, Be the first person to start.</h1>`;
    }

    //For Navigation.
    let noLogin = document.getElementById("noLogin");
    let Login = document.getElementById("Login");
    let notLoggedinMsg = document.getElementById("notLoggedinMsg");
    const addCatBtn = document.getElementById("addCatBtn");

    if (sessionStorage.getItem("loggedin") == "true") {
        noLogin.style.display = "none";
        Login.style.display = "block";
        Login.innerHTML = `Welcome <a href="user.html" class="text-decoration-none text-dark"><b>${sessionStorage.getItem("username")}</b></a>`;
        notLoggedinMsg.classList.add("d-none");
        addCatBtn.classList.remove("d-none");
    } else {
        noLogin.style.display = "block";
        Login.style.display = "none";
        notLoggedinMsg.classList.remove("d-none");
        addCatBtn.classList.add("d-none");
    }

    //For Adding Category.
    const addBtn = document.getElementById("catBtn");
    const emptyError = document.getElementById("emptyMessage");
    const formElements = document.querySelectorAll(".form-control");
    const alerts = document.getElementById("alerts");
    const exModal = document.getElementById("exampleModal");
    let cards = document.querySelectorAll(".card");
    var modalInstance = new bootstrap.Modal(exModal, {});
    const catArr = [];

    //Flags.
    var isEmpty = false;
    //When Add button is clicked.
    addBtn.addEventListener("click", () => {
        for (let i = 0; i < formElements.length; i++) {
            if (formElements[i].value == "") {
                formElements[i].classList.add("border-danger");
                emptyError.classList.remove("d-none");
                emptyError.innerText = "One or more input fields are empty!";
                isEmpty = true;
            } else if (i == formElements.length - 1 && !isEmpty) {
                addCategory();
            }else{
                isEmpty = false;
            }
        }
    });

    function addCategory() {
        //DOM Content.
        const catName = document.getElementById("catNameInput").value;
        const catLead = document.getElementById("catLeadInput").value;
        const catDescription = document.getElementById("catDescriptionInput").value;

        //Flags.
        let validName = false;
        //Check Name Validation.
        for (let i = 0; i < catName.length; i++) {
            let ch = catName.charCodeAt(i);
            if (!(ch >= 65 && ch <= 90) && !(ch >= 97 && ch <= 122) && !(ch >= 48 && ch <= 57)) {
                validName = false;
                break;
            } else {
                validName = true;
            }
        }
        //Process.
        if (!validName) {
            formElements[0].classList.add("border-danger");
            emptyError.classList.remove("d-none");
            emptyError.innerText = "Name Cannot have a special character.";
        } else if (validName) {
            cardsContainer.innerHTML += `<div class="card m-5" style="width: 18rem;cursor: pointer;">
            <img src="https://source.unsplash.com/random/400x400/?${catName}" class="card-img-top" alt="..." />
            <h5 class="card-title p-3 mb-0">${catName}</h5>
            <div class="card-body">
              <p class="card-text">
              ${catLead}
              </p>
              <p class="description visually-hidden">${catDescription}</p>
            </div>
          </div>`;

            localStorage.setItem("displayCards", JSON.stringify(cardsContainer.innerHTML));
            modalInstance.hide();
            storeCategories();

            alerts.innerHTML = `<div class="alert alert-primary alert-dismissible fade show" role="alert">
          <strong>Success !</strong> Category Added.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;
        }

    }
    //If typing in input after error.
    formElements.forEach(element => {
        element.addEventListener("click", () => {
            if (element.classList.contains("border-danger")) {
                element.addEventListener("keydown", () => {
                    element.classList.remove("border-danger");
                });
            }
        });
    });

    

    function storeCategories() {
        cards = document.querySelectorAll(".card");
        let titleArr = [];
        const cardsData = JSON.parse(localStorage.getItem("cardsData"));

        cards.forEach(element=>{
            titleArr.push(element.getElementsByTagName("h5")[0].innerText);
            
        });

        for(let i=0;i<cards.length;i++){
            cardsData[titleArr[i]] = cards[i].outerHTML;
        }

        localStorage.setItem("cardsData", JSON.stringify(cardsData));

         //Content towards Thread Page.
        cards.forEach(e => {
            // Check if the element is defined
            e.addEventListener("click", () => {
                // Get the card title
                let cardTitle = e.querySelector(".card-title");
                // Get the card lead
                let cardLead = e.querySelector(".card-text");
                // Get the card description
                let cardDescription = e.querySelector(".description");

                // Check if elements are found
                if (cardTitle && cardLead && cardDescription) {
                    // Extract text content
                    catArr.push(cardTitle.textContent, cardLead.textContent, cardDescription.textContent)

                    // Store the title and description in localStorage
                    localStorage.setItem("community", JSON.stringify(catArr));

                    // Redirect to the thread page
                    window.location.href = "thread.html";
                }
            });
        });
    }
    storeCategories();
});