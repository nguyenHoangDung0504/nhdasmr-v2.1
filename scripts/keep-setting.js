
function turnOnLightMode(){
  sessionStorage.setItem('lightMode', 'on');
  document.querySelector('body').classList.add('lightMode'); 
}
if(sessionStorage.getItem('lightMode')){
  turnOnLightMode();
}
if(sessionStorage.getItem('menuIs')){
  document.querySelector('body').classList.add('openMenu');
}