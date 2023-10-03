/*HANDLING DATA*/
  const urlParams = new URLSearchParams(window.location.search);
  // Lấy giá trị của một tham số cụ thể
  var page = urlParams.get('page');
  let linkToProcess = "?";
  if(urlParams.get('s')) {
    linkToProcess = "?s="+urlParams.get('s')+"&";
  };
  let numberpage = 10;

  if(!page || page<1){
    page = 1;
  } else if(page>numberpage) {
    page = numberpage;
  }
  let firstlink = document.getElementById('first-link');
  let prelink = document.getElementById('previous-link');
  let link1 = document.getElementById('link1');
  let link2 = document.getElementById('link2');
  let link3 = document.getElementById('link3');
  let link4 = document.getElementById('link4');
  let nextlink = document.getElementById('next-link');
  let lastlink = document.getElementById('last-link');
  let links = [0, link1, link2, link3, link4];
  
  if(numberpage==1) {
    firstlink.classList.add('block');
    prelink.classList.add('block');
    link2.classList.add('block');
    link3.classList.add('block');
    link4.classList.add('block');
    nextlink.classList.add('block');
    lastlink.classList.add('block');
    link1.innerHTML = '1';
    link1.href = linkToProcess+'page=1';
    link1.classList.add('active');
  } else if(numberpage==2) {
    firstlink.href= linkToProcess+'page=1';
    prelink.href= linkToProcess+'page=1';
    link1.href = linkToProcess+'page=1'; 
    link1.innerHTML='1';
    link2.href = linkToProcess+'page=2';
    link2.innerHTML='2'; 
    links[page].classList.add('active');
    nextlink.href= linkToProcess+'page=2';
    lastlink.href= linkToProcess+'page=2';
    link3.classList.add('block');
    link4.classList.add('block');
  } else if(numberpage==3) {
    firstlink.href= linkToProcess+'page=1';
    prelink.href= linkToProcess+'page='+(page-1);
    link1.href = linkToProcess+'page=1'; 
    link1.innerHTML='1';
    link2.href = linkToProcess+'page=2';
    link2.innerHTML='2'; 
    link3.href = linkToProcess+'page=3';
    link3.innerHTML='3'; 
    links[page].classList.add('active');
    nextlink.href= linkToProcess+'page='+(Number(page)+1);
    lastlink.href= linkToProcess+'page=3';

    link4.classList.add('block');
  } else if(numberpage==4) {
    firstlink.href= linkToProcess+'page=1';
    prelink.href= linkToProcess+'page='+(page-1);
    link1.href = linkToProcess+'page=1'; 
    link1.innerHTML='1';
    link2.href = linkToProcess+'page=2';
    link2.innerHTML='2'; 
    link3.href = linkToProcess+'page=3';
    link3.innerHTML='3'; 
    link4.href = linkToProcess+'page=4';
    link4.innerHTML='4'; 
    links[page].classList.add('active');
    nextlink.href= linkToProcess+'page='+(Number(page)+1);
    lastlink.href= linkToProcess+'page=4';
  } else {
    if(page<=numberpage-2 && page>=2) {
      link1.innerHTML = Number(page)-1;
      link2.innerHTML = page;
      link2.classList.add('active');
      link3.innerHTML = Number(page)+1;
      link4.innerHTML = Number(page)+2;     
      link1.href = linkToProcess+'page='+(Number(page)-1);
      link2.href = linkToProcess+'page='+page;
      link3.href = linkToProcess+'page='+(Number(page)+1);
      link4.href = linkToProcess+'page='+(Number(page)+2);
      firstlink.href= linkToProcess+'page=1';
      prelink.href= linkToProcess+'page='+(page-1);
      nextlink.href= linkToProcess+'page='+(Number(page)+1);
      lastlink.href= linkToProcess+'page='+numberpage;
    } else if(page==1){
      link1.innerHTML = page;
      link1.classList.add('active');
      link2.innerHTML = Number(page)+1;
      link3.innerHTML = Number(page)+2;
      link4.innerHTML = Number(page)+3;  
      link1.href = linkToProcess+'page=1';
      link2.href = linkToProcess+'page='+(Number(page)+1);
      link3.href = linkToProcess+'page='+(Number(page)+2);
      link4.href = linkToProcess+'page='+(Number(page)+3);
      nextlink.href= linkToProcess+'page='+(Number(page)+1);
      lastlink.href= linkToProcess+'page='+numberpage;      
    } else if(page==numberpage-1) {
      link1.innerHTML = Number(page)-2;
      link2.innerHTML = Number(page)-1;
      link3.innerHTML = page;
      link3.classList.add('active');
      link4.innerHTML = Number(page)+1;     
      link1.href = linkToProcess+'page='+(Number(page)-2);
      link2.href = linkToProcess+'page='+(Number(page)-1);
      link3.href = linkToProcess+'page='+page;
      link4.href = linkToProcess+'page='+(Number(page)+1);
      firstlink.href= linkToProcess+'page=1';
      prelink.href= linkToProcess+'page='+(page-1);
      nextlink.href= linkToProcess+'page='+(Number(page)+1);
      lastlink.href= linkToProcess+'page='+numberpage;
    } else if(page==numberpage) {
      link1.innerHTML = Number(page)-3;
      link2.innerHTML = Number(page)-2;
      link3.innerHTML = Number(page)-1;
      link4.innerHTML = page; 
      link4.classList.add('active');    
      link1.href = linkToProcess+'page='+(Number(page)-3);
      link2.href = linkToProcess+'page='+(Number(page)-2);
      link3.href = linkToProcess+'page='+(Number(page)-1);
      link4.href = linkToProcess+'page='+page;
      firstlink.href= linkToProcess+'page=1';
      prelink.href= linkToProcess+'page='+(page-1);    
    }
  }

  if(page==1) {
    firstlink.classList.add('block');
    prelink.classList.add('block');
    link1.classList.add('active');
  } else if(page==numberpage) {
    lastlink.classList.add('block');
    nextlink.classList.add('block');
    link4.classList.add('active');   
  }

  // Lấy tất cả các tham số và giá trị
  const allParams = {};
  for (const param of urlParams) {
    allParams[param[0]] = param[1];
  }
  console.log(allParams);
  // Output: { param1: 'value1', param2: 'value2' }
