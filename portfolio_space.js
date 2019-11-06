function initialize() {
    var head = document.head;
    var link = document.createElement("link");
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