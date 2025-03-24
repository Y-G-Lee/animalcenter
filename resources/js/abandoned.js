let allItemArray = [];

let pageNo = 1;

let finalPage;
function sendAjax() {
    var xhr = new XMLHttpRequest();

    var url = 'http://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList'; /*URL*/

    var queryParams = '?serviceKey=t1q4uVl99uUv%2FIc7a3gDPKQo7l96iCv8seIC%2FwiO%2F6JqJtPvp8gJKNouyrMkqYPGoVxZGjsBOU5LP78ZLe9rAQ%3D%3D'; /*Service Key*/
    queryParams += '&numOfRows=100'; /**/
    queryParams += '&pageNo=' + pageNo; /**/

    xhr.open('GET', url + queryParams);

    xhr.onload = function () {
        let x2js = new X2JS();
        let json = x2js.xml_str2json(xhr.response);
        console.log(json);

        if (!finalPage) {
            let toralCount = json["ServiceResult"]["msgHeader"]["totalCount"];
            finalPage = json["ServiceResult"]["msgHeader"]["totalPage"];
        }

        let items = json["ServiceResult"]["MsgBody"]["items"];

        console.log(items);

        if (items) {
            for (let i = 0; i < items.length; i++) {
                allItemArray.push(items[i]);
            }

            pageNo++;

            sendAjax();
        } else {
            console.log(allItemArray);

            statics();
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

    for(let i = 0; i < temp/length; i++) {
        if(!tempSum[allItemArray[i]["rescueDate"]].subString(0,4)) {
            tempSum[allItemArray[i]["rescueDate"]].subString(0,4) = 1;
        } else {
            tempSum[allItemArray[i]["rescueDate"]].subString(0,4) += 1;
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
                data: [ 1467, 377, 51],
                backgroundColor: [
                    'rgba(0,0,255,0.2)',
                    'rgba(255,0,0,0.2)',
                    'rgba(255, 205, 86, 0.2)'
                ],
                borderColor: [
                    'blue',
                    'red',
                    'yellow'
                ],
                borderWidth: 2
            }]
        }
    });

    const pie = document.getElementById("pieChart");

    new Chart(pie, {
        type: 'pie',
        datasets: [{
            labels:["개", "고양이", "기타"],
            data: tempSum,
        }]
    });

    const line = document.getElementById("lineChart");

    new Chart(line, {
        type: 'line',
        data: {
            labels: ["2020","2021", "2022", "2023", "2024", "2025"],
            datasets: [{
                data: [1467, 377,51],
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
    let pdfContent = document.getElementById("pdfContent");

    html2cavas(pdfContent).then((canvas) => {
        let img = canvas.toDataURL("image/png");

        let {jsPDF} = window.jspdf;

        let pdf = new jsPDF("p", "mm", "a4");

        let imageWidth = 190;

        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;
        console.log(canvasWidth);
        console.log(canvasHeight);

        let imageHeight = canvasHeight * imageWidth / canvasWidth;
        console.log(imageHeight);

        let x = 10;
        let y = 10;

        pdf.addImage(img, "PNG", x, y, imageWidth, imageHeight);

        pdf.save("유기동물.pdf");
    });
});