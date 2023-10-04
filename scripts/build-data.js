/*HANDLING DATA*/
const urlParams = new URLSearchParams(window.location.search);
// Lấy giá trị của một tham số cụ thể
var page = urlParams.get('page');
let linkToProcess = "?";
if(urlParams.get('s') && !urlParams.get('tag') && !urlParams.get('cv')) {
  linkToProcess = "?s="+urlParams.get('s')+"&";
} else if(!urlParams.get('s') && !urlParams.get('tag') && urlParams.get('cv')) {
  linkToProcess = "?cv="+urlParams.get('cv')+"&";
}

let numberpage;
let listOfData = [];
let listDataToInner = [];
let message = '';

if(!urlParams.get('s') && !urlParams.get('tag') && !urlParams.get('cv')) {
   listOfData = dataProcessing.separateData(databaseTypeObject);
   numberpage = listOfData.length;
} else if(!urlParams.get('s') && !urlParams.get('tag') && urlParams.get('cv')) {
   listOfData = dataProcessing.separateData(dataProcessing.findData(urlParams.get('cv')));
   numberpage = listOfData.length;
   message = 'CV: '+urlParams.get('cv');
}

function buildListData() {
  if(!page || page<1){
    page = 1;
  }
  let dataToInner = '';
  listDataToInner = listOfData[page-1];
  for(let i=0; i<listDataToInner.length; i++){
    let track = listDataToInner[i];
    let cv_string = '';
    for(let j=0; j<track.cvs.length; j++) {
      if(j<track.cvs.length-1) {//event.stopPropagation()   ?cv='+track.cvs[j]+'
        cv_string += '<a class=cv onclick="" href="">'+track.cvs[j]+'</a>, ';
      } else if(j==track.cvs.length-1) {
        cv_string += '<a class=cv onclick="" href="">'+track.cvs[j]+'</a>';
      }
    }
    if(i==1){console.log(cv_string)}
    dataToInner += '<a href="/watch?code='+track.code+'" class="grid-item">'+
                      '<div class="image-container">'+
                          '<img loading="lazy" src="'+track.thumbnail+'" alt="thumbnail'+track.code+'" />'+
                      '</div>'+
                      '<div class="flex-container">'+
                          '<div class="text-container">'+
                              '<p class="multiline-ellipsis">'+track.engName+'</p>'+
                          '</div>'+
                          '<div class="text-container">'+
                              '<p class="singleline-ellipsis">'+cv_string+'</p>'+
                          '</div>'+
                      '</div>'+
                  '</a>';
    dataT
    if(i==1){console.log(dataToInner);}
  }
  document.querySelector('.content .grid-container').innerHTML = dataToInner;
}

function buildPagination() {
  if(numberpage<1) {return;}
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
}









// Lấy tất cả các tham số và giá trị
const allParams = {};
for (const param of urlParams) {
  allParams[param[0]] = param[1];
}
console.log(allParams);
/*END HANDLING DATA*/
