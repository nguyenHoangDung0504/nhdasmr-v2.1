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
  let container = document.querySelector('');
}