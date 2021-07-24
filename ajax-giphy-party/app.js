const form = document.getElementById("giphy");
const giphyCont = document.querySelector(".giphy-container");
const removeButton = document.getElementById("remove");

async function getGiphyUrl(query) {
    const res = await axios.get(
        `https://api.giphy.com/v1/gifs/search?q=${query}s&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`
    );
    const data = res.data.data;
    const numResults = data.length;
    if (numResults) {
        const randomIdx = Math.floor(Math.random() * numResults);
        const url = data[randomIdx].images.original.url;
        createGiphy(url);
    }
}

form.addEventListener("submit", handleSendQuery);

function handleSendQuery(event) {
    event.preventDefault();
    const query = event.target.children[0];
    getGiphyUrl(query.value);
    query.value = "";
}

function createGiphy(url) {
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("giphy");
    const img = document.createElement("img");
    img.src = url;
    imgDiv.append(img);
    giphyCont.append(imgDiv);
}

removeButton.addEventListener("click", removeAllImages);

function removeAllImages(e) {
    giphyCont.innerHTML = "";
}
