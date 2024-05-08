document.addEventListener("DOMContentLoaded", ()=>{

        if(!JSON.parse(localStorage.getItem("scriptHasRun"))){

                const userData = {};
                localStorage.setItem("userData", JSON.stringify(userData));
                
                const communityMembers = {};
                localStorage.setItem("communityMembers", JSON.stringify(communityMembers));

                const communityData = {};
                localStorage.setItem("communityData", JSON.stringify(communityData));

                const cardsData = {};
                localStorage.setItem("cardsData", JSON.stringify(cardsData))
                
                localStorage.setItem("scriptHasRun", JSON.stringify(true));
        }
});