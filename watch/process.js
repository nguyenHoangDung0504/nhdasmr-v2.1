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
  let cvString = '';
  for() {
    
  }
}