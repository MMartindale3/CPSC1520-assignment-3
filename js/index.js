async function appInit() {
    const response = await fetch("https://661897109a41b1b3dfbd735b.mockapi.io/albums");
    const fetchData = await response.json();   
}
appInit();

const toFavouritesButton = document.querySelector("#favorites-button");
const toSearchButton = document.querySelector("#search-button");
const favouritesTab = document.querySelector("#favorites-tab");
const searchTab = document.querySelector("#search-tab");



toFavouritesButton.addEventListener("click", onSwitchToFavourites);
function onSwitchToFavourites(e) {
    e.preventDefault();
    toSearchButton.classList.remove("active");
    toFavouritesButton.classList.add("active");
    favouritesTab.classList.remove("d-none");
    searchTab.classList.add("d-none");
    console.log("switched to favourites");    
}

toSearchButton.addEventListener("click", onSwitchToSearch);
function onSwitchToSearch(e) {
    e.preventDefault();
    toSearchButton.classList.add("active");
    toFavouritesButton.classList.remove("active");
    favouritesTab.classList.add("d-none");
    searchTab.classList.remove("d-none");
    console.log("switched to search");
}
