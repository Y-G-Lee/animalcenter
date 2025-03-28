let pageNo = 1;

let itemCountPerPage = 9;

let totalPage;

let finalPage;

let possible = document.getElementById("possible");
let dog = document.getElementById("dog");
let cat = document.getElementById("cat");
let other = document.getElementById("other");

function sendAjax() {
    const $inputSearch = document.getElementById("inputSearch");
    const $type = document.getElementById('type');
    const $situation = document.getElementById("situation");
    const $area = document.getElementById("area");
    const $gender = document.getElementById("gender");



    var xhr = new XMLHttpRequest();
    var url = 'https://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList'; /*URL*/
    var queryParams = '?serviceKey=t1q4uVl99uUv%2FIc7a3gDPKQo7l96iCv8seIC%2FwiO%2F6JqJtPvp8gJKNouyrMkqYPGoVxZGjsBOU5LP78ZLe9rAQ%3D%3D'; /*Service Key*/
    queryParams += '&pageNo=' + pageNo; /**/
    queryParams += '&numOfRows=' + itemCountPerPage; /**/

    if ($inputSearch.value) {
        queryParams += "&searchKeyword=" + $inputSearch.value;
    }

    if ($type.value !== '0') {
        queryParams += "&searchCondition=" + $type.value;
    }

    if ($situation.value !== '0') {
        queryParams += "&searchCondition3=" + $situation.value;
    }

    if ($area.value !== '0') {
        queryParams += "&searchCondition2=" + $area.value;
    }

    if ($gender.value !== '0') {
        queryParams += "&gubun=" + $gender.value;
    }


    xhr.open('GET', url + queryParams);
    xhr.onload = function () {
        console.log(xhr.response);

        let x2js = new X2JS();
        let json = x2js.xml_str2json(xhr.response);
        console.log(json);

        totalPage = json["ServiceResult"]["msgHeader"]["totalCount"];

        finalPage = Math.ceil(totalPage / itemCountPerPage);
        console.log("마지막 페이지:" + finalPage)

        let items = json["ServiceResult"]["MsgBody"]["items"];
        console.log(items);

        document.querySelector(".card-box").innerHTML = "";

        for (let i = 0; i < items.length; i++) {
            let imgSrc = items[i]["filePath"] ? "https://www.daejeon.go.kr/" + items[i]["filePath"] : "./resources/img/thumb_no_img.png";
            let state = stateCd2Str(items[i]["adoptionStatusCd"]);
            let str = `<div class="card" data-regid="${items[i]["regId"]}" onclick="goDetail()">
                            <div class="card-top">
                                <img src="${imgSrc}" alt="">
                                <div class="card-state ${state.className}"> ${state.text} </div>
                            </div>
                            <div class="card-bottom">
                                <div class="card-introduce">
                                    <div class="line">
                                        <p class="card-type"> ${items[i]["species"]} </p>
                                    </div>
                                    <p class="card-gender"> ${(items[i]["gender"] == 1) ? ("암컷") : ("수컷")} </p>
                                </div>
                                <p> 관리번호: ${items[i]["regId"]} </p>
                            </div>
                        </div>`;
            document.querySelector(".card-box").innerHTML += str;
        }

    }
    xhr.send();
}

sendAjax();

document.getElementById("all").addEventListener("click", () => {
    document.getElementById("all").classList.add("all");
    document.getElementById("all").classList.remove("possible");
    possible.classList.add("possible");
    possible.classList.remove("all");
    dog.classList.add("possible");
    dog.classList.remove("all");
    cat.classList.add("possible");
    cat.classList.remove("all");
    other.classList.add("possible");
    other.classList.remove("all");
    sendAjax();
});

