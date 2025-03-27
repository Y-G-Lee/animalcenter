let xhr = new XMLHttpRequest();

xhr.open("GET", "./shop_data.xlsx");

xhr.responseType = "arraybuffer";

xhr.onload = () => {
    console.log(xhr.response);

    let uint = new Uint8Array(xhr.response);

    let excel = XLSX.read(uint, { type: "array" });

    let sheet = excel.Sheets[excel.SheetNames[0]];

    let json = XLSX.utils.sheet_to_json(sheet);

    console.log(json);

    for (let i = 0; i < json.length; i++) {
        
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(json[i]["Latitude"], json[i]["Longitude"]),
            title: json[i]["name"],
            image: markerImage
        });

        markerArray.push(marker);
    }
    console.log(markerArray);

    clusterer.addMarkers(markerArray);
}

xhr.send();

var mapContainer = document.getElementById('map');

let mapOption = {
    center: new kakao.maps.LatLng(36.326763, 127.407845), // 지도의 중심좌표
    level: 4 // 지도의 확대 레벨
};

var map = new kakao.maps.Map(mapContainer, mapOption);

var mapTypeControl = new kakao.maps.MapTypeControl();

map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

var clusterer = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
    minLevel: 6 // 클러스터 할 최소 지도 레벨 
});

var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

var imageSize = new kakao.maps.Size(36, 36);

var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

let markerArray = [];