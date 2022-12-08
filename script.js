var searchBtn = document.querySelector(".searchBtn");
var indexSearchBtn = document.querySelector(".indexSearchBtn");
var userSearch = document.getElementById("user-search");
var formatEl = document.getElementById("format");
var q = userSearch.value.trim();
var resultCard = document.querySelector(".result-card");

var displaySearch = function(event) {
    event.preventDefault();
    var formatChoice = formatEl.value;
    if (!document.location.href.includes('search-results')) {
    document.location.replace('./search-results.html');
    }
    
    console.log(formatChoice);

    if (formatChoice === 'none') {
        getAllLocData(q.value);
    } else {
        getLocData(formatChoice, q.value);
    }
}

var getLocData = function(format, q) {
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
        var h3 = document.createElement("h3");
        var h4 = document.createElement("h4");
        var p = document.createElement("p");
        var a = document.createElement("a");

        card.classList = "card";
        cardBody.classList = "card-body";
        h3.classList = "card-title";
        h4.classList = "card-subtitle mb-2 text-muted";
        p.classList = "card-text";
        a.classList = "card-text";

        h3.textContent = items[i].title;
        h4.textContent = items[i].group;
        p.textContent = items[i].description;
        a.textContent = items[i].url;
        a.href = items[i].url;

        resultCard.appendChild(card);
        resultCard.appendChild(cardBody);
        resultCard.appendChild(h3);
        resultCard.appendChild(h4);
        resultCard.appendChild(p);
        resultCard.appendChild(a);

    }

}
searchBtn.addEventListener('click', displaySearch);
indexSearchBtn.addEventListener('click', displaySearch);