//Definitions
var current_page = 1;
var records_per_page = 10;
var filteredAddresses = addressData;
var numPages = filteredAddresses.length / records_per_page;
var btn_next = document.getElementById("btn_next");
var btn_prev = document.getElementById("btn_prev");
var page_span = document.getElementById("page");



function prevPage() {
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage() {
    if (current_page < numPages) {
        current_page++;
        changePage(current_page);
    }
}




function renderTable() {
    $tbody.innerHTML = "";
    var first_record = (current_page - 1) * records_per_page;
    // for (var i = (current_page - 1) * records_per_page; i < (current_page * records_per_page) && (i < filteredAddresses.length); i++) {
    for (var i = 0; i < records_per_page; i++) {
        var address = filteredAddresses[first_record];
        var fields = Object.keys(address);
        // Create a new row in the tbody, set the index to be i + startingIndex
        var $row = $tbody.insertRow(i);
        for (var j = 0; j < fields.length; j++) {
            // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
            var field = fields[j];
            var $cell = $row.insertCell(j);
            $cell.innerText = address[field];
        }
        first_record++;
    }
}




function changePage(page) {
    // var btn_next = document.getElementById("btn_next");
    // var btn_prev = document.getElementById("btn_prev");
    // var page_span = document.getElementById("page");

    // Validate page
    current_page = page;
    if (page < 1) current_page = 1;
    if (page > numPages) current_page = numPages;

    numPages = Math.round(filteredAddresses.length / records_per_page)
    // show or hide Previous and Next buttons depending on whether on first or last page of results
    page_span.innerHTML = current_page + "/" + numPages;

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }

    renderTable();

}

window.onload = function() {
    changePage(1);
};


//Filters


// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $datetimeInput = document.querySelector("#datetime");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $citysearchBtn = document.querySelector("#citysearch");
var $statesearchBtn = document.querySelector("#statesearch");
var $countrysearchBtn = document.querySelector("#countrysearch");
var $shapesearchBtn = document.querySelector("#shapesearch");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);
$citysearchBtn.addEventListener("click", handleCityButtonClick);
$statesearchBtn.addEventListener("click", handleStateButtonClick);
$countrysearchBtn.addEventListener("click", handleCountryButtonClick);
$shapesearchBtn.addEventListener("click", handleShapeButtonClick);


// Set filteredAddresses to addressData initially
var filteredAddresses = addressData;

function handleSearchButtonClick() {
    // Format the user's search by removing leading and trailing whitespace, lowercase the string
    var filterDateTime = $datetimeInput.value.trim().toLowerCase();

    // Set filteredAddresses to an array of all addresses whose "DateTime" matches the filter
    filteredAddresses = filteredAddresses.filter(function(address) {
        var addressDateTime = address.datetime.toLowerCase();

        // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
        return addressDateTime === filterDateTime;
    });
    changePage(1);

}

function handleCityButtonClick() {
    // Format the user's search by removing leading and trailing whitespace, lowercase the string
    var filterCity = $cityInput.value.trim().toLowerCase();

    // Set filteredAddresses to an array of all addresses whose "DateTime" matches the filter
    filteredAddresses = filteredAddresses.filter(function(address) {
        var addressCity = address.city.toLowerCase();

        // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
        return addressCity === filterCity;
    });
    changePage(1);

}

function handleStateButtonClick() {
    // Format the user's search by removing leading and trailing whitespace, lowercase the string
    var filterState = $stateInput.value.trim().toLowerCase();

    // Set filteredAddresses to an array of all addresses whose "DateTime" matches the filter
    filteredAddresses = filteredAddresses.filter(function(address) {
        var addressState = address.state.toLowerCase();

        // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
        return addressState === filterState;
    });
    changePage(1);

}

function handleCountryButtonClick() {
    // Format the user's search by removing leading and trailing whitespace, lowercase the string
    var filterCountry = $countryInput.value.trim().toLowerCase();

    // Set filteredAddresses to an array of all addresses whose "DateTime" matches the filter
    filteredAddresses = filteredAddresses.filter(function(address) {
        var addressCountry = address.country.toLowerCase();

        // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
        return addressCountry === filterCountry;
    });
    changePage(1);

}

function handleShapeButtonClick() {
    // Format the user's search by removing leading and trailing whitespace, lowercase the string
    var filterShape = $shapeInput.value.trim().toLowerCase();

    // Set filteredAddresses to an array of all addresses whose "DateTime" matches the filter
    filteredAddresses = filteredAddresses.filter(function(address) {
        var addressShape = address.shape.toLowerCase();

        // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
        return addressShape === filterShape;
    });
    changePage(1);

}