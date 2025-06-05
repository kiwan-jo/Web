// 하이라이트 라이브러리 실행
hljs.highlightAll();

// 들여쓰기 제거 스크립트
window.onload = function(){
    document.querySelectorAll('pre code').forEach((block) => {
        const lines = block.innerHTML.split('\n');
    
        // 빈 줄 제거
        while (lines.length && lines[0].trim() === '') lines.shift();
        while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();
    
        // 최소 들여쓰기 계산
        const indentLength = Math.min(...lines
        .filter(line => line.trim()) // 빈 줄 제외
        .map(line => line.match(/^(\s*)/)[1].length)
        );
    
        // 들여쓰기 제거
        block.innerHTML = lines
        .map(line => line.slice(indentLength))
        .join('\n');
    });

    // 코드보기 버튼
    let codeBtn = document.querySelectorAll(".cont_box h2 span");
    codeBtn.forEach(function(code){
        code.addEventListener("click",function(){
            let codeBox = this.parentElement.nextElementSibling.nextElementSibling;
            let codeHeight = this.parentElement.nextElementSibling.nextElementSibling.childNodes[1].offsetHeight;

            if(codeBox.classList.contains("on")){
                codeBox.classList.remove("on");
                codeBox.style.height = 0;
                this.textContent = "코드보기";
            } else{
                codeBox.classList.add("on");
                codeBox.style.height = (codeHeight + 10) + "px";
                this.textContent = "코드접기";
            }
        })
    })


    // lnb 클릭시 해당 content 보여주기
    let lnbList = document.querySelectorAll(".lnb ul li");
    let contWrap = document.querySelectorAll(".cont_wrap");
    let cont = document.querySelectorAll(".cont");
    lnbList.forEach(function(li){
        li.addEventListener("click",function(){
            let dataType = li.parentElement.dataset.type;
            let title = li.textContent;
            contWrap.forEach(function(contBox){
                contBox.style.display = "none";
            })
            cont.forEach(function(cont){
                cont.style.display = "none";
            })
            document.querySelector(`.cont_wrap.${dataType}`).style.display = "block";
            document.querySelector(`.cont.${title}`).style.display = "block";
        })
    })
}