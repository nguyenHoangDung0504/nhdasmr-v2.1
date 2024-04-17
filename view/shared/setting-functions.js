'use strict'

//Send status
parent.postMessage({ type: 'urlChange', version: 2.1, url: window.location.href }, '*');
setInterval(()=>{
  parent.postMessage({ type: 'alive' }, '*');
}, 2000);
window.addEventListener('beforeunload', event => {
  parent.postMessage({ type: 'beforeUnload' }, '*');
});

console.time('Build setting functions time');
window.settingfs = {
  isOpenMenu: 'Kiểm tra menu mở hay đóng',
  isMobile: 'Kiểm tra thiết bị có phải mobile không',
  isHomePage: 'Kiểm tra xem có đang ở trang chủ không',
  openMenu: 'Mở menu',
  closeMenu: 'Đóng menu',
  menuStatusStorageIsOpen: 'Kiểm tra trạng thái menu đang được lưu',
  openMenuAtFirst: 'Mở menu trước tiên (áp dụng cho trang web trên PC)',
  changeMenu: 'Đảo trạng thái menu',
  isLightMode: 'Kiểm tra light mode mở hay đóng',
  updateLightModeButton: 'Biểu diễn trạng thái light mode trên nút',
  openLightMode: 'Bật light mode',
  closeLightMode: 'Tắt light mode',
  lightModeStorageIsOn: 'Kiểm tra trạng thái light mode đang được lưu',
  openLightModeAtFirst: 'Mở light mode trước tiên',
  changeLightMode: 'Đảo trạng thái light mode',
  isOpenModel: 'Kiểm tra model mở hay đóng',
  openModel: 'Mở model',
  closeModel: 'Đóng model',
  hideRB: 'Ẩn result box',
  showRB: 'Hiện result box',
  openFullscreen: '',
  closeFullscreen: '',
  toggleFullscreen: ''
}
window.settingfs.isOpenMenu = ()=>{
  let classList = document.querySelector('body').classList;
  let arrClass = Array.from(classList);
    return (arrClass.indexOf('openMenu') != -1) ? true:false;
}
window.settingfs.isMobile = ()=>{
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true:false;
}
window.settingfs.isHomePage = ()=>{
  return (window.location.href.indexOf('/watch') == -1) ? true:false;
}
window.settingfs.openMenu = window.settingfs.isMobile() 
? ()=>{
  if(window.settingfs.isOpenMenu()==true) return;
  document.querySelector('body').classList.add('openMenu');
}
: ()=>{
  if(window.settingfs.isOpenMenu()==true) 
    return;
  document.querySelector('body').classList.add('openMenu');
  if(window.settingfs.isHomePage()) 
    localStorage.setItem('menu-status', 'open');
}
window.settingfs.closeMenu = window.settingfs.isMobile() 
? ()=>{
  if(window.settingfs.isOpenMenu()==false) return;
  document.querySelector('body').classList.remove('openMenu');
}
: ()=>{
  if(window.settingfs.isOpenMenu()==false) 
    return;
  document.querySelector('body').classList.remove('openMenu');
  if(window.settingfs.isHomePage()) 
    localStorage.setItem('menu-status', 'close');
}
window.settingfs.menuStatusStorageIsOpen = ()=>{
  let value = localStorage.getItem('menu-status');
  if(!value || value == 'close') return false;
  if(value == 'open') return true;
}
window.settingfs.openMenuAtFirst = ()=>{
  if(!window.settingfs.isMobile() && window.settingfs.isHomePage()) {
    if(!localStorage.getItem('first')) {
      window.settingfs.openMenu();
      localStorage.setItem('first', 'done');
    }
    if(window.settingfs.menuStatusStorageIsOpen()) {
      window.settingfs.openMenu();
    }
  }
}
window.settingfs.changeMenu = ()=>{
  let isOpen = window.settingfs.isOpenMenu();
  if(isOpen) {
    window.settingfs.closeMenu();
  } else {
    window.settingfs.openMenu();
  }
}
window.settingfs.isLightMode = ()=>{
    return (Array.from(document.querySelector('body').classList)
            .indexOf('lightMode') != -1) ? true:false;   
}
window.settingfs.updateLightModeButton = ()=>{
  document.querySelector(".light-mode-button").innerHTML = window.settingfs.isLightMode() 
    ? 'Light: <span style=\"color: green\">Turned On</span>'
    : 'Light: <span style=\"color: red\">Turned Off</span>';
}
window.settingfs.openLightMode = ()=>{
  if(window.settingfs.isLightMode()==true) return;
  document.querySelector('body').classList.add('lightMode');
  localStorage.setItem('light-status', 'on');
  window.settingfs.updateLightModeButton();
}
window.settingfs.closeLightMode = ()=>{
  if(window.settingfs.isLightMode()==false) return;
  document.querySelector('body').classList.remove('lightMode');
  localStorage.setItem('light-status', 'off');
  window.settingfs.updateLightModeButton();
}
window.settingfs.lightModeStorageIsOn = ()=>{
  let value = localStorage.getItem('light-status');
  if(!value || value == 'off') return false;
  if(value == 'on') return true;
}
window.settingfs.openLightModeAtFirst = ()=>{
  if(window.settingfs.lightModeStorageIsOn()) {
    document.querySelector('body').classList.add('lightMode');
  }
}
window.settingfs.changeLightMode = ()=>{
  window.settingfs.isLightMode() ? window.settingfs.closeLightMode() : window.settingfs.openLightMode();
}
window.settingfs.isOpenModel = ()=>{    
  return (Array.from(document.querySelector('body').classList)
          .indexOf('openModel') != -1) ? true:false;
}
window.settingfs.openModel = ()=>{
  if(window.settingfs.isOpenModel()==true) {
    return;
  }
  document.querySelector('body').classList.add('openModel');
}
window.settingfs.closeModel = ()=>{
  if(window.settingfs.isOpenModel()==false) {
    return;
  } 
  document.querySelector('body').classList.remove('openModel');
}
window.settingfs.hideRB = ()=>{
  setTimeout(()=>{
    document.querySelector('.result-box').style.display = 'none';
  }, 200);
}
window.settingfs.showRB = ()=>{
  let searchBox = document.querySelector('input#input.search-input');
  let resultBox = document.querySelector('.result-box');
  if(searchBox.value) {
    resultBox.style.display = 'block';
  }
}
window.settingfs.openFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}
window.settingfs.closeFullscreen = () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else if (document.webkitFullscreenElement) {
        document.webkitExitFullscreen();
    } else if (document.msFullscreenElement) {
        document.msExitFullscreen();
    }
}
window.settingfs.toggleFullscreen = () => {
  console.log('alo')
  if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
    window.settingfs.openFullscreen();
  } else {
    window.settingfs.closeFullscreen();
  }
}
console.timeEnd('Build setting functions time');