'use strict'

document.querySelector('#remove').remove();

console.time('Build html time');
  /*SHARED VIEWS*/{
    document.querySelector('.header').innerHTML = window.sharedView.headerContent;
    document.querySelector('.model-container').innerHTML = window.sharedView.modelContent;
    document.querySelector('.footer-content').innerHTML = window.sharedView.footerContent;
    document.querySelector('.menu').innerHTML = window.sharedView.menuContent;
    document.querySelector('.hidden-data-container').innerHTML = window.sharedView.hiddenDataContent;
  }/*SHARED VIEWS*/
  /*HOME VIEWS*/{
    document.querySelector('.message').innerHTML = window.homeView.messageContent;
    document.querySelector('.content .grid-container').innerHTML = window.homeView.dataContent;
    document.querySelector('.pagination-body').innerHTML = window.homeView.paginationContent;
  }/*HOME VIEWS*/
console.timeEnd('Build html time');

console.time('Build actions time');
  /*SHARED SETTING FUNCTIONS*/{
    window.settingfs.updateLightModeButton();
    document.querySelector('h1.button-open').addEventListener('click', window.settingfs.changeMenu);
    document.querySelector('.close-menu-button').addEventListener('click', window.settingfs.closeMenu);
    document.querySelector('.fullscreen-button').addEventListener('click', window.settingfs.toggleFullscreen);

    document.querySelector('.back-item').addEventListener('click', () => {window.history.back()});
    document.querySelector('.reload-item').addEventListener('click', () => {window.location.reload()});
    document.querySelector('.forward-item').addEventListener('click', () => {window.history.forward()});
    
    document.querySelector('.light-mode-button').addEventListener('click', window.settingfs.changeLightMode);
    document.querySelector('.close-model-btn').addEventListener('click', window.settingfs.closeModel);
    document.querySelector('.open-model-btn').addEventListener('click', window.settingfs.openModel);
    window.addEventListener('touchstart', window.mobileActions.touchStartHandle);
    window.addEventListener('touchmove', window.mobileActions.touchMoveHandle);
    window.addEventListener('touchend', window.mobileActions.touchEndHandle);
    // window.addEventListener('mousedown', window.mouseActions.mouseDownHandle);
    // window.addEventListener('mousemove', window.mouseActions.mouseMoveHandle);
    // window.addEventListener('mouseup', window.mouseActions.mouseUpHandle);
    // window.addEventListener('dblclick', window.settingfs.changeMenu);
  }/*SHARED SETTING FUNCTIONS*/
  /*SHARED ACTION*/{
    document.querySelectorAll('.list-open-button').forEach((button)=>{
      button.addEventListener('click', ()=>{
        window.sharedActions.changeListInMenu(button.dataset.labelOf);
      })
    });
    document.querySelectorAll('.hidden-list input').forEach((input)=>{
      input.addEventListener('input', ()=>{
        window.sharedActions.searchInList(input.parentElement.id, input.value);
      })
    });
    document.querySelectorAll('.model-btn').forEach((button)=>{
      button.addEventListener('click', ()=>{
        window.sharedActions.gacha(Number(button.dataset.count));
      });
    });
    let searchBox = document.querySelector('input#input.search-input'); {
      searchBox.addEventListener('blur', window.settingfs.hideRB);
      searchBox.addEventListener('keyup', ()=>{
        window.sharedActions.searchInHeader(searchBox.value);
      });
      searchBox.addEventListener('click', window.settingfs.showRB);
      searchBox.addEventListener('focus', ()=>{
        document.querySelector('body').addEventListener('keyup', window.sharedActions.getEnter);
      });
      searchBox.addEventListener('blur', ()=>{
        document.querySelector('body').removeEventListener('keyup', window.sharedActions.getEnter);
      });    
    }
    document.querySelector('div.search-icon').addEventListener('click', window.sharedActions.clickBtnSearch);
    window.sharedActions.addTrackGridAction();
  }/*SHARED ACTION*/
console.timeEnd('Build actions time');

window.addEventListener('load', ()=>{
  const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
  console.log(`Loading time: ${loadTime} ms`);
});
