// 하이라이트 라이브러리 실행
hljs.highlightAll();

window.onload = function(){
    // 들여쓰기 제거 스크립트 (코드영역)
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
    let codeBtn = document.querySelectorAll(".cont_box h2 span:not(.popup)");
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


    
    // 메뉴 클릭시 콘텐츠 변환
    {
        document.querySelector(".lnb ul:nth-child(2)").style.display = "block";
        document.querySelector(".lnb ul:nth-child(2) li:nth-child(2)").classList.add("on");
        document.querySelector(".main_cont .cont_wrap:nth-child(2)").style.display = "block";
        document.querySelector(".main_cont .cont_wrap:nth-child(2) .cont:nth-child(2)").style.display = "block";

        const gnbMenu = document.querySelectorAll(".gnb ul li"); 
        const lnbAll = document.querySelectorAll(".lnb ul");
        const lnbListAll = document.querySelectorAll(".lnb ul li");
        const contWrap = document.querySelectorAll(".cont_wrap");
        const cont = document.querySelectorAll(".cont");

        // gnb
        gnbMenu.forEach(function(gnb,index){
            gnb.addEventListener("click",function(){
                let dataGnb = this.dataset.gnb;
                lnbAll.forEach(function(el){
                    el.style.display = "none";
                });
                contWrap.forEach(function(el){
                    el.style.display = "none";
                });
                cont.forEach(function(el){
                    el.style.display = "none";
                });
                lnbListAll.forEach(function(el){
                    el.classList.remove("on");
                });

                document.querySelector(`.lnb_${dataGnb}`).style.display = "block";
                document.querySelector(`.lnb_${dataGnb} li:first-child`).classList.add("on");
                document.querySelector(`.cont_wrap.${dataGnb}`).style.display = "block";
                document.querySelector(`.cont_wrap.${dataGnb} .cont:first-child`).style.display = "block";
            })
        })

        // lnb 클릭시 해당 content 보여주기
        lnbAll.forEach(function(ul){
            ul.querySelectorAll("li").forEach(function(li,index){
                li.addEventListener("click",function(){
                    let listType = this.parentElement.dataset.type;
                    cont.forEach(function(el){
                        el.style.display = "none";
                    });
                    lnbListAll.forEach(function(el){
                        el.classList.remove("on");
                    });
                    this.classList.add("on");
                    document.querySelector(`.cont_wrap.${listType} .cont:nth-child(${index+1})`).style.display = "block";
                })
            })
        })


        
    }

    // 모바일 메뉴 열기
    document.querySelector(".gnb span").addEventListener("click",function(){
        const lnb = document.querySelector(".lnb");
        const bk = document.querySelector(".bk_panel");
        if(getComputedStyle(lnb).left === "-200px"){
            lnb.style.left = "0px";
            bk.style.display = "block";
        } else{
            lnb.style.left = "-200px";
            bk.style.display = "none";
        }
    })


    // react 랜더링 팝업
    {
        // 팝업 버튼
        const popup = document.querySelector(".layerpopup");
        const popupBox = document.querySelectorAll(".layerpopup > div:not(l_bk)");
        const popupBtn = document.querySelectorAll(".popup");
        popupBtn.forEach(function(btn){
            btn.addEventListener("click",function(){
                const popupNum = btn.dataset.num;
                console.log(popupNum)
                document.getElementById(`p_${popupNum}`).style.display = "flex";
                popup.style.display = "flex";
            })
        })

        // 팝업 닫기 (여백 클릭시)
        const l_bk = document.querySelector(".l_bk");
        l_bk.addEventListener("click",function(){
            popupBox.forEach(function(el){
                el.style.display = "none";
            })
            popup.style.display = "none";
        })
    }
}