possible.addEventListener("click", () => {
    document.getElementById("all").classList.remove("all");
    document.getElementById("all").classList.add("possible");
    possible.classList.remove("possible");
    possible.classList.add("all");
    dog.classList.remove("all");
    dog.classList.add("possible");
    cat.classList.add("possible");
    cat.classList.remove("all");
    other.classList.add("possible");
    other.classList.remove("all");

    var xhr = new XMLHttpRequest();
    var url = 'https://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList'; /*URL*/
    var queryParams = '?serviceKey=t1q4uVl99uUv%2FIc7a3gDPKQo7l96iCv8seIC%2FwiO%2F6JqJtPvp8gJKNouyrMkqYPGoVxZGjsBOU5LP78ZLe9rAQ%3D%3D'; /*Service Key*/
    queryParams += '&pageNo=' + pageNo; /**/
    queryParams += '&numOfRows=' + itemCountPerPage; /**/
    queryParams += '&searchCondition3=2'

    xhr.open('GET', url + queryParams);
    xhr.onload = function () {
        console.log(xhr.response);

        let x2js = new X2JS();
        let json = x2js.xml_str2json(xhr.response);
        console.log(json);

        totalPage = json["ServiceResult"]["msgHeader"]["totalCount"];

        finalPage = Math.ceil(totalPage / itemCountPerPage);
        console.log("마지막 페이지:" + finalPage)

        let items = json["ServiceResult"]["MsgBody"]["items"];
        console.log(items);

        document.querySelector(".card-box").innerHTML = "";

        for (let i = 0; i < items.length; i++) {
            let imgSrc = items[i]["filePath"];
            let state = stateCd2Str(items[i]["adoptionStatusCd"]);
            let str = `<div class="card" data-regid="${items[i]["regId"]}" onclick="goDetail()">
                            <div class="card-top">
                                <img src="https://www.daejeon.go.kr/${imgSrc}" alt="">
                                <div class="card-state ${state.className}"> ${state.text} </div>
                            </div>
                            <div class="card-bottom">
                                <div class="card-introduce">
                                    <div class="line">
                                        <p class="card-type"> ${items[i]["species"]} </p>
                                    </div>
                                    <p class="card-gender"> ${(items[i]["gender"] == 1) ? ("암컷") : ("수컷")} </p>
                                </div>
                                <p> 관리번호: ${items[i]["regId"]} </p>
                            </div>
                        </div>`;
            document.querySelector(".card-box").innerHTML += str;
        }

    }
    xhr.send();
});

dog.addEventListener("click", () => {
    document.getElementById("all").classList.remove("all");
    document.getElementById("all").classList.add("possible");
    dog.classList.remove("possible");
    dog.classList.add("all");
    possible.classList.remove("all");
    possible.classList.add("possible");
    cat.classList.remove("all");
    cat.classList.add("possible");
    other.classList.remove("all");
    other.classList.add("possible");

    var xhr = new XMLHttpRequest();
    var url = 'https://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList'; /*URL*/
    var queryParams = '?serviceKey=t1q4uVl99uUv%2FIc7a3gDPKQo7l96iCv8seIC%2FwiO%2F6JqJtPvp8gJKNouyrMkqYPGoVxZGjsBOU5LP78ZLe9rAQ%3D%3D'; /*Service Key*/
    queryParams += '&pageNo=' + pageNo; /**/
    queryParams += '&numOfRows=' + itemCountPerPage; /**/
    queryParams += '&searchCondition=1'

    xhr.open('GET', url + queryParams);
    xhr.onload = function () {
        console.log(xhr.response);

        let x2js = new X2JS();
        let json = x2js.xml_str2json(xhr.response);
        console.log(json);

        totalPage = json["ServiceResult"]["msgHeader"]["totalCount"];

        finalPage = Math.ceil(totalPage / itemCountPerPage);
        console.log("마지막 페이지:" + finalPage)

        let items = json["ServiceResult"]["MsgBody"]["items"];
        console.log(items);

        document.querySelector(".card-box").innerHTML = "";

        for (let i = 0; i < items.length; i++) {
            let imgSrc = items[i]["filePath"];
            let state = stateCd2Str(items[i]["adoptionStatusCd"]);
            let str = `<div class="card" data-regid="${items[i]["regId"]}" onclick="goDetail()">
                            <div class="card-top">
                                <img src="https://www.daejeon.go.kr/${imgSrc}" alt="">
                                <div class="card-state ${state.className}"> ${state.text} </div>
                            </div>
                            <div class="card-bottom">
                                <div class="card-introduce">
                                    <div class="line">
                                        <p class="card-type"> ${items[i]["species"]} </p>
                                    </div>
                                    <p class="card-gender"> ${(items[i]["gender"] == 1) ? ("암컷") : ("수컷")} </p>
                                </div>
                                <p> 관리번호: ${items[i]["regId"]} </p>
                            </div>
                        </div>`;
            document.querySelector(".card-box").innerHTML += str;
        }

    }
    xhr.send();
});

