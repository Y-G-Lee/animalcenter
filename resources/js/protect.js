let pageNo = 1;

let itemCountPerPage = 9;

let totalPage;

let finalPage;

let possible = document.getElementById("possible");
let dog = document.getElementById("dog");
let cat = document.getElementById("cat");
let other = document.getElementById("other");

function sendAjax() {
    // let type = document.getElementById("type").value;
    // let situation = document.getElementById("situation").value;
    // let area = document.getElementById("area").value;
    // let gender = document.getElementById("gender").value;
    let inputSearch = document.getElementById("inputSearch").value;
    var xhr = new XMLHttpRequest();
    var url = 'http://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList'; /*URL*/
    var queryParams = '?serviceKey=t1q4uVl99uUv%2FIc7a3gDPKQo7l96iCv8seIC%2FwiO%2F6JqJtPvp8gJKNouyrMkqYPGoVxZGjsBOU5LP78ZLe9rAQ%3D%3D'; /*Service Key*/
    queryParams += '&pageNo=' + pageNo; /**/
    queryParams += '&numOfRows=' + itemCountPerPage; /**/

    if (inputSearch) {
        queryParams += "&searchKeyword=" + inputSearch;
    } //else if(type) {
    //     queryParams += "&searchCondition=" + type;
    // }else if(situation) {
    //     queryParams += "&searchCondition3=" + situation;
    // }else if(area) {
    //     queryParams += "&searchCondition2=" + area;
    // }else if(gender) {
    //     queryParams += "&gubun=" + gender;
    // }

    
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
            let str = `<div class="card" data-regid="${items[i]["regId"]}" onclick="goDetail()">
                            <div class="card-top">
                                <img src="https://www.daejeon.go.kr/${imgSrc}" alt="">
                                <div class="card-state"> ${stateCd2Str(items[i]["adoptionStatusCd"])} </div>
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
    var url = 'http://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList'; /*URL*/
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
            let str = `<div class="card" data-regid="${items[i]["regId"]}" onclick="goDetail()">
                            <div class="card-top">
                                <img src="https://www.daejeon.go.kr/${imgSrc}" alt="">
                                <div class="card-state"> ${stateCd2Str(items[i]["adoptionStatusCd"])} </div>
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
    var url = 'http://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList'; /*URL*/
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
            let str = `<div class="card" data-regid="${items[i]["regId"]}" onclick="goDetail()">
                            <div class="card-top">
                                <img src="https://www.daejeon.go.kr/${imgSrc}" alt="">
                                <div class="card-state"> ${stateCd2Str(items[i]["adoptionStatusCd"])} </div>
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
    var url = 'http://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList'; /*URL*/
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
            let str = `<div class="card" data-regid="${items[i]["regId"]}" onclick="goDetail()">
                            <div class="card-top">
                                <img src="https://www.daejeon.go.kr/${imgSrc}" alt="">
                                <div class="card-state"> ${stateCd2Str(items[i]["adoptionStatusCd"])} </div>
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
    var url = 'http://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList'; /*URL*/
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
            let str = `<div class="card" data-regid="${items[i]["regId"]}" onclick="goDetail()">
                            <div class="card-top">
                                <img src="https://www.daejeon.go.kr/${imgSrc}" alt="">
                                <div class="card-state"> ${stateCd2Str(items[i]["adoptionStatusCd"])} </div>
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

function searchBtn() {
    

    console.log(type);
    console.log(situation);
    console.log(area);
    console.log(gender);

    sendAjax();
}

function goPage(no) {
    console.log(no);

    pageNo++;

    currentPage = no;

    drawPage();

    sendAjax();
}

function drawPage() {
    let startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
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

        if (i == currentPage) {
            str = `<a href="#" class="active"> ${i} </a>`;
        }

        pagingBox.innerHTML += str;
    }

    pagingBox.innerHTML += `<a class="first-page" href="javascript:next()"> &gt; </a>`;

    pagingBox.innerHTML += `<a class="first-page" href="javascript:goLast()" title="마지막 페이지"> &gt;&gt; </a>`;
}

function next() {
    currentPage = Math.floor((currentPage - 1) / 10) * 10 + 11;

    drawPage();

    sendAjax();

    pageNo++;
}

function previous() {
    if (currentPage <= 10) {
        return;
    }
    currentPage = Math.floor((currentPage - 1) / 10) * 10;

    drawPage();

    sendAjax();
}

function goLast() {
    currentPage = finalPage;

    drawPage();

    sendAjax();
    pageNo++;
}

function goFirst() {
    currentPage = 1;

    drawPage();

    sendAjax();
    pageNo++;
}

function goDetail() {
    let regId = event.currentTarget.dataset["regId"];

    open("./detail.html?q=" + regId);
}

document.get

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

function classification(classification) {
    if (classification == 1) {
        return "개";
    } else if (classification == 2) {
        return "고양이";
    } else if (classification == 3) {
        return "기타";
    }
}


