import { getAlbum, postAlbum } from "./api/tasks";
// const masterCopy = document.querySelector("#search-results").cloneNode(true);

async function appInit() {
    const fetchData = await getAlbum("https://661897109a41b1b3dfbd735b.mockapi.io/api/v1/albums");
    return fetchData;
}
appInit();

const favouritesTabButton = document.querySelector("#favorites-button");
const searchTabButton = document.querySelector("#search-button");
const favouritesTab = document.querySelector("#favorites-tab");
const searchTab = document.querySelector("#search-tab");

favouritesTabButton.addEventListener("click", onSwitchToFavourites);
function onSwitchToFavourites(e) {
    e.preventDefault();
    searchTabButton.classList.remove("active");
    favouritesTabButton.classList.add("active");
    favouritesTab.classList.remove("d-none");
    searchTab.classList.add("d-none");
    getAlbum("https:661897109a41b1b3dfbd735b.mockapi.io/api/v1/favourites");
    console.log("switched to favourites");
}

searchTabButton.addEventListener("click", onSwitchToSearch);
function onSwitchToSearch(e) {
    e.preventDefault();
    searchTabButton.classList.add("active");
    favouritesTabButton.classList.remove("active");
    favouritesTab.classList.add("d-none");
    searchTab.classList.remove("d-none");
    console.log("switched to search");
}

const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", onSearchButton);
function onSearchButton(e) {
    e.preventDefault();
    // TODO: search querying, RenderSearchResults(); GET??
}
const addFavouritesButton = document.querySelector("#add-favourites-button");
addFavouritesButton.addEventListener("click", onAddFavourite);
function onAddFavourite(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const newFavourite = formData.get("album");
    const payload = {
        uid: "i",
        album,
        type: "type",
    }
    postAlbum(payload);
    appInit();
}
const removeFavouritesButton = document.querySelector("#remove-favourites-button");
removeFavouritesButton.addEventListener("click", onRemoveFavourite);
function onRemoveFavourite(e) {
    e.preventDefault();
    // TODO: remove from favourites functionality DELETE
}

function renderAlbums(albums) {
    const container = masterCopy.cloneNode(true)
    albums.forEach(({albumName, artistName, uid}) => {
        const template = `
        <li name="album" data-uid="${uid}" class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
        <div class="fw-bold">
        ${albumName}
        <span class="badge bg-primary rounded-pill">4.23</span>
        </div>
        <span>${artistName}</span>
        </div>
        <button type="button" id="add-favourites-button" class="btn btn-success">Add To Favourites</button>
    </li>
    `
        container.insertAdjacentHTML('afterbegin', template)
    })
    document.querySelector("#search-results").replaceWith(container)
}


function RenderFavourites() {
    const template = `<!-- <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
    <div class="fw-bold">
   OK Computer
    <span class="badge bg-primary rounded-pill">4.23</span>
    </div>
    <span> Radiohead </span>
    </div>
    <button type="button" id="remove-favourites-button" class="btn btn-success">Remove From Favourites</button>
</li> -->`
}