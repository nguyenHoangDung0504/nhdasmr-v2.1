/*OPEN&CLOSE MENU*/
function isOpenMenu() {
    let body = document.querySelector('body');
    return (Array.from(body.classList).indexOf('openMenu') != -1) ?true:false;
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
/*END OPEN&CLOSE MENU*/

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
  document.querySelector('.menu').scrollTop=0;
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
