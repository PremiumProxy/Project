document.addEventListener("DOMContentLoaded", ()=>{

    const cardsContainer = document.getElementById("showCommunities");
    const altrText = document.getElementById("alternate-text");
    const totalCommunities = document.getElementById("totalCommunities");
    const logout = document.getElementById("logoutBtn");

    const userData = JSON.parse(localStorage.getItem("userData")); 
    const cardsData = JSON.parse(localStorage.getItem("cardsData"));

    let currentUser;

    if(userData[sessionStorage.getItem("usermail")] != undefined){
        currentUser = userData[sessionStorage.getItem("usermail")];
    }
    totalCommunities.innerText = currentUser.length;

    if(currentUser.length == 0){
        altrText.classList.remove("d-none");
    }

    for(let i=0; i<currentUser.length; i++){
        cardsContainer.innerHTML += cardsData[currentUser[i]];
    }

    logout.addEventListener("click", userLogout);

    const cards = document.querySelectorAll(".card");
    const catArr = []
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

    function userLogout(){
        sessionStorage.clear();
        setTimeout(() => {
            location.replace("index.html");
        }, 1000);
    }
    
});