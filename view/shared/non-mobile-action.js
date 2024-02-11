'use strict'

window.mouseActions = {
  isDragging: false,
  startY: 0,
  startX: 0,
  currentX: 0,
  startY: 0,
  currentY: 0,
  diffX: 0,
  diffY: 0,
  mouseDownHandle: '',
  mouseMoveHandle: '',
  mouseUpHandle: ''
};

window.mouseActions.mouseDownHandle = (event) => {
  window.mouseActions.startX = event.clientX;
  window.mouseActions.currentX = window.mouseActions.startX;
  window.mouseActions.startY = event.clientY;
  window.mouseActions.currentY = window.mouseActions.startY;
};
window.mouseActions.mouseMoveHandle = (event) => {
  window.mouseActions.currentX = event.clientX;
  window.mouseActions.currentY = event.clientY;
  window.mouseActions.diffX = window.mouseActions.currentX - window.mouseActions.startX;
  window.mouseActions.diffY = window.mouseActions.currentY - window.mouseActions.startY;
};
window.mouseActions.mouseUpHandle = (event) => {
  if ((window.mouseActions.diffX > 20) && (Math.abs(window.mouseActions.diffY) < 30)) {
    window.settingfs.openMenu();
  } else if ((window.mouseActions.diffX < -20) && (Math.abs(window.mouseActions.diffY) < 30)) {
    window.settingfs.closeMenu();
  }
};

// window.addEventListener('mousedown', (event) => {
//   window.mouseActions.isDragging = true;
//   window.mouseActions.startY = event.clientY;
// });

// window.addEventListener('mousemove', (event) => {
//   if (window.mouseActions.isDragging) {
//     const deltaY = event.clientY - window.mouseActions.startY;
//     window.scrollBy(0, -deltaY);
//     window.mouseActions.startY = event.clientY;
//   }
// });

// window.addEventListener('mouseup', () => {
//   window.mouseActions.isDragging = false;
// });
