import { Job } from "./job.js";

JSONget();
var jobList = []; //jobs

let prom = JSONget("http://localhost:1337/portfolios");
//get JSON then create objects 
prom.then((value) => {
    //description - no oo required
    let text = document.createTextNode(value[0].description);
    document.getElementById("description").appendChild(text);
    //links - also no oo required
    value[0].hyperlinks.forEach((item) => {
        let img = document.createElement("img");
        img.setAttribute("class", "icon");
        img.setAttribute("src", item.iconurl);
        let a = document.createElement("a");
        a.setAttribute("href", item.url);
        a.appendChild(img);
        document.getElementById("hyperlinktarget").appendChild(a);
        if (item.id == "4") { //so there's a line break after first 3 - looks better
            let br = document.createElement("br");
            document.getElementById("hyperlinktarget").appendChild(br);
        }
    });
    //jobs
    value[0].jobs.forEach((item) => {
        let newJob = new Job(item.name, item.org, item.year, item.desc, item.boxid, item.position);
        jobList.push(newJob);
    });
    //competences
    var ulParent = document.createElement("ul");
    value[0].competences.forEach((item) => {
        console.log("each iteration: ");
        console.log(item);
        var article = document.createElement("article");
        let h2 = document.createElement("h2");
        let text = document.createTextNode(item.title);
        article.appendChild(h2);
        h2.appendChild(text);
        console.log(item);
        item.data.forEach((value) => {
            if (value.title != null) { //if has subsections
                let h3 = document.createElement("h3");
                text = document.createTextNode(value.title);
                h3.appendChild(text);
                article.appendChild(h3);
                var ul = document.createElement("ul");
                value.data.forEach((item) => {
                    let li = document.createElement("li");
                    li.innerHTML = item;
                    ul.appendChild(li);
                });
                article.appendChild(ul);
            } else { //if no subsections
                console.log("no subsections");
                let li = document.createElement("li");
                li.innerHTML = value;
                ulParent.appendChild(li);
            }
        });
        article.appendChild(ulParent);
        document.getElementById("comptarget").appendChild(article);
    });
    //then manipulate DOM and do other stuff
}).then(addToDOM);

function JSONget(url) {
    return new Promise(function (resolve, reject) {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let arr = JSON.parse(this.responseText);
                // resolves when recieves json, returns data
                console.log("data fetched, JSON loaded");
                console.log(arr);
                console.log("-------------------------");
                resolve(arr);
            }
        }
    });
}

function addToDOM() {
    //metiers
    bubbleSort(jobList);
    jobList.forEach((item) => {
        //add to exps and comps section
        let li = document.createElement("li");
        let str = "showBox('" + item.boxid + "');";
        li.setAttribute("onclick", str);
        let h1 = document.createElement("h1");
        let text = document.createTextNode(item.year);
        h1.appendChild(text);
        li.appendChild(h1);
        let p = document.createElement("p");
        text = document.createTextNode(item.name);
        p.appendChild(text);
        li.appendChild(p);
        document.getElementById("expstarget").appendChild(li);
        //==============================================================
        //make popups!!
        let popup = document.createElement("div");
        popup.setAttribute("class", "popup");
        popup.setAttribute("id", item.boxid);
        //make the x to close them
        let x = document.createElement("div");
        x.setAttribute("onclick", "closeBox();");
        text = document.createTextNode("X");
        x.appendChild(text);
        popup.appendChild(x);
        //titles
        let nom = document.createElement("h1");
        text = document.createTextNode(item.name);
        nom.appendChild(text);
        popup.appendChild(nom);
        let h2a = document.createElement("h2");
        text = document.createTextNode("Organisation de déliverance :");
        h2a.appendChild(text);
        popup.appendChild(h2a);
        let org = document.createElement("p");
        text = document.createTextNode(item.org);
        org.appendChild(text);
        popup.appendChild(org);
        let h2b = document.createElement("h2");
        text = document.createTextNode("Date de déliverance :");
        h2b.appendChild(text);
        popup.appendChild(h2b);
        let date = document.createElement("p");
        text = document.createTextNode(item.year);
        date.appendChild(text);
        popup.appendChild(date);
        let h2c = document.createElement("h2");
        text = document.createTextNode("Description :");
        h2c.appendChild(text);
        popup.appendChild(h2c);
        let desc = document.createElement("p");
        desc.innerHTML = item.desc;
        popup.appendChild(desc);
        document.getElementById("body").appendChild(popup);
    });
}

function bubbleSort(arr) {
    let length = arr.length;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < (length - i - 1); j++) {
            if (arr[j].position > arr[j + 1].position) {
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
    for (let i = 0; i < length; i++) {
        console.log("sorted array: " + arr[i].position);
    }
}