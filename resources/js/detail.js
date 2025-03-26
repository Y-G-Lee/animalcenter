let params = new URLSearchParams(location.search);
let regId = params.get("regId");

console.log(regId);

var xhr = new XMLHttpRequest();
var url = 'http://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList'; /*URL*/
var queryParams = '?serviceKey=t1q4uVl99uUv%2FIc7a3gDPKQo7l96iCv8seIC%2FwiO%2F6JqJtPvp8gJKNouyrMkqYPGoVxZGjsBOU5LP78ZLe9rAQ%3D%3D'; /*Service Key*/
queryParams += '&regId=' + regId;


xhr.open('GET', url + queryParams);
xhr.onload = function () {
    console.log(xhr.response);

    let x2js = new X2JS();
    let json = x2js.xml_str2json(xhr.response);
    console.log(json);

    let items = json["ServiceResult"]["MsgBody"]["items"];

    console.log(items);

    // document.getElementById("filePath").src = "http://www.daejeon.go.kritems"+ items["filePath"];
    // document.getElementById("regId").innerHTML = items["regId"];
    // document.getElementById("gu").innerHTML = gu(items["gu"]);
    // document.getElementById("classification").innerHTML = classification(items["classification"]);
    // document.getElementById("gender").innerHTML = (items["gender"] == 1) ? ("암컷") : ("수컷");
    // document.getElementById("foundPlace").innerHTML = items["foundPlace"];
    // document.getElementById("rescueDate").innerHTML = items["rescueDate"];
    // document.getElementById("age").innerHTML = items["age"];
    // document.getElementById("weight").innerHTML = items["weight"];

    let str = `<div class="detail-img-box">
                        <img class="detail-img" id="filePath" src="http://www.daejeon.go.kr/${items["filePath"]}"
                            alt="">
                    </div>
                    <div class="detail-box">
                        <div class="detail-box-top">
                            <div class="title">
                                <p class="title-text"> 관리번호 </p>
                            </div>
                            <div class="title-detail">
                                <p class="title-detail-text" id="regId"> ${items["regId"]}</p>
                            </div>
                            <div class="title">
                                <p class="title-text"> 공고번호 </p>
                            </div>
                            <div class="title-detail">
                                <p class="title-detail-text"> ${extractYear(items["rescueDate"])}-00${extractRegIdPart(items["regId"])} </p>
                            </div>
                        </div>
                        <div class="detail-box-top">
                            <div class="title">
                                <p class="title-text"> 입양상태 </p>
                            </div>
                            <div class="title-detail">
                                <p class="title-detail-text"> ${stateCd2Str(items["adoptionStatusCd"])} </p>
                            </div>
                        </div>
                        <div class="detail-box-top">
                            <div class="title">
                                <p class="title-text"> 지역분류 </p>
                            </div>
                            <div class="title-detail">
                                <p class="title-detail-text" id="gu"> ${gu(items["gu"])} </p>
                            </div>
                        </div>
                        <div class="detail-box-top">
                            <div class="title">
                                <p class="title-text"> 종류 </p>
                            </div>
                            <div class="title-detail">
                                <p class="title-detail-text"> ${items["classification"]} </p>
                            </div>
                        </div>
                        <div class="detail-box-top">
                            <div class="title">
                                <p class="title-text"> 품종 </p>
                            </div>
                            <div class="title-detail">
                                <p class="title-detail-text" id="classification"> ${items["species"]} </p>
                            </div>
                        </div>
                        <div class="detail-box-top">
                            <div class="title">
                                <p class="title-text"> 성별 </p>
                            </div>
                            <div class="title-detail">
                                <p class="title-detail-text" id="gender"> ${(items["gender"] == 1) ? ("암컷") : ("수컷")} </p>
                            </div>
                        </div>
                        <div class="detail-box-top">
                            <div class="title">
                                <p class="title-text"> 발견장소 </p>
                            </div>
                            <div class="title-detail">
                                <p class="title-detail-text" id="foundPlace"> ${items["foundPlace"]} </p>
                            </div>
                        </div>
                        <div class="detail-box-top">
                            <div class="title">
                                <p class="title-text"> 구조일 </p>
                            </div>
                            <div class="title-detail">
                                <p class="title-detail-text" id="rescueDate"> ${items["rescueDate"]} </p>
                            </div>
                        </div>
                        <div class="detail-box-top">
                            <div class="title">
                                <p class="title-text"> 입소일 </p>
                            </div>
                            <div class="title-detail">
                                <p class="title-detail-text"> ${items["rescueDate"]} </p>
                            </div>
                        </div>
                        <div class="detail-box-top">
                            <div class="title">
                                <p class="title-text"> 공고기간 </p>
                            </div>
                            <div class="title-detail">
                                <p class="title-detail-text"></p>
                            </div>
                        </div>
                        <div class="detail-box-top">
                            <div class="title">
                                <p class="title-text"> 입양신청 시작 일시 </p>
                            </div>
                            <div class="title-detail">
                                <p class="title-detail-text"></p>
                            </div>
                        </div>
                        <div class="detail-box-top">
                            <div class="title">
                                <p class="title-text"> 입소 당시 나이 </p>
                            </div>
                            <div class="title-detail">
                                <p class="title-detail-text" id="age"> ${items["age"]} </p>
                            </div>
                        </div>
                        <div class="detail-box-top">
                            <div class="title">
                                <p class="title-text"> 몸무게 </p>
                            </div>
                            <div class="title-detail">
                                <p class="title-detail-text" id="weight"> ${items["weight"]} </p>
                            </div>
                        </div>
                        <div class="detail-box-top">
                            <div class="title">
                                <p class="title-text"> 모색 </p>
                            </div>
                            <div class="title-detail">
                                <p class="title-detail-text"> ${items["hairColor"]} </p>
                            </div>
                        </div>
                        <div class="detail-box-top">
                            <div class="title">
                                <p class="title-text"> 기타정보 </p>
                            </div>
                            <div class="title-detail">
                                <p class="title-detail-text"> ${items["memo"]} </p>
                            </div>
                        </div>`;
    document.querySelector(".detail").innerHTML += str;

};
document.getElementById("inventoryBtn").addEventListener("click", () => {
    location.href = "./protect.html";
});

xhr.send();

// 입양상태 코드에 따른 문자열값 리턴
function stateCd2Str(cd) {
    if (cd == 1) {
        return "공고중";
    } else if (cd == 2) {
        return "입양가능";
    } else if (cd == 3) {
        return "입양예정";
    } else if (cd == 4) {
        return "입양완료";
    } else {
        return "주인반환";
    }
}

function gu(cd) {
    if (cd == 1) {
        return "동구";
    } else if (cd == 2) {
        return "중구";
    } else if (cd == 3) {
        return "서구";
    } else if (cd == 4) {
        return "유성";
    } else {
        return "대덕구";
    }
}

function classification(classification) {
    if (classification == 1) {
        return "개";
    } else if (classification == 2) {
        return "고양이";
    } else {
        return "기타동물";
    }
}

function extractRegIdPart(regId) {
    // "25-2-042"에서 "042" 추출
    return regId.split('-').pop();
}

function extractYear(rescueDate) {
    // "2025-03-25"에서 "2025" 추출
    return rescueDate.split('-')[0];
}