cat.addEventListener("click", () => {
    document.getElementById("all").classList.remove("all");
    document.getElementById("all").classList.add("possible");
    cat.classList.remove("possible");
    cat.classList.add("all");
    possible.classList.remove("all");
    possible.classList.add("possible");
    dog.classList.remove("all");
    dog.classList.add("possible");
    other.classList.remove("all");
    other.classList.add("possible");

    var xhr = new XMLHttpRequest();
    var url = 'https://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList'; /*URL*/
    var queryParams = '?serviceKey=t1q4uVl99uUv%2FIc7a3gDPKQo7l96iCv8seIC%2FwiO%2F6JqJtPvp8gJKNouyrMkqYPGoVxZGjsBOU5LP78ZLe9rAQ%3D%3D'; /*Service Key*/
    queryParams += '&pageNo=' + pageNo; /**/
    queryParams += '&numOfRows=' + itemCountPerPage; /**/
    queryParams += '&searchCondition=2'

    xhr.open('GET', url + queryParams);
    xhr.onload = function () {
        console.log(xhr.response);

        let x2js = new X2JS();
        let json = x2js.xml_str2json(xhr.response);
        console.log(json);

        totalPage = json["ServiceResult"]["msgHeader"]["totalCount"];

        finalPage = Math.ceil(totalPage / itemCountPerPage);
        console.log("마지막 페이지:" + finalPage)

        let items = json["ServiceResult"]["MsgBody"]["items"];
        console.log(items);

        document.querySelector(".card-box").innerHTML = "";

        for (let i = 0; i < items.length; i++) {
            let imgSrc = items[i]["filePath"];
            let state = stateCd2Str(items[i]["adoptionStatusCd"]);
            let str = `<div class="card" data-regid="${items[i]["regId"]}" onclick="goDetail()">
                            <div class="card-top">
                                <img src="https://www.daejeon.go.kr/${imgSrc}" alt="">
                                <div class="card-state ${state.className}"> ${state.text} </div>
                            </div>
                            <div class="card-bottom">
                                <div class="card-introduce">
                                    <div class="line">
                                        <p class="card-type"> ${items[i]["species"]} </p>
                                    </div>
                                    <p class="card-gender"> ${(items[i]["gender"] == 1) ? ("암컷") : ("수컷")} </p>
                                </div>
                                <p> 관리번호: ${items[i]["regId"]} </p>
                            </div>
                        </div>`;
            document.querySelector(".card-box").innerHTML += str;
        }

    }
    xhr.send();
});

other.addEventListener("click", () => {
    document.getElementById("all").classList.remove("all");
    document.getElementById("all").classList.add("possible");
    other.classList.remove("possible");
    other.classList.add("all");
    possible.classList.remove("all");
    possible.classList.add("possible");
    dog.classList.remove("all");
    dog.classList.add("possible");
    cat.classList.remove("all");
    cat.classList.add("possible");

    var xhr = new XMLHttpRequest();
    var url = 'https://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList'; /*URL*/
    var queryParams = '?serviceKey=t1q4uVl99uUv%2FIc7a3gDPKQo7l96iCv8seIC%2FwiO%2F6JqJtPvp8gJKNouyrMkqYPGoVxZGjsBOU5LP78ZLe9rAQ%3D%3D'; /*Service Key*/
    queryParams += '&pageNo=' + pageNo; /**/
    queryParams += '&numOfRows=' + itemCountPerPage; /**/
    queryParams += '&searchCondition=3';

    console.log(queryParams);

    xhr.open('GET', url + queryParams);
    xhr.onload = function () {
        console.log(xhr.response);

        let x2js = new X2JS();
        let json = x2js.xml_str2json(xhr.response);
        console.log(json);

        totalPage = json["ServiceResult"]["msgHeader"]["totalCount"];

        finalPage = Math.ceil(totalPage / itemCountPerPage);
        console.log("마지막 페이지:" + finalPage)

        let items = json["ServiceResult"]["MsgBody"]["items"];
        console.log(items);

        document.querySelector(".card-box").innerHTML = "";

        for (let i = 0; i < items.length; i++) {
            let imgSrc = items[i]["filePath"];
            let state = stateCd2Str(items[i]["adoptionStatusCd"]);
            let str = `<div class="card" data-regid="${items[i]["regId"]}" onclick="goDetail()">
                            <div class="card-top">
                                <img src="https://www.daejeon.go.kr/${imgSrc}" alt="">
                                <div class="card-state ${state.className}"> ${state.text} </div>
                            </div>
                            <div class="card-bottom">
                                <div class="card-introduce">
                                    <div class="line">
                                        <p class="card-type"> ${items[i]["species"]} </p>
                                    </div>
                                    <p class="card-gender"> ${(items[i]["gender"] == 1) ? ("암컷") : ("수컷")} </p>
                                </div>
                                <p> 관리번호: ${items[i]["regId"]} </p>
                            </div>
                        </div>`;
            document.querySelector(".card-box").innerHTML += str;
        }

    }
    xhr.send();
});

function goPage(no) {
    console.log(no);

    pageNo = no;

    drawPage();

    sendAjax();
}

