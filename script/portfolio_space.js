function initialize() {
    let head = document.head;
    let link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        link.href = "css/portfolio_space_mobile.css";
        console.log("mobile detected");
        head.appendChild(link);
    }
    else {
        link.href = "css/portfolio_space_desktop.css";
        console.log("desktop detected");
        head.appendChild(link);
    }
}

function showBox(str) {
    closeBox(); //close any boxes that might be open
    // console.log("showing box " + str);
    // console.log(document.getElementById(str));
    document.getElementById(str).style.display = "block";
}

function closeBox() {
    for (let i = 0; i < 6; i++) { //closes all
        document.getElementsByClassName("popup")[i].style.display = "none";
    }
}

// function hideTimeout() {
//         if (isOpen()) {
//             document.addEventListener("click", closeBox);
//         }
//         else{
//             document.removeEventListener("click", closeBox);
//         }
// }

// function isOpen(){
//     let x = false;
//     for (let i = 0; i < 6; i++) { 
//         if (document.getElementsByClassName("popup")[i].style.display = "none") {
//             x = true;;
//         }
//     }
//     return x;
// }