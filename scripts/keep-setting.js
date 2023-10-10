function isLightMode() {
    let body = document.querySelector('body');
    return (Array.from(body.classList).indexOf('lightMode') != -1) ?true:false;   
}
function settingLightModeButton() {
  let button = document.querySelector(".light-mode-button");
  
  if(isLightMode()==false){
    button.innerHTML = "Light: <span style=\"color: red\">Turned Off</span>";
  } else {
    button.innerHTML = "Light: <span style=\"color: green\">Turned On</span>";
  }
  
  button.onclick=function(){
      let body = document.querySelector('body');
      if(isLightMode()==false){
          body.classList.add('lightMode');
          this.innerHTML = "Light: <span style=\"color: green\">Turned On</span>";
          localStorage.setItem('lightMode', 'on');
      } else {
          body.classList.remove('lightMode');  
          this.innerHTML = "Light: <span style=\"color: red\">Turned Off</span>";
          localStorage.removeItem('lightMode');
      }  
  } 
}

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