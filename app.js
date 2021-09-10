"use strict";

const _apiKey = "uX6xKR7FNjOPuvsJ6dShPV1o3crQBbP7";
const giphyURL = "https://api.giphy.com/v1/gifs/translate";
const button = document.querySelector(".submit");
const next = document.querySelector(".next");
const previous = document.querySelector(".previous");
const img = document.querySelector(".gif");
const imgURL = document.querySelector(".imgURL");
const search = document.querySelector("#input");
const imgContainer = document.querySelector(".imageContainer");
const gifGen = document.querySelector(".gifGen");
const viewHistory = [];
let viewPosition = 0;


//pulls popular searches from giphy api and adds them as search placeholder
window.onload = searchSuggestion();

//event listener for pressing enter to submit input
search.addEventListener("keyup", (key) => {
    if (key.key === "Enter"){
        button.click();
    }
})

//event listener for navigating forward and back through gifs
window.addEventListener("keyup", (key) => {
    if (key.key === "ArrowLeft") {
        previous.click();
    } else if (key.key === "ArrowRight") {
        next.onclick();
    }
})

//checks for user input - then searches giphy database using input
button.onclick = () => {
    if(!search.value) {
        //TODO: Insert error for no text
    } else {
        newSearch();
    }
    
}

//cycles to next random gif under same search param
next.onclick = () => {
    if (viewPosition == viewHistory.length - 1) {
        if(!search.value) {
            //TODO: Insert error for no text
        } else {
            newSearch();
        }
    } else {
        nextItem();
    }
}

//
previous.onclick = () => {
    if (viewPosition == 0) {
        //TODO: Insert error for no more items in previous history
    } else {
        previousItem();
    }
}


// -- FUNCTIONS --

//performs fetch of gif from giphy based on search param, then stores gif data in array for future reference without additional api calls
function newSearch() {
    fetch(`${giphyURL}?api_key=${_apiKey}&s=${search.value}`, {
        mode: "cors"
    })
    .then((data) => {
        return data.json();
    })
    .then((result) => {
            viewPosition = viewHistory.length;
            next.hidden = false;
            previous.hidden = false;
            imgContainer.hidden = false;
            gifGen.classList = "reveal-gifGen";
            img.src = result.data.images.original.url;
            imgURL.href = result.data.url;
            imgURL.hidden = false;
            viewHistory.push({
                image: result.data.images.original.url,
                imageLink: result.data.url
            });
        })
        .catch((err) => {
            throw new Error(err);
        })
}

function nextItem() {
    viewPosition ++;
    const nextItem = viewHistory[viewPosition];
    img.src = nextItem.image;
    imgURL.href = result.data.url;
}

function previousItem() {
    viewPosition --;
    const previousItem = viewHistory[viewPosition];
    img.src = previousItem.image;
    imgURL.href = result.data.url;
}

//api call to generate search suggestion based on most searched items from giphy
function searchSuggestion () {
    fetch((`https://api.giphy.com/v1/trending/searches?api_key=${_apiKey}`), {
        mode: "cors"
    })
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            search.placeholder = `${data.data[Math.floor(Math.random()*data.data.length)]}...`;
        })
}