var searchBtn = document.querySelector(".searchBtn");
var userSearch = document.getElementById("user-search");
var formatEl = document.getElementById("format");


var displaySearch = function(event) {
    event.preventDefault();
    var searchTerm = userSearch.value.trim();
    var formatChoice = formatEl.value;
    if (!document.location.href.includes('search-results')) {
    document.location.replace('./search-results.html');
    }
    
    console.log(formatChoice);

    if (formatChoice === 'none') {
        getAllLocData();
    } else {
        getLocData();
    }
}



var getLocData = function(format, q) {
    var formatUrl = 'https://www.loc.gov/' + format + '/?q=' + q + '&fo=json';
    fetch(formatUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayRepos(data, user);
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
                displaySearch(data, q);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to LOC');
    });
}

searchBtn.addEventListener('click', displaySearch);