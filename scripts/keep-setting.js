
function turnOnLightMode(){
  localStorage.setItem('lightMode', 'on');
  document.querySelector('body').classList.add('lightMode'); 
}
if(localStorage.getItem('lightMode')){
  turnOnLightMode();
}
if(localStorage.getItem('menuIs')){
  document.querySelector('body').classList.add('openMenu');
}