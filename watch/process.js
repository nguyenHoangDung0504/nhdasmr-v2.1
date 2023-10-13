var id_vid = urlParams.get("code");
if(!id_vid) {
  window.history.back();
} 

function buildIframe() {
  document.querySelector('#vid_frame').src = 'https://nhdasmr-v4.glitch.me/alt-player/?code='+id_vid;
}