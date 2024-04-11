const body = document.querySelector("body");
const userInput = document.querySelector(".userInput");
const submitButton = document.getElementById("submitButton");
const tableBody = document.querySelector("#tableBody");

function fetchDataFromAPI(){
    const baseURL = "https://www.omdbapi.com/";
    const key = "8127fd11";
    let searchValue = userInput.value;

    if(searchValue === ""){
        alert("Please enter a movie name that you want to search for!");
    }else{
        searchValue = searchValue.replaceAll(" ","%20");
        let url = `${baseURL}?apikey=${key}&s=${searchValue}`;
        console.log(url);
        fetch(url).then(response => response.json()).then(json => displayMovies(json))
    }
}

function displayMovies(json){
    console.log(json);

    const moviesArray = json.Search;
    for (let i = 0; i < moviesArray.length; i++) {
        const tableRow = document.createElement("tr");
        const imdbIdTd = document.createElement("td");
        const titleTd = document.createElement("td");
        const yearTd = document.createElement("td");
        const posterTd = document.createElement("td");

        imdbIdTd.textContent = moviesArray[i].imdbID;
        titleTd.textContent = moviesArray[i].Title;
        yearTd.textContent = moviesArray[i].Year;

        const image = document.createElement("img");
        image.setAttribute("src",moviesArray[i].Poster);
        posterTd.appendChild(image);
        
        tableRow.appendChild(imdbIdTd);
        tableRow.appendChild(titleTd);
        tableRow.appendChild(yearTd);
        tableRow.appendChild(posterTd);

        tableBody.appendChild(tableRow);
    }
}
submitButton.addEventListener("click",fetchDataFromAPI);