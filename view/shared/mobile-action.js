'use strict'

console.time('Build mobile action functions time');
window.mobileActions = {
  startX: 0,
  currentX: 0,
  startY: 0,
  currentY: 0,
  diffX: 0,
  diffY: 0,
  touchStartHandle: '',
  touchMoveHandle: '',
  touchEndHandle: ''
}

window.mobileActions.touchStartHandle = (event)=>{
  if (event.touches.length === 1) {
    window.mobileActions.startX = event.touches[0].clientX;
    window.mobileActions.currentX = window.mobileActions.startX;
    window.mobileActions.startY = event.touches[0].clientY;
    window.mobileActions.currentY = window.mobileActions.startY;
  }
}
window.mobileActions.touchMoveHandle = (event)=>{
  if (event.touches.length === 1) {
    window.mobileActions.currentX = event.touches[0].clientX;
    window.mobileActions.currentY = event.touches[0].clientY;
    window.mobileActions.diffX = window.mobileActions.currentX - window.mobileActions.startX;
    window.mobileActions.diffY = window.mobileActions.currentY - window.mobileActions.startY;
  }
}
window.mobileActions.touchEndHandle = (event)=>{
  if (event.changedTouches.length === 1) {
    if ((window.mobileActions.diffX > 20) && (Math.abs(window.mobileActions.diffY) < 20)) {
      window.settingfs.openMenu()
    } else if ((window.mobileActions.diffX < -20) && (Math.abs(window.mobileActions.diffY) < 20)) {
      window.settingfs.closeMenu()
    }    
  }
}
console.timeEnd('Build mobile action functions time');