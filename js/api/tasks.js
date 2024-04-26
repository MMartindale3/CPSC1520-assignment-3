export async function getAlbum(url) {
    const response = await fetch(url);
    return await response.json();
}

export async function postAlbum(album) {
    const requestHeader = new Headers()
    requestHeader.append("content-type", "application/json")

    const payload = JSON.stringify(album);
    const requestObject = {
        method: "POST",
        headers: requestHeader,
        body: payload,
        redirect: "follow",
    }

    const response = await fetch("https://661897109a41b1b3dfbd735b.mockapi.io/api/v1/favourites", requestObject);
    return await response.json();
}