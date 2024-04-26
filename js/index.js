import {nanoid} from 'nanoid'
import { getAlbum, postAlbum } from "./api/tasks";
const masterSearchCopy = document.querySelector("#search-results").cloneNode(true);
const masterFavouritesCopy = document.querySelector("#favorites").cloneNode(true);

let favouriteStore = [];

async function appInit() {
    const fetchData = await getAlbum("https://661897109a41b1b3dfbd735b.mockapi.io/api/v1/albums");
    favouriteStore = await getAlbum("https://661897109a41b1b3dfbd735b.mockapi.io/api/v1/favourites")
    renderAlbums(fetchData);
    return favouriteStore;
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

const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", onSearchButton);
function onSearchButton(e) {
    e.preventDefault();
    // TODO: search querying, RenderSearchResults(); GET??
}

async function onAddFavourite(e) {
    e.preventDefault();

	const album = document.querySelector("album");
    if (album.length) {
        const uid = nanoid().substring(0,8);
        const newTask = await postAlbum(album, uid);
        favouriteStore.push(newTask);
    }
}


function onRemoveFavourite(e) {
    e.preventDefault();

}

function renderAlbums(albums) {
    const container = masterSearchCopy.cloneNode(true);
    const container2 = masterFavouritesCopy.cloneNode(true);
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
        <button data-uid="${id}" type="button" id="add-favourites-button" class="btn btn-success">Add To Favourites</button>
        </li>
        `
        const elem = document.createRange().createContextualFragment(template).children[0];

        elem.querySelector("button").addEventListener("click", onAddFavourite);
        container.append(elem);
    })
    document.querySelector("#search-results").replaceWith(container);
}


function renderFavourites(albums) {
    const container2 = masterFavouritesCopy.cloneNode(true);
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
        container2.append(elem);
    })
    document.querySelector("favorites");
}