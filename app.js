"use strict";

const _apiKey = "uX6xKR7FNjOPuvsJ6dShPV1o3crQBbP7";
const giphyURL = "https://api.giphy.com/v1/gifs/translate";
const button = document.querySelector(".submit");
const img = document.querySelector(".gif > img");
const imgURL = document.querySelector(".imgURL");
const search = document.querySelector("#input");
const imgContainer = document.querySelector(".imageContainer");


//pulls popular searches from giphy api and adds them as search placeholder
window.onload = searchSuggestion();


//checks for user input - then searches giphy database using input
button.onclick = () => {
    if(!search.value) {

    } else {
        imgContainer.hidden = false;
        fetch(`${giphyURL}?api_key=${_apiKey}&s=${search.value}`, {
            mode: "cors"
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                img.src = data.data.images.original.url;
                imgURL.innerHTML = `<a href="${data.data.url}" target="_blank">View on Giphy!</a>`;
            })
            .catch((err) => {
                throw new Error("Something went wrong");
            })
    }
    
}


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