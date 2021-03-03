var background = localStorage.getItem("background");
setBackgroud(background);
setTime();
setInterval(setTime, 1000);

chrome.bookmarks.getTree((tree) => {
    var bookmarkBody = document.querySelector("#bookmark-body");

    setBookmarks(tree[0].children);

    function setBookmarks(list) {
        list.forEach(element => {
            console.log(element)
            var node = document.createElement("div")
            if ('children' in element) {
                node.classList.add("bookmark-folder");
                node.classList.add("bookmark");
                node.innerText = element.title;
                bookmarkBody.appendChild(node)

                node.addEventListener("click", (e) => {
                    bookmarkBody.innerHTML = '';
                    return setBookmarks(element.children);
                });
            } else {
                node.classList.add("bookmark-element");
                node.classList.add("bookmark");
                var faviconElement = document.createElement("img")
                faviconElement.classList.add("bookmark-img")
                faviconElement.src = "https://s2.googleusercontent.com/s2/favicons?domain_url=" + element.url;
                node.appendChild(faviconElement);
                var bookmarkElementTitle = document.createElement("p");
                bookmarkElementTitle.classList.add("bookmark-element-title");
                bookmarkElementTitle.innerText = element.title;
                node.appendChild(bookmarkElementTitle);
                bookmarkBody.appendChild(node);
            }
        });
    }

});

document.querySelector("#open-bookmark-bar").addEventListener("click", (e) => {
    document.getElementById("bookmark-bar").style.left = "0px";
    document.getElementById("open-bookmark-bar").style.display = "none";
});

document.querySelector('#close-bookmark-bar').addEventListener("click", (e) => {
    document.getElementById("bookmark-bar").style.left = "-400px";
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


