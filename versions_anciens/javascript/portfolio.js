var cells; //cette variable est globale


function initialize() {
    var head = document.head;
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        link.href = "css/portfolio_style_mobile.css";
        console.log("mobile detected");
        head.appendChild(link);
    }
    else {
        link.href = "css/portfolio_style.css";
        console.log("desktop detected");
        head.appendChild(link);
    }
}

//refrachîr le page
function refresh() {
    location.reload();
}

//enlever les boîtes
function hide(str) {
    console.log("removing " + str);
    document.getElementById(str).style.display = "none";
}

function displayElem(str) {
    console.log("displaying element " + str);
    document.getElementById(str).style.display = "table";
}

//montrer une section par cacher les autres
function show(str, str1, str2, str3) {
    try { displayElem(str) } catch (error) {
        console.log("element already visible");
    }
    try {
        hide(str1);
        hide(str2);
    } catch (error) { //si il y a une erreur, le page refraîchi
        refresh();
    }
    if (str3 == "") {
        console.log("only three boxes detected");
    } else {
        hide(str3);
    }
}