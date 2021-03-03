var background = localStorage.getItem("background");
setBackgroud(background);
setTime();
setInterval(setTime, 1000);

chrome.bookmarks.getTree((tree) => {
    console.log(tree[0].children)
    // tree[0].children[0].children.forEach(bookmark => {
    //     var bookmarkElement = document.createElement("div")
    //     bookmarkElement.id = "bookmark"
    //     bookmarkElement.innerText = bookmark.title
    //     console.log(bookmarkElement)
    //     document.querySelector("#bookmarks").appendChild(bookmarkElement)

    tree[0].children.forEach(folder => {
        var folderElement = document.createElement("div")
        folderElement.classList.add("bookmark-folder");
        folderElement.innerText = folder.title;
        document.querySelector("#bookmark-bar").appendChild(folderElement)
    });

});

document.querySelector("#open-bookmark-bar").addEventListener("click", (e) => {
    document.getElementById("bookmark-bar").style.width = "300px";
    document.getElementById("open-bookmark-bar").style.display = "none";
});

document.querySelector('#close-bookmark-bar').addEventListener("click", (e) => {
    document.getElementById("bookmark-bar").style.width = "0px";
    document.getElementById("open-bookmark-bar").style.display = "flex";
});

async function setBackgroud(background) {
    if (background == null) {
        var bg = {};
        var Http = new XMLHttpRequest();
        Http.open("GET", "https://source.unsplash.com/random/1920x1080?river,city,mountain,nature", true);
        Http.send()
        Http.onload = () => {
            bg = {
                date: new Date().getDate(),
                url: Http.responseURL
            }
            document.body.style.backgroundImage = `url('${bg.url}')`;
            localStorage.setItem('background', JSON.stringify(bg));
        }
    } else {
        var bg = JSON.parse(background);
        if (bg.date != new Date().getDate()) {
            return setBackgroud(null);
        }
        document.body.style.backgroundImage = `url('${bg.url}')`;
    }
}

function setTime() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    if (m < 10) {
        m = '0' + m;
    }

    var time = h + ":" + m;
    document.getElementById('time').innerText = time;
}


