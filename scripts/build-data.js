/*HANDLING DATA*/
const urlParams = new URLSearchParams(window.location.search);
// Lấy giá trị của một tham số cụ thể
var page = urlParams.get('page');
let linkToProcess = "?";
if(urlParams.get('s') && !urlParams.get('tag') && !urlParams.get('cv')) {
  linkToProcess = "?s="+urlParams.get('s')+"&";
} else if(!urlParams.get('s') && !urlParams.get('tag') && urlParams.get('cv')) {
  linkToProcess = "?cv="+urlParams.get('cv')+"&";
} else if(!urlParams.get('s') && urlParams.get('tag') && !urlParams.get('cv')) {
  linkToProcess = "?tag="+urlParams.get('tag')+"&";
}

let numberpage;
let listOfData = [];
let listDataToInner = [];
let message = 'NHD Hentai - List of ASMR Hentai';

if(!urlParams.get('s') && !urlParams.get('tag') && !urlParams.get('cv') && !urlParams.get('random')) {
   listOfData = dataProcessing.separateData(databaseTypeObject);
   numberpage = listOfData.length;
} else if(!urlParams.get('s') && !urlParams.get('tag') && urlParams.get('cv') && !urlParams.get('random')) {
   let listFinded = convertListDataType(dataProcessing.getDataAdvance(urlParams.get('cv'), ''));
   let sl = listFinded.length;
   listOfData = dataProcessing.separateData(listFinded);
   numberpage = listOfData.length;
   message = '<b>CV</b>: <span class="cv">'+urlParams.get('cv')+'</span> ('+sl+')';
} else if(!urlParams.get('s') && urlParams.get('tag') && !urlParams.get('cv') && !urlParams.get('random')) {
   let listFinded = convertListDataType(dataProcessing.getDataAdvance('', urlParams.get('tag')));
   let sl = listFinded.length;
   listOfData = dataProcessing.separateData(listFinded);
   numberpage = listOfData.length;
   message = '<b>Tag</b>: <span class="tag">'+urlParams.get('tag')+'</span> ('+sl+')';
} else if(!urlParams.get('s') && !urlParams.get('tag') && !urlParams.get('cv') && urlParams.get('random')) {
  let sl = Number(urlParams.get('random'));
  let listFinded = dataProcessing.getRandomDataFrom(databaseTypeObject, sl); 
  listOfData = dataProcessing.separateData(listFinded);
  numberpage = listOfData.length;
  message = 'Random '+sl+' Track';
} else if(urlParams.get('s') && !urlParams.get('tag') && !urlParams.get('cv') && !urlParams.get('random')) {
  let listFinded = dataProcessing.findData(urlParams.get('s'));
  if(listFinded != null) {
    listOfData = dataProcessing.separateData(listFinded);
    numberpage = listOfData.length;
    message = 'Search Results: '+urlParams.get('s')+' ('+listFinded.length+')';    
  } else {
    numberpage = 0;
    message = 'No Result';
  }
}

if(page && (page<1 || page>numberpage)) {
  alert("Page not found!");
  window.location = linkToProcess+"page=1";
}

