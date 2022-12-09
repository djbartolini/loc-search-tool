var searchBtn = document.querySelector(".searchBtn");
var userSearch = document.getElementById("user-search");
var formatEl = document.querySelector(".form-select");
var resultCard = document.querySelector(".result-card");
var goBackBtn = document.getElementById("goBack");

var displaySearch = function(q, format) {
    if (format === 'none') {
        getAllLocData(q);
    } else {
        getChosenLocData(format, q);
    }
    console.log(format);
}

var handleSearch = function(event) {
    event.preventDefault();
    var formatChoice = formatEl.value;
    var q = userSearch.value.trim();
    if (!document.location.href.includes('search-results')) {
        var queryParams = "?q=" + q + "&format=" + (formatChoice || "");
        
        return document.location.assign('./search-results.html' + queryParams);
        
    }   
    displaySearch(q, formatChoice);
   
}



var getChosenLocData = function(format, q) {
    var formatUrl = 'https://www.loc.gov/' + format + '/?q=' + q + '&fo=json';
    fetch(formatUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayResults(data.results, q);
                console.log(data.results);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to GitHub');
    });
}

var getAllLocData = function(q) {
    var noformatUrl = 'https://www.loc.gov/search/?q=' + q + '&fo=json';
    fetch(noformatUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayResults(data.results, q);
                console.log(data.results);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to LOC');
    });
}

var displayResults = function(items) {
    for (var i = 0; i < items.length; i++) {
        var title = items[i].title;
        var url = items[i].url;
        var subject = items[i].subject;
        var group = items[i].group;
        console.log(group);
        console.log(title);
        console.log(url);
        console.log(subject);

        var card = document.createElement("div");
        var cardBody = document.createElement("div");
        var h5 = document.createElement("h5");
        var h6 = document.createElement("h6");
        var p = document.createElement("p");
        var a = document.createElement("a");

        card.classList = "card";
        cardBody.classList = "card-body";
        h5.classList = "card-title";
        h6.classList = "card-subtitle mb-2 text-muted";
        p.classList = "card-text";
        a.classList = "card-text";

        h5.textContent = items[i].title;
        h6.textContent = items[i].group;
        p.textContent = items[i].description;
        a.textContent = items[i].url;
        a.href = items[i].url;

        resultCard.appendChild(card);
        card.appendChild(cardBody);
        cardBody.appendChild(h5);
        cardBody.appendChild(h6);
        cardBody.appendChild(p);
        cardBody.appendChild(a);
    }
}

var goBack = function(event) {
    event.preventDefault();
    document.location.assign('./index.html');
}

searchBtn.addEventListener('click', handleSearch);
goBackBtn.addEventListener('click', goBack);

if (location.search) {
    var params = new URLSearchParams(location.search);

    displaySearch(params.get("q"), params.get("format"));
}