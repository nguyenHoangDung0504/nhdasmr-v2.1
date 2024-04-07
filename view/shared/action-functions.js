'use strict'
console.time('Build action functions time');
window.sharedActions = {
  addTrackGridAction: '',
  listInMenuIsOpen: '',
  openListInMenu: '',
  closeListInMenu: '',
  changeListInMenu: '',
  closeAllListExcept: '',
  gacha: '',
  searchInList: '',
  clearAllInputInList: '',
  searchInHeader: '',
  developerSearch: '',
  clickBtnSearch: '',
  getEnter: ''
}

window.sharedActions.addTrackGridAction = (rootSelector = '.content', different = null)=>{
  if(window.settingfs.isMobile() || screen.width <= 780)
    return;

  let elements;
  if(different) {
    elements = document.querySelectorAll('.post-box a');
  } else {
    elements = document.querySelectorAll(rootSelector+' .grid-container .grid-item');
  }
  
  let timeOut = 400;
  elements.forEach((element)=>{
    if(element.dataset.addedAction == 'true')
      return;
    
    let code = element.dataset.code;
    let obj = document.querySelector(`#hidden_info_of_${code}`);
    let actionBox = element.querySelector('.image-container') //element.querySelector('.text-container') || element.querySelector('.text-box');
    let timeoutId;
    
    actionBox.addEventListener('mouseenter', () => {
      timeoutId = setTimeout(() => {
        obj.style.opacity = '1';
      }, timeOut);
      const x = event.clientX;
      const y = event.clientY;
      obj.style.left = ((x <= -30 + screen.width - obj.offsetWidth) ? x : (x - obj.offsetWidth))+"px";
      obj.style.top = ((y <= screen.height - obj.offsetHeight) ? y : (y - obj.offsetHeight)) + "px";
    });
    actionBox.addEventListener('mouseleave', () => { 
      clearTimeout(timeoutId);
      obj.style.opacity = '0';
    });
    actionBox.addEventListener('mousemove', () => {
      const x = event.clientX;
      const y = event.clientY;
      obj.style.left = ((x <= -30 + screen.width - obj.offsetWidth) ? x : (x - obj.offsetWidth))+"px";
      obj.style.top = ((y <= screen.height - obj.offsetHeight) ? y : (y - obj.offsetHeight)) + "px";
    });
    element.dataset.addedAction = 'true';
  })
}
window.sharedActions.listInMenuIsOpen = (listId)=>{
  return (Array.from(document.querySelector(`#${listId}`).classList)
        .indexOf('opened') != -1) ? true:false;
}
window.sharedActions.openListInMenu = (listId)=>{
  if(window.sharedActions.listInMenuIsOpen(listId)==true)
    return;
  document.querySelector(`#${listId}`).classList.add('opened');
  document.querySelector(`[data-label-of="${listId}"]`).querySelector('.fas').classList.remove('fa-chevron-down');
  document.querySelector(`[data-label-of="${listId}"]`).querySelector('.fas').classList.add('fa-chevron-up');
  window.sharedActions.closeAllListExcept(listId);
}
window.sharedActions.closeListInMenu = (listId)=>{
  if(window.sharedActions.listInMenuIsOpen(listId)==false)
    return;
  document.querySelector(`#${listId}`).classList.remove('opened');
  document.querySelector(`[data-label-of="${listId}"]`).querySelector('.fas').classList.remove('fa-chevron-up');
  document.querySelector(`[data-label-of="${listId}"]`).querySelector('.fas').classList.add('fa-chevron-down');
  window.sharedActions.clearAllInputInList();
}
window.sharedActions.changeListInMenu = (listId)=>{
  window.sharedActions.listInMenuIsOpen(listId)==true 
    ? window.sharedActions.closeListInMenu(listId)
    : window.sharedActions.openListInMenu(listId);
}
window.sharedActions.closeAllListExcept = (listId)=>{
  document.querySelectorAll(`.hidden-list:not(#${listId})`).forEach((hiddenList)=>{
    window.sharedActions.closeListInMenu(hiddenList.id);
  })
}
window.sharedActions.gacha = (count)=>{
  let html = '',
      data = window.databasefs.getRandomTracks(window.database.listTrack, count);
  data.forEach((track)=>{
    html += track.getDisplayCellHtml();
  })
  document.querySelector('.model-content .grid-container').innerHTML = html;
  window.sharedActions.addTrackGridAction('.model-content');
  document.querySelector('.model-content').scrollTop = '0';
  let results = document.querySelectorAll('.model-content .grid-container .grid-item');
  let end = results.length;
  for(let i=0; i<end; i++) {
    setTimeout(()=>{
      results[i].style.opacity = "1";
    }, (i+1)*100);
  }
}
window.sharedActions.searchInList = (listId, keyWord)=>{
  let listOfDataBox = document.querySelectorAll(`#${listId} a.sub-item`);
  if(keyWord.length == 0 || keyWord=='' || keyWord==null || keyWord==undefined) {
    listOfDataBox.forEach((dataBox)=>{
      dataBox.style.display = "block";
      dataBox.innerHTML = window.utils.removeHighlight(dataBox.innerHTML);
    });
    return;
  }
  listOfDataBox.forEach((dataBox)=>{
    if(dataBox.textContent.toLowerCase().includes(keyWord.toLowerCase())) {
      dataBox.style.display = "block";
      dataBox.innerHTML = window.utils.removeHighlight(dataBox.innerHTML);
      dataBox.querySelector('.hover').innerHTML = window.utils.highlight(dataBox.querySelector('.hover').innerHTML, keyWord);
    } else {
      dataBox.style.display = "none";
    }
  });
}
window.sharedActions.clearAllInputInList = ()=>{
  let inputOfLists = document.querySelectorAll('.hidden-list input'); 
  for(let i=0; i<inputOfLists.length; i++) {
    inputOfLists[i].value = '';
  }
  let childOfList = document.querySelectorAll('a.sub-item');
  for(let i=0; i<childOfList.length; i++) {
    childOfList[i].style.display = "block";
    childOfList[i].innerHTML = window.utils.removeHighlight(childOfList[i].innerHTML);
  }
}
window.sharedActions.searchInHeader = (value)=>{
  if(value=='') {
    document.querySelector('.result-box').innerHTML = '';
    window.settingfs.hideRB();
  } else {
    let resultBox = document.querySelector('.result-box');
    if(value.includes('@')) {
      resultBox.innerHTML = `
      <a href="../?search=@n"><span style="color: #00BFFF;">►</span><strong>@n</strong>: <span class="cnt">View newest tracks</span></a>
      <a href="../develop/list-code"><span style="color: #00BFFF;">►</span><strong>@lc or @listcode</strong>: <span class="cnt">View list code</span></a>
      <a href="../develop/data-capacity"><span style="color: #00BFFF;">►</span><strong>@dc or @datacapacity</strong>: <span class="cnt">View data capacity</span></a>
      <a href="https://japaneseasmr.com/"><span style="color: #00BFFF;">►</span><strong>@ja</strong>: <span class="cnt">Japanese ASMR</span></a>
      <a href="https://www.asmr.one/works"><span style="color: #00BFFF;">►</span><strong>@ao</strong>: <span class="cnt">ASMR ONE</span></a>
      `.trim();
      window.settingfs.showRB();
    } else {
      let suggestions = window.databasefs.getSearchSuggestions(value);
      if(suggestions.length == 0) {
        resultBox.innerHTML = `<a style="text-align:center;">-No Result-</a>`;
      } else {
        let innerData = ``;
        for(let i=0; i<suggestions.length; i++) {
          innerData += suggestions[i].getSRHtml();
        }
        resultBox.innerHTML = innerData;
      }
      window.settingfs.showRB();
    }
  }
}
window.sharedActions.developerSearch = (value)=>{
  let active = false;
  if(value.indexOf('@') == -1)
    return false
  const options = ['lc', 'listcode', 'dc', 'datacapacity', 'ja', 'ao']
  const links = [
    '../develop/list-code', '../develop/list-code', '../develop/data-capacity', '../develop/data-capacity',
    'https://japaneseasmr.com/', 'https://www.asmr.one/works'
  ]
  let optionBeforeSplit = value
  let optionAfterSplit = optionBeforeSplit.split('-')
  let option = options.indexOf(optionAfterSplit[0].replaceAll('@', ''))
  if(option != -1) {
    active = true;
    optionAfterSplit[1]=='b' 
      ? window.open(links[option], '_blank')
      : window.location = links[option]
  }
  return active;
}
window.sharedActions.clickBtnSearch = ()=>{
  let search = document.querySelector('input#input.search-input').value;
  if(search) {
    document.querySelector('input#input.search-input').value = '';
    if(!window.sharedActions.developerSearch(search)) {
      window.location = `..?search=${search}`;
    } 
  }
}
window.sharedActions.getEnter = (event)=>{
  if (event.key == 'Enter') {
    let search = document.querySelector('input#input.search-input').value;
    if(search) {
      document.querySelector('input#input.search-input').value = '';
      if(!window.sharedActions.developerSearch(search)) {
        window.location = `..?search=${search}`;
      }
    }
  }    
}
console.timeEnd('Build action functions time');