let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function creatAndAppend(obj) {
    let {
        description,
        link,
        title
    } = obj;
    //console.log(description,link,title);
    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.textContent = title;
    titleEl.style.display = "block";
    titleEl.classList.add("result-title");
    titleEl.target = "_blank";
    searchResults.appendChild(titleEl);

    let linkEl = document.createElement("a");
    linkEl.textContent = link;
    linkEl.href = link;
    linkEl.style.display = "block";
    titleEl.target = "_blank";
    linkEl.classList.add("link-description");
    searchResults.appendChild(linkEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    searchResults.appendChild(descriptionEl);
}

function create(searchResults) {
    for (let obj of searchResults) {
        spinner.classList.add("d-none");
        creatAndAppend(obj);
    }
}

function searchReceived(event) {
    if (event.key === "Enter") {
        spinner.classList.remove("d-none");
	searchResults.innerHTML = "";
        let userInput = searchInput.value;
        let options = {
            method: "GET"
        };
        fetch("https://apis.ccbp.in/wiki-search?search=" + userInput, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonObj) {
                let {
                    search_results
                } = jsonObj;
                create(search_results);
            });
    }
}

searchInput.addEventListener("keydown", searchReceived);