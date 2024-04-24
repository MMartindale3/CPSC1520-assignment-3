async function appInit() {
    const response = await fetch("https://661897109a41b1b3dfbd735b.mockapi.io/albums");
    const fetchData = await response.json();
}
appInit();

const favouritesTabSelect = document.querySelector("#favorites-button");
const searchTabSelect = document.querySelector("#search-button");
const favouritesTab = document.querySelector("#favorites-tab");
const searchTab = document.querySelector("#search-tab");

favouritesTabSelect.addEventListener("click", onSwitchToFavourites);
function onSwitchToFavourites(e) {
    e.preventDefault();
    searchTabSelect.classList.remove("active");
    favouritesTabSelect.classList.add("active");
    favouritesTab.classList.remove("d-none");
    searchTab.classList.add("d-none");
    // TODO: RenderFavourites();
    console.log("switched to favourites");
}

searchTabSelect.addEventListener("click", onSwitchToSearch);
function onSwitchToSearch(e) {
    e.preventDefault();
    searchTabSelect.classList.add("active");
    favouritesTabSelect.classList.remove("active");
    favouritesTab.classList.add("d-none");
    searchTab.classList.remove("d-none");
    console.log("switched to search");
}

const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", onSearchButton);
function onSearchButton(e) {
    e.preventDefault();
    // TODO: search querying, RenderSearchResults();
}
const addFavouritesButton = document.querySelector("#add-favourites-button");
addFavouritesButton.addEventListener("click", onAddFavourite);
function onAddFavourite(e) {
    e.preventDefault();
    // TODO: add to favourites functionality
}
const removeFavouritesButton = document.querySelector("#remove-favourites-button");
removeFavouritesButton.addEventListener("click", onRemoveFavourite);
function onRemoveFavourite(e) {
    e.preventDefault();
    // TODO: remove from favourites functionality
}

function RenderSearchResults() {
    const template = `<!-- <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
    <div class="fw-bold">
   OK Computer
    <span class="badge bg-primary rounded-pill">4.23</span>
    </div>
    <span> Radiohead </span>
    </div>
    <button type="button" id="add-favourites-button" class="btn btn-success">Add To Favourites</button>
</li> -->`
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