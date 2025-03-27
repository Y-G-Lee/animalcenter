// 모든 아코디언 버튼을 가져옵니다.
var accordions = document.getElementsByClassName("accordion");

// 각 버튼에 대해 클릭 이벤트 추가
for (var i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener("click", function () {
        // 클릭한 버튼 다음의 패널을 가져옵니다.
        var panel = this.nextElementSibling;

        // 패널이 열려있는 경우 닫고 배경색을 원래대로 돌립니다.
        if (panel.classList.contains("active")) {
            panel.classList.remove("active");  // 패널 닫기
            this.classList.remove("active-button");  // 배경색 원래대로 돌리기
        } else {
            // 다른 패널이 열려있는 경우 닫고, 클릭된 패널만 열기
            var allPanels = document.getElementsByClassName("panel");
            for (var j = 0; j < allPanels.length; j++) {
                allPanels[j].classList.remove("active");  // 모든 패널 닫기
            }

            var allButtons = document.getElementsByClassName("accordion");
            for (var j = 0; j < allButtons.length; j++) {
                allButtons[j].classList.remove("active-button");  // 모든 배경색 원래대로 돌리기
            }

            panel.classList.add("active");  // 클릭한 패널 열기
            this.classList.add("active-button");  // 클릭된 버튼 배경색 변경
        }
    });
}