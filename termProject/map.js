class Item {
    constructor(name, category, explain, img, addr) {
        this.name = name;
        this.category = category;
        this.explain = explain;
        this.img = img;
        this.addr = addr;
    }
}
var items = new Array();
items[0] = new Item('THE BUEOK', '술집', '다이닝 펍', 'thebueok.jpg', '경기도 수원시 영통구 대학1 장안로8번길 41');
items[1] = new Item('포차천국', '술집', '맥주/호프', 'heaven.png', '경기도 수원시 영통구 대학1로 64번길 37');
items[2] = new Item('카타르시스', '술집', '수육튀김', 'katarsis.jpg', '경기도 수원시 영통구 대학1로 16');
items[3] = new Item('역전할머니맥주', '술집', '맥주/호프', 'reverse.jpg', '경기도 수원시 영통구 대학, 1로54번길 17');
items[4] = new Item('BEER WORKS', '술집', '수제맥주', 'beerworks.jpg', '경기도 수원시 영통구 이의동 1275-9번지 KR 1층 103호');
items[5] = new Item('우마이', '술집', '차슈,연어', 'umai.png', '장안구 연무동 212-38번지 1층 수원시 경기도 KR');
items[6] = new Item('종로명가 마약곱창', '술집', '곱창/치즈막창', 'intestine.jpg', '경기도 수원시 영통구 원천동 광교로');
items[7] = new Item('경기대 닭발', '술집', '닭발', 'chickenfeet.jpg', '경기도 수원시 영통구 대학로 20');
items[8] = new Item('오라카이', '술집', '술집', 'orakai.png', '경기 수원시 영통구 대학1로8번길 54-1');

/* MAP */
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.3007698877294, 127.0389889012949), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };
var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
/* -------------------------------------------------------------------------------------------*/
// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);
var geocoder = new kakao.maps.services.Geocoder();  // 주소-좌표 변환 객체를 생성합니다

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

/* -------------------------------------------------------------------------------------------*/
function clickList(i) {
    var s = document.getElementById("review_name");
    s.innerHTML = items[i].name;
}
function reviewSubmit() {
    var title = document.getElementById("review_name").textContent;
    var content = document.getElementById("reviewInput").value;
    if (title != "가게를 선택해주세요") {
        var str = "<div class='swiper-slide'><div><p>" + title + "</p><p>" + content + "</p></div></div>"
        $(str).appendTo('.swiper-wrapper');
        document.getElementById("reviewInput").value = "";
        document.getElementById("review_name").innerHTML = "가게를 선택해주세요";
    } else {
        alert("가게를 선택해주세요!");
    }
}
var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

for (var i = 0; i < 9; i++) {
    geocoder.addressSearch(items[i].addr, function (result, status) {
        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {
            var imageSize = new kakao.maps.Size(24, 35);
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            console.log(coords);
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: coords, // 마커를 표시할 위치
                image: markerImage, // 마커 이미지 
            });
        }
    });
    var str = '<div class="item" onclick="clickList(' + i + ')"><img src="Image/'
        + items[i].img + '""><div class="text"><p class="item_title">'
        + items[i].name + "</p><span>"
        + items[i].explain + "</span></div></div>";
    $(str).appendTo('.item_list');
}