console.log("Hello World!\n==========\n");

// Exercise 1 Section
console.log("EXERCISE 1:\n==========\n");

const apiKey = "uX6xKR7FNjOPuvsJ6dShPV1o3crQBbP7";
const giphyURL = "http://api.giphy.com/v1/gifs/translate";
const button = document.querySelector(".submit");
const img = document.querySelector("#imageContainer > img");

button.onclick = () => {
    const search = document.querySelector("#input").value;
    fetch(`${giphyURL}?api_key=${apiKey}&s=${search}`, {
        mode: "cors"
    })
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            img.src = data.data.images.original.url;
        })
        .catch((err) => {
            throw new Error("Something went wrong");
        })
}