/*END HANDLING DATA*/

/*OPEN&CLOSE MENU/LIGHT MODE*/
function isOpenMenu() {
    let body = document.querySelector('body');
    return (Array.from(body.classList).indexOf('openMenu') != -1) ?true:false;
}
function isLightMode() {
    let body = document.querySelector('body');
    return (Array.from(body.classList).indexOf('lightMode') != -1) ?true:false;   
}

document.querySelector("h1.button-open").onclick=function(){
    let body = document.querySelector('body');
    if(isOpenMenu()==false){
      body.classList.add('openMenu');
      sessionStorage.setItem('menuIs', 'open');
    } else {
      body.classList.remove('openMenu');
      sessionStorage.removeItem('menuIs');
    }
};
let button = document.querySelector(".light-mode-button");
button.innerHTML = "Light: <span style=\"color: green\">Turned On</span>";
if(isLightMode()==false){
  button.innerHTML = "Light: <span style=\"color: red\">Turned Off</span>";
}
button.onclick=function(){
    let body = document.querySelector('body');
    if(isLightMode()==false){
        body.classList.add('lightMode');
        this.innerHTML = "Light: <span style=\"color: green\">Turned On</span>";
        sessionStorage.setItem('lightMode', 'on');
    } else {
        body.classList.remove('lightMode');  
        this.innerHTML = "Light: <span style=\"color: red\">Turned Off</span>";
        sessionStorage.removeItem('lightMode');
    }  
}
/*END OPEN&CLOSE MENU/LIGHT MODE*/

