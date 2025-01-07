
const fileElem = document.getElementById("avatar"); 
const fileSelect = document.getElementById("file__select"); 

fileSelect.addEventListener("click", handleFileSelect, false);

function handleFileSelect(e){
    if(fileElem){
        fileElem.click();
    }
    e.preventDefault(); 
}

fileElem.addEventListener("change", handleFiles, false); 

function handleFiles(){
    const imgElem = document.getElementById("thumbnail");

    if(this.files.length){
        let imgSize = this.files[0].size;

        if((imgSize / 1000) >= 500){
            console.log("image is to big"); 
        }
        
        // get element holding user avatar for ticket
        const userAvatar = document.getElementById("user__avatar"); 
        
        imgElem.src = URL.createObjectURL(this.files[0]);

        // use thumbnail to set temporary image on the ticket
        userAvatar.src = imgElem.src; 

        imgElem.onload = () =>{
            URL.revokeObjectURL(imgElem.src); 
        }        
    
        const fileControl = document.getElementById("file__control"); 
        
        const fileMsg = document.querySelector(".file__msg"); 
        const fileMsgVisible = fileMsg.getAttribute("data-visible");

        if(fileMsgVisible === "true"){
            fileMsg.setAttribute("data-visible", "false");  
            const fragment = document.createDocumentFragment(); 
            const removeImgBtn = document.createElement("a"); 
            const changeImgBtn = document.createElement("a");
            changeImgBtn.addEventListener("click", handleFileSelect, false); 
            
            removeImgBtn.setAttribute("class", "remove__image"); 
            changeImgBtn.setAttribute("class", "change__image");
            
            
            removeImgBtn.textContent = "Remove image"; 
            changeImgBtn.textContent = "Change image";
            
            fragment.appendChild(removeImgBtn); 
            fragment.appendChild(changeImgBtn); 
            
            fileControl.appendChild(fragment);
        }

        console.log(this.files.length);  
    }
}

const submitBtn = document.querySelector("form");
submitBtn.addEventListener("submit", (e) => {
    e.preventDefault();     

    const ticketIndex= document.getElementById("ticket__index");
    const formElem = document.querySelector("form"); 
    const topText = document.getElementById("top__text"); 
    const bottomText = document.getElementById("bottom__text"); 
    topText.style.display = "none";
    bottomText.style.display = "none"; 
    formElem.style.display = "none"; 
    ticketIndex.style.display = "block"; 

    // user information to generate ticket
    const fullName = document.getElementById("name"); 
    const email = document.getElementById("email"); 
    const githubUserName = document.getElementById("github"); 

    // placeholders for user information 
    const holderUserName = document.querySelectorAll(".user__name");
    const holderUserEmail = document.querySelector(".user__email"); 
    const holderCurrDate = document.querySelector(".date"); 
    const holderGithub = document.querySelector(".user__github");

    // grab current date
    const date = new Date();
    const currYear = date.getFullYear(); 

    const currMonth = date.getMonth(); 
    const months = 
    ['Jan', 'Feb', "Mar", "Apr", 'May', 
        'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
        'Nov', 'Dec'
    ];

    const currDay = date.getDay(); 
    
    // input user information into placeholders
    holderUserName.forEach((element) => {
        element.textContent = fullName.value;
    }); 
    holderCurrDate.textContent = `${months[currMonth]} ${currDay}, ${currYear} / Austin, TX`;
    holderUserEmail.textContent = email.value; 
    holderGithub.textContent = githubUserName.value;

    
});