function drawPage() {
    let startPage = Math.floor((pageNo - 1) / 10) * 10 + 1;
    let lastPage = startPage + 9;

    if (lastPage > finalPage) {
        lastPage = finalPage;
    }

    let pagingBox = document.querySelector(".paging-box");
    pagingBox.innerHTML = "";

    pagingBox.innerHTML += `<a class="first-page" href="javascript:goFirst()"> &lt;&lt; </a>`;
    pagingBox.innerHTML += `<a class="first-page" href="javascript:previous()"> &lt; </a>`;

    for (let i = startPage; i <= lastPage; i++) {
        let str = `<a href="javascript:goPage(${i})"> ${i} </a>`

        if (i == pageNo) {
            str = `<a href="#" class="active"> ${i} </a>`;
        }

        pagingBox.innerHTML += str;
    }

    pagingBox.innerHTML += `<a class="first-page" href="javascript:next()"> &gt; </a>`;

    pagingBox.innerHTML += `<a class="first-page" href="javascript:goLast()"> &gt;&gt; </a>`;
}

function next() {
    pageNo = Math.floor((pageNo - 1) / 10) * 10 + 11;

    drawPage();

    sendAjax();

}

function previous() {
    if (pageNo <= 10) {
        return;
    }
    pageNo = Math.floor((pageNo - 1) / 10) * 10;

    drawPage();

    sendAjax();
}

function goLast() {
    pageNo = finalPage;

    drawPage();

    sendAjax();
}

function goFirst() {
    pageNo = 1;

    drawPage();

    sendAjax();
}

function goDetail() {
    console.log(event.currentTarget);
    console.log(event.currentTarget.dataset);
    let regId = event.currentTarget.dataset["regid"];
    console.log(regId);

    location.href = "./detail.html?regId=" + regId;
}

document.get

// 입양상태 코드에 따른 문자열값 리턴
// function stateCd2Str(cd) {
//     if (cd == 1) {
//         return "공고중";
//     } else if (cd == 2) {
//         return "입양가능";
//     } else if (cd == 3) {
//         return "입양예정";
//     } else if (cd == 4) {
//         return "입양완료";
//     } else {
//         return "주인반환";
//     }
// }

function stateCd2Str(cd) {
    let stateText = '';
    let stateClass = '';

    if (cd == 1) {
        stateText = "공고중";
        stateClass = "announcement"; // 상태에 따른 클래스명
    } else if (cd == 2) {
        stateText = "입양가능";
        stateClass = "adoptable";
    } else if (cd == 3) {
        stateText = "입양예정";
        stateClass = "pending";
    } else if (cd == 4) {
        stateText = "입양완료";
        stateClass = "adopted";
    } else {
        stateText = "주인반환";
        stateClass = "returned";
    }

    // card-state에 상태 클래스 추가
    return { text: stateText, className: stateClass };
}

function classification(classification) {
    if (classification == 1) {
        return "개";
    } else if (classification == 2) {
        return "고양이";
    } else if (classification == 3) {
        return "기타";
    }
}

let animalArray = [];
document.getElementById("downloadEXCEL").addEventListener("click", () => {
    var xhr = new XMLHttpRequest();

    var url = 'https://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList'; /*URL*/

    var queryParams = '?serviceKey=t1q4uVl99uUv%2FIc7a3gDPKQo7l96iCv8seIC%2FwiO%2F6JqJtPvp8gJKNouyrMkqYPGoVxZGjsBOU5LP78ZLe9rAQ%3D%3D'; /*Service Key*/
    queryParams += '&numOfRows=10000'; /**/
    queryParams += '&pageNo=' + pageNo; /**/

    xhr.open('GET', url + queryParams);

    xhr.onload = function () {
        let x2js = new X2JS();
        let json = x2js.xml_str2json(xhr.response);
        console.log(json);

        let items = json["ServiceResult"]["MsgBody"]["items"];

        console.log(items);

        for (let i = 0; i < items.length; i++) {
            let Array = {};
            Array["종"] = items[i]["species"];
            Array["성별"] = gender(items[i]["gender"]);
            Array["관리번호"] = items[i]["regId"];
            animalArray.push(Array);
        }
        console.log(animalArray);

        let sheet = XLSX.utils.json_to_sheet(animalArray);
    
        let excel = XLSX.utils.book_new();
    
        XLSX.utils.book_append_sheet(excel, sheet, "animal");
    
        XLSX.writeFile(excel, "animalall.xlsx");
    }
    xhr.send();

});

function gender(cd) {
    if(cd == 1) {
        return "암컷";
    } else if(cd == 2) {
        return "수컷";
    } else {
        return "미상";
    }
}