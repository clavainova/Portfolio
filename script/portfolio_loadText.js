import { Job } from "./job.js";

JSONget();
var jobList = []; //jobs
var prom;

try {
    prom = JSONget("http://localhost:1337/portfolios");
} catch (e) { //this is not working
    console.log("error with server, loaded backup JSON -- text may be out of date");
    prom = JSONget("assets/backup.json");
}

//get JSON then create objects 
prom.then((value) => {
    //description  -- direct
    let text = document.createTextNode(value[0].description);
    document.getElementById("description").appendChild(text);
    //links -- direct
    addLinks(value[0].hyperlinks);
    //jobs -- add to array
    value[0].jobs.forEach((item) => {
        let newJob = new Job(item.name, item.org, item.year, item.desc, item.boxid, item.position);
        jobList.push(newJob);
    });
    //competences  -- direct
    addCompetences(value[0].competences);
}).then(addJobs);//then add jobs (after added to array of objects)

function JSONget(url) {
    return new Promise((resolve, reject) => {
        let xml = new XMLHttpRequest();
        xml.open("GET", url, true);
        xml.send();
        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let arr = JSON.parse(this.responseText);
                // resolves when recieves json, returns data
                console.log("data fetched, JSON loaded");
                console.log(arr);
                console.log("-------------------------");
                resolve(arr);
            }
            // console.log("error with server, loaded backup JSON -- text may be out of date");
            // xml.onreject(){}
            // JSONget("assets/backup.json");
            // want to do recursion but it messes up the return value
        }
    });
}

function addJobs() {
    //metiers
    bubbleSort(jobList); //sort the dates into chronological order
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

function addLinks(arr) {
    //add image etc for each link
    arr.forEach((item) => {
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
}

function addCompetences(arr) {
    var ulParent = document.createElement("ul");
    arr.forEach((item) => {
        //make an article and header for ecah section
        var article = document.createElement("article");
        let h2 = document.createElement("h2");
        let text = document.createTextNode(item.title);
        article.appendChild(h2);
        h2.appendChild(text);
        //go onto subsections
        item.data.forEach((value) => {
            if (value.title != null) { //if has subsections
                //needs header, li for each subsection
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
                //only needs li, no header
                let li = document.createElement("li");
                li.innerHTML = value;
                ulParent.appendChild(li);
            }
        });
        article.appendChild(ulParent); //add the parent ul to the article
        //(for ones with no subsection)
        document.getElementById("comptarget").appendChild(article);
    });
}

function bubbleSort(arr) { //so the dates are chronological in the timeline
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
        // console.log("sorted array: " + arr[i].position);
    }
}