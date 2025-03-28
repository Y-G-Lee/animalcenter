let allItemArray = [];

let pageNo = 1;

let finalPage;
function sendAjax() {
    document.querySelector(".spinner-background").classList.remove("d-none");

    var xhr = new XMLHttpRequest();

    var url = 'https://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList'; /*URL*/

    var queryParams = '?serviceKey=t1q4uVl99uUv%2FIc7a3gDPKQo7l96iCv8seIC%2FwiO%2F6JqJtPvp8gJKNouyrMkqYPGoVxZGjsBOU5LP78ZLe9rAQ%3D%3D'; /*Service Key*/
    queryParams += '&numOfRows=100'; /**/
    queryParams += '&pageNo=' + pageNo; /**/

    xhr.open('GET', url + queryParams);

    xhr.onload = function () {
        let x2js = new X2JS();
        let json = x2js.xml_str2json(xhr.response);
        console.log(json);

        if (!finalPage) {
            finalPage = json["ServiceResult"]["msgHeader"]["totalPage"];
        }

        let items = json["ServiceResult"]["MsgBody"]["items"];

        console.log(items);

        if (items) {
            for (let i = 0; i < items.length; i++) {
                allItemArray.push(items[i]);
            }

            document.getElementById("count").innerHTML = pageNo + "/" + finalPage;

            pageNo++;

            sendAjax();
        } else {
            console.log(allItemArray);

            statics();

            // 스피너 제거
            document.querySelector(".spinner-background").classList.add("d-none");
        }

    }

    xhr.send();
}
console.log(sendAjax());

function statics() {
    let temp = {};
    for (let i = 0; i < allItemArray.length; i++) {
        if (!temp[classification(allItemArray[i]["classification"])]) {
            temp[classification(allItemArray[i]["classification"])] = 1;
        } else {
            temp[classification(allItemArray[i]["classification"])] += 1;
        }
    }
    console.log(temp);

    let tempSum = {};

    for (let i = 0; i < allItemArray.length; i++) {
        let rescueDate = allItemArray[i]["rescueDate"];
        if (rescueDate) {
            let year = rescueDate.split("-")[0]; // 연도 추출

            if (!tempSum[year]) {
                tempSum[year] = 1;
            } else {
                tempSum[year] += 1;
            }
        }
    }

    console.log(tempSum);

    const bar = document.getElementById("barChart");

    new Chart(bar, {
        type: 'bar',
        data: {
            labels: ["개", "고양이", "기타"],
            datasets: [{
                label: "마리",
                data: [1467, 377, 51],
                backgroundColor: [
                    'rgb(139, 201, 244)',
                    'rgb(255,162,183)',
                    'rgb(255, 202, 150)'
                ],
                borderColor: [
                    'rgb(0, 60, 255)',
                    'rgb(255,0,0)',
                    'orange'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: false, // 반응형 해제
            maintainAspectRatio: false, // 가로세로 비율 고정 해제
            width: 500, // 캔버스 크기 조절
            height: 500
        }
    });

    const pie = document.getElementById("pieChart");

    new Chart(pie, {
        type: 'pie',
        data: {
            labels: ["개", "고양이", "기타"], // <-- 여기를 data 안으로 옮김!
            datasets: [{
                data: [1467, 377, 51], // <-- 원형 차트 데이터
                backgroundColor: [
                    'rgb(54,162,235)',
                    'rgb(255,99,132)',
                    'rgb(255,159,64)'
                ],
                borderColor: [
                    'rgb(54,162,235)',
                    'rgb(255,99,132)',
                    'rgb(255,159,64)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: false, // 반응형 설정
            maintainAspectRatio: false // 비율 유지 여부
        }
    });

    const line = document.getElementById("lineChart");

    new Chart(line, {
        type: 'line',
        data: {
            labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
            datasets: [{
                label: "년도별 유기동물수",
                data: tempSum
            }]
        }
    });
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

document.getElementById("downloadPDF").addEventListener("click", () => {
    let pdfContent = document.getElementById("pdfContent"); // 변환할 HTML 요소

    html2canvas(pdfContent).then((canvas) => {
        let img = canvas.toDataURL("image/png"); // 캔버스를 이미지로 변환

        let { jsPDF } = window.jspdf;
        let pdf = new jsPDF("p", "mm", "a4"); // A4 크기 PDF 생성

        let imageWidth = 190; // 이미지 너비 설정
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;

        let imageHeight = (canvasHeight * imageWidth) / canvasWidth; // 비율 유지하여 높이 계산

        let x = 10; // PDF 좌표 (x)
        let y = 10; // PDF 좌표 (y)

        pdf.addImage(img, "PNG", x, y, imageWidth, imageHeight); // PDF에 이미지 추가
        pdf.save("유기동물.pdf"); // PDF 다운로드
    });
});