/*OPEN&CLOSE LIST IN MENU*/
function closeAllListExept(ii) {
  let lists = document.querySelectorAll('.hidden-list');
  let buttons = document.querySelectorAll('.list-open-button i.fas');
  for (let i=0; i<lists.length; i++) {
    if(i == ii) {
      continue;
    }
    let list = lists[i];
    let button = buttons[i];
    if(Array.from(list.classList).indexOf('open') != -1) {
      list.classList.remove('open');
      list.style.height = "0";      
    }
    if(Array.from(button.classList).indexOf('fa-chevron-down') == -1){
      button.classList.remove('fa-chevron-up');
      button.classList.add('fa-chevron-down');
    }
  }
}
let menu_buttons = document.querySelectorAll('.list-open-button');
for (let i=0; i<menu_buttons.length; i++) {
  menu_buttons[i].onclick=function(){
    let open_icon = document.getElementById('open-icon'+this.name[this.name.length-1]);
    let listName = this.name;
    let list = document.getElementById(listName);
    closeAllListExept(i);
    if(Array.from(list.classList).indexOf("open") == -1) {
      // let height = this.offsetHeight * (document.querySelectorAll('#'+listName+' .sub-item').length+1);
      list.style.height = 'fit-content';
      list.classList.add("open");
      open_icon.classList.remove('fa-chevron-down');
      open_icon.classList.add('fa-chevron-up');
    } else {
      list.style.height = "0";
      list.classList.remove("open");
      open_icon.classList.remove('fa-chevron-up');
      open_icon.classList.add('fa-chevron-down');
    }
  };
}
/*OPEN&CLOSE LIST IN MENU*/

/*SCROLL FUNCTION*/
(function(){
  /*BODY*/
  // var prevScrollpos = window.scrollY;
  // window.onscroll = function() {
  // var currentScrollPos = window.scrollY;
  //   if (prevScrollpos > currentScrollPos) {
  //     // document.querySelector(".header").position = "sticky";
  //     document.querySelector(".header").style.top = "0";
  //     document.querySelector("h1.button-open").style.transform = "scaleX(1.4) translateY(0)";
  //     document.querySelector(".menu").style.height = screen.height+'px';
  //     document.querySelector(".menu").style.top = screen.height*0.1+'px';
  //   } else {
  //     // document.querySelector(".header").position = "fixed";
  //     let str = String(- screen.height*0.1);
  //     document.querySelector(".header").style.top = str+'px';
  //     document.querySelector("h1.button-open").style.transform = 'scaleX(1.4) translateY('+str+'px)';
  //     document.querySelector(".menu").style.height = screen.height*0.9+"px";
  //     document.querySelector(".menu").style.top = "0";
  //   }
  //   prevScrollpos = currentScrollPos;
  // }
  /*END BODY*/

  /*MENU*/
  document.querySelector('.menu').onscroll=function(event){
    event.stopPropagation();
  };
  /*END MENU*/
})();
/*END SCROLL FUNCTION*/

/*HANDLING INPUT*/
  /*INPUT IN MENU*/
  function findValueInList(value, ii) {
    let childOfList = document.querySelectorAll('#list'+ii+' a.sub-item');
    if(value.length == 0 || value=='' || value==null || value==undefined) {
      for(let i=0; i<childOfList.length; i++) {
        childOfList[i].style.display = "block";
      } 
    } else {
      for(let i=0; i<childOfList.length; i++) {
          if(childOfList[i].innerHTML.toLowerCase().includes(value.toLowerCase()) == false) {
            childOfList[i].style.display = "none";
          } else {
            childOfList[i].style.display = "block";
          }
      }    
    }
  }
  let inputOfLists = document.querySelectorAll('.hidden-list input'); 
  for (let i=0; i<inputOfLists.length; i++) {
    inputOfLists[i].addEventListener('keyup', 
      function(event) {
        let value = event.target.value;
        findValueInList(value, i+1);    
      }
    );
  }
  /*END INPUT IN MENU*/

  /*INPUT FOR SEARCH BOX*/
  function hideRB() {
    setTimeout(
      function(){
        document.querySelector('.result-box').style.display = 'none';
      }, 200);
  }
  function showRB() {
    let resultBox = document.querySelector('.result-box');
    if(resultBox.value != '') {
      resultBox.style.display = 'block';
    }
  }
  let searchBox = document.querySelector('input#input');
  searchBox.onblur = hideRB;
  searchBox.addEventListener('keyup', function() {
    if(this.value=='') {
      hideRB();
    } else {
      showRB();
    }
  });
  searchBox.onclick = showRB;
  /*END INPUT FOR SEARCH BOX*/
/*END HANDLING INPUT*/

/*HANDLING HOVER*/
/*END HANDLING HOVER*/
