import { nanoid } from 'nanoid'
import { getAlbum, postAlbum } from "./api/tasks";
const masterSearchCopy = document.querySelector("#search-results").cloneNode(true);
const masterFavouritesCopy = document.querySelector("#favorites").cloneNode(true);

let albumStore = [];
let favouriteStore = [];

async function appInit() {
    albumStore = await getAlbum("https://661897109a41b1b3dfbd735b.mockapi.io/api/v1/albums");
    favouriteStore = await getAlbum("https://661897109a41b1b3dfbd735b.mockapi.io/api/v1/favourites")
    return albumStore, favouriteStore;
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
    renderFavourites(favouriteStore);
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

document.querySelector("#search-form").addEventListener("submit", onAlbumFilterRequest);
function onAlbumFilterRequest(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget); // uses the name attribute for name value pairs
    const searchQuery = formData.get("query").trim().toLowerCase(); // sanitize the search
    const albums = searchNameAlbumArtist(searchQuery);
    renderAlbums(albums);
}

function searchNameAlbumArtist(searchQuery) {
    const query = searchQuery;
    const searchResults = albumStore.filter((album) => {
        if (album.albumName.toLowerCase().includes(query)) {
            return album
        }
        if (album.artistName.toLowerCase().includes(query)) {
            return album
        }
    });
    document.querySelector("#search-results").replaceChildren();
    return searchResults;
}

document.querySelector("#add-favourites").addEventListener("click", onAddFavourite)
async function onAddFavourite(e) {
    e.preventDefault();

    const album = document.querySelector("album");
    if (album.length) {
        const uid = nanoid().substring(0, 8);
        const newTask = await postAlbum(album, uid);
        favouriteStore.push(newTask);
    }
}

function onRemoveFavourite(e) {
    e.preventDefault();
}

function renderAlbums(albums) {
    albums.forEach(({ id, albumName, averageRating, artistName }) => {
        const template = `
            <li name="album" id="album" data-uid="${id}" class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">
                        ${albumName}
                        <span class="badge bg-primary rounded-pill">${averageRating}</span>
                    </div>
                <span>${artistName}</span>
                </div>
            <button data-uid="${id}" type="button" id="add-favourites" class="btn btn-success">Add To Favourites</button>
            </li>
        `
        document.querySelector("#search-results").insertAdjacentHTML("beforeend", template);        
    });
}

function renderFavourites(albums) {
    const container = masterFavouritesCopy.cloneNode(true);
    albums.forEach(({ id, albumName, averageRating, artistName }) => {
        const template = `
        <li name="album" id="album" data-uid="${id}" class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
        <div class="fw-bold">
        ${albumName}
        <span class="badge bg-primary rounded-pill">${averageRating}</span>
        </div>
        <span>${artistName}</span>
        </div>
        <button data-uid="${id}" type="button" id="add-favourites-button" class="btn btn-success">Remove From Favourites</button>
        </li>
        `
        const elem = document.createRange().createContextualFragment(template).children[0];

        elem.querySelector("button").addEventListener("click", onRemoveFavourite);
        container.remove(elem);
    })
    document.querySelector("favorites");
}