function buildListData() {
  console.time('build_list_data_time');
  if(!page){
    page = 1;
  }
  let dataToInner = '';
  let hiddenData = '';
  listDataToInner = listOfData[page-1];
  for(let i=0; i<listDataToInner.length; i++){
    let track = listDataToInner[i];
    let cv_string = '<br>CV';
    if(track.cvs.length>1){cv_string+='s';}
    cv_string += ': '
    for(let j=0; j<track.cvs.length; j++) {
      if(j<track.cvs.length-1) {//event.stopPropagation()   ?cv='+track.cvs[j]+'
        cv_string += '<a class=cv onclick="" href="?cv='+track.cvs[j]+'">'+track.cvs[j]+'</a>, ';
      } else if(j==track.cvs.length-1) {
        cv_string += '<a class=cv onclick="" href="?cv='+track.cvs[j]+'">'+track.cvs[j]+'</a>';
      }
    }
    let tag_string = 'Tags: ';
    for(let j=0; j<track.tags.length; j++) {
      if(j<track.tags.length-1) {
        tag_string += track.tags[j]+', ';
      } else if(j==track.tags.length-1) {
        tag_string += track.tags[j];
      }
    }
    dataToInner += '<div class="grid-item" id="'+track.code+'">'+
                      '<div class="image-container">'+
                        '<a href="/watch?code='+track.code+'"><img loading="lazy" src="'+track.thumbnail+'" alt="thumbnail of '+track.code+'"/></a>'+
                      '</div>'+
                      '<div class="flex-container">'+
                        '<div class="text-container"><a href="/watch?code='+track.code+'">'+
                          '<p class="multiline-ellipsis">'+'<b><i>'+track.rjCode+'</i></b> - '+track.engName+'</p>'+
                        '</a></div>'+
                        '<div class="text-container">'+
                          '<p class="singleline-ellipsis">'+cv_string+'</p>'+
                        '</div>'+
                      '</div>'+
                  '</div>';
    hiddenData += '<div class="hidden-info" id="hidden_info_of_'+track.code+'">'
                    +'<img src="'+track.thumbnail+'" alt="thumbnail of "'+track.code+'>'
                    +'<h3>'+track.engName+'</h3>'
                    +'<h3>'+cv_string+'</h3>'
                    +'<h3>'+tag_string+'</h3>'
                  +'</div>';
  }
  document.querySelector('.content .grid-container').innerHTML = dataToInner;
  document.querySelector('.menu').innerHTML += hiddenData; 
  console.timeEnd('build_list_data_time');
}

function buildActionData() {
  console.time('build_mouse_action');
  let elements = document.querySelectorAll('.grid-container .grid-item');
  console.log(elements);
  for(let i=0; i < elements.length; i++) {
    let element = elements[i];
    let code = element.id;
    let obj = document.querySelector('#hidden_info_of_'+code);
    console.log(obj);
    
    element.addEventListener('mouseenter', () => {
      obj.style.display = 'block';
    });

    element.addEventListener('mouseleave', () => {
      obj.style.display = 'none';
    });

    // Gắn sự kiện khi chuột di chuyển trong element
    element.addEventListener('mousemove', (event) => {
      const x = event.clientX;
      const y = event.clientY;
      if(x >= screen.width - obj.offSetWidth) {
        obj.style.left = x+"px";
      } else {
        obj.style.left = (x-+"px";
      }
      obj.style.top = y+"px";
    });
  }
  console.timeEnd('build_mouse_action');
}

function buildPagination() {
  let firstlink = document.getElementById('first-link');
  let prelink = document.getElementById('previous-link');
  let link1 = document.getElementById('link1');
  let link2 = document.getElementById('link2');
  let link3 = document.getElementById('link3');
  let link4 = document.getElementById('link4');
  let nextlink = document.getElementById('next-link');
  let lastlink = document.getElementById('last-link');
  let links = [0, link1, link2, link3, link4];
  let links2 = [firstlink, prelink, link1, link2, link3, link4, nextlink, lastlink];
  
  if(numberpage<1) {
    links2.forEach(element => {
      element.style.display = 'none';
    });
    return;
  }
  if(!page || page<1){
    page = 1;
  } else if(page>numberpage) {
    page = numberpage;
  }

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

function buildListCv() {
  let container = document.querySelector('div.hidden-list#list1');
  let dataToInner = '<input type="text" id="input-of-hidden-list-1" placeholder="Find...">';
  for(let i=0; i<listToFilter.cvs.length; i++) {
    dataToInner += '<a class="sub-item" href="https://nhdasmr-v2.glitch.me/?cv='+listToFilter.cvs[i]+'"><span style="color: red;">❤</span> <span class="hover">'+listToFilter.cvs[i]+'</span></a>';
  }
  container.innerHTML = dataToInner;
}
function buildListTag() {
  let container = document.querySelector('div.hidden-list#list2');
  let dataToInner = '<input type="text" id="input-of-hidden-list-2" placeholder="Find...">';
  for(let i=0; i<listToFilter.tags.length; i++) {
    dataToInner += '<a class="sub-item" href="https://nhdasmr-v2.glitch.me/?tag='+listToFilter.tags[i]+'"><span style="color: #00BFFF;">►</span> <span class="hover">'+listToFilter.tags[i]+'</span></a>';
  }
  container.innerHTML = dataToInner;
}


// Lấy tất cả các tham số và giá trị
// const allParams = {};
// for (const param of urlParams) {
//   allParams[param[0]] = param[1];
// }
// console.log(allParams);
/*END HANDLING DATA*/