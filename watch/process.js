var id_vid = urlParams.get("code");
if(!id_vid) {
  window.history.back();
} 

function buildIframeAndContent() {
  let index = database.code.indexOf(Number(id_vid));
  document.querySelector('#vid_frame').src = 'https://nhdasmr-v4.glitch.me/alt-player/?code='+id_vid;
  let name = document.querySelector('#track_name');
  let cv = document.querySelector('#track_list_cv');
  let tag = document.querySelector('#track_list_tag');
  let data = databaseTypeObject[index];
  name.innerHTML = '<b>'+data.rjCode+'</b> - '+data.engName+'<br>(Original Name: '+data.japName+')';
  
  let cvString = (data.cvs.length>1)?'CVs: ':'CV: ';
  for(let i=0; i<data.cvs.length; i++) {
    if(i<data.cvs.length-1) {
      cvString += '<a class="cv" href="https://nhdasmr-v4.glitch.me/?cv='+data.cvs[i]+'">'+data.cvs[i]+'</a>, ';
    } else {
      cvString += '<a class="cv" href="https://nhdasmr-v4.glitch.me/?cv='+data.cvs[i]+'">'+data.cvs[i]+'</a>';
    }
  }
  cv.innerHTML = cvString;
  
  let tagString = 'Tags: ';
  for(let i=0; i<data.tags.length; i++) {
    if(i<data.tags.length-1) {
      tagString += '<a class="hover" href="https://nhdasmr-v4.glitch.me/?tag='+data.tags[i]+'">'+data.tags[i]+'</a>, ';
    } else {
      tagString += '<a class="hover" href="https://nhdasmr-v4.glitch.me/?tag='+data.tags[i]+'">'+data.tags[i]+'</a>';
    }
  }
  tag.innerHTML = tagString; 
}

function buildListRandom() {
  let container = document.querySelector('#random-post');
  let dataToInner = '';
  let listData = dataProcessing.getRandomDataFrom(databaseTypeObject, 7);
  for(let i=0; i<listData.length; i++) {
    let track = listData[i];
    dataToInner += '<a href="https://nhdasmr-v4.glitch.me/watch?code='+track.code+'"><img src="'+track.thumbnail+'" alt="thumbnail of '+track.code+'">'
                    +'<div class="text-box"><p class="content"><b>'+track.rjCode+'</b> - '+track.engName+'</p></div>'
                    +'</a>'; 
  }
  container.innerHTML = dataToInner;
}

function buildListCvRandom() {
  let container = document.querySelector('div.content_div');
  let index = database.code.indexOf(Number(id_vid));
  let data = databaseTypeObject[index];
  let dataToInner = '';
  for(let i=0; i<data.cvs.length; i++) {
    let cv = data.cvs[i];
    let dataToInner1 = '<br><h2>CV: <span class="cv">'+cv+'</span></h2><div>';
    let listdata = dataProcessing.getRandomDataFrom(convertListDataType(dataProcessing.getDataAdvance(cv, '')), 4);
    for(let j=0; j<listdata.length; j++) {
      let track = listdata[j];
      dataToInner1 += '<a href="https://nhdasmr-v4.glitch.me/watch?code='+track.code+'"><img src="'+track.thumbnail+'" alt="thumbnail of '+track.code+'">'
                    +'<div class="text-box"><p class="content"><b>'+track.rjCode+'</b> - '+track.engName+'</p></div>'
                    +'</a>';
    }
    dataToInner1 += '</div>'
    dataToInner += dataToInner1;
  }
  container.innerHTML += dataToInner;
}