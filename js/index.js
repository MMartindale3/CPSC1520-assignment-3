async function appInit() {
    const response = await fetch("https://661897109a41b1b3dfbd735b.mockapi.io/albums");
    const fetchData = await response.json();
    console.log(fetchData);    
}

appInit();