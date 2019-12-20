const dining = document.querySelector(".dining");


const COORDS_d ="coords";
const API_KEY2 ="DkNJOOhmH2uVH5ZVUuqJiafXQUNkjPHObzKf9hdiO2kRrtKroNiRG%2FKBdnYQALIAxgba7Ru7y2J6ids2o2VuJw%3D%3D";
const radius = 500;
function getDining(lat,lon){
    fetch(`http://apis.data.go.kr/B553077/api/open/sdsc/storeListInRadius?radius=${radius}&cx=${lon}&cy=${lat}&ServiceKey=${API_KEY2}`)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        const itemnum =json.item.bizesId;
        dining.innerText =`${itemnum}`
    }); 
}



function saveCoordes(coords_dObj){
    localStorage.setItem(COORDS_d,JSON.stringify(coords_dObj));


}


function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coords_dObj = {
        latitude ,
        longitude
    };
    saveCoordes(coords_dObj);
    getWeather(latitude,longitude);
}

function handleGeoError(position){
    console.log("cant access geo location")
}



function askForCoords_d(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError)
}


function loadCoords_d(){
    const loadedCoords_d = localStorage.getItem(COORDS_d);
    if (loadedCoords_d ===null){
        askForCoords_d();
    } else{
        const parseCoords_d = JSON.parse(loadedCoords_d);
        getDining(parseCoords_d.latitude,parseCoords_d.longitude);
    }
}


function init(){
    loadCoords_d();
}

init();
