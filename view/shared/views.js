'use strict'

window.sharedView = {
  headerContent: '',
  modelContent: '',
  menuContent: '',
  footerContent: '',
  hiddenDataContent: ''
};

//Header------------------------------------------------------------------------------------------------------
{
  let headerImageUrl = `https://cdn.glitch.global/36049008-0c55-496e-873e-a2f971037d73/icon-edited.webp?v=1704340956129`;
  let headerContent =
  `<div class="button-div">
      <h1 class="button-open">&#9776;</h1>
  </div>
  <div class="title-div">
      <a href=".."><h1 class="title"><img src="${headerImageUrl}"> NHD ASMR</h1></a>
  </div>
  <div class="search-div">
      <div class="search-div2">
          <input type="text" class="search-input" id="input" placeholder="Search here..." value="">
          <div class="search-icon"><h1><i class="fas fa-search"></i></h1></div>
      </div>
      <div class="result-box"></div>
  </div>`;
  
  window.sharedView.headerContent = headerContent.replace(/\s+/g, ' ');
};
//Model-------------------------------------------------------------------------------------------------------
{
  let modelContent = 
  `<div class="close-model-btn"><img src="https://cdn.glitch.global/36049008-0c55-496e-873e-a2f971037d73/close-icon.png?v=1705129824932"></div>
  <div class="model-body">
    <div class="model-header"><h3>NHD ASMR - Gacha</h3></div>
    <div class="model-content">
      <div class="grid-container"></div>
    </div>
    <div class="model-footer">
      <div class=""></div>
      <div data-count="1" class="model-btn">Gacha x1</div>
      <div data-count="10" class="model-btn x10btn">Gacha x10</div>
      <!--<div data-count="50" class="model-btn x50btn">Gacha x50</div>-->
      <div class=""></div>
    </div>
  </div>`;
  
  window.sharedView.modelContent = modelContent.replace(/\s+/g, ' ');  
}
//Menu--------------------------------------------------------------------------------------------------------
{
  let listCvStr = `<input type="text" placeholder="Find...">` 
                    + window.buildhtmlfs.buildListCvOrTag ('cv', window.database.listCv), 
      listTagStr = `<input type="text" placeholder="Find...">` 
                    + window.buildhtmlfs.buildListCvOrTag ('tag', window.database.listTag),
      listSortStr = `<a class="sub-item" href="${window.utils.addQuery('sort', 'newest')}"><span style="color: #00BFFF;">►</span>  <span class="hover">Newest (Default)</span></a>`+
                    `<a class="sub-item" href="${window.utils.addQuery('sort', 'oldest')}"><span style="color: #00BFFF;">►</span>  <span class="hover">Oldest</span></a>`;
  
  let menuContent =
  `<a class="title"><h1>NHD ASMR - Menu</h1></a>
  <a class="menu-item close-menu-button" href="javascript:void(0)">Close Menu</a>
  <a class="menu-item direct-items">
    Directions:
    <div class="item back-item" title="Back"><i class="fa fa-arrow-left" aria-hidden="true"></i></div>
    <div class="item reload-item" title="Reload"><i class="fa fa-refresh" aria-hidden="true"></i></div>
    <div class="item forward-item" title="Forward"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>
  </a>
  <a class="menu-item fullscreen-button" href="javascript:void(0)" style="display: none;">Toggle Full Screen</a>
  <a class="menu-item light-mode-button" href="javascript:void(0)"></a>
  <a href="javascript:void(0);" class="menu-item">Advance Search 🔎</a>

  <a data-label-of="cvs-hidden-list" class="menu-item list-open-button">CVs (${window.database.listCv.length})&ensp; <i style="font-size: 16px;" class="fas fa-chevron-down"></i></a>
  <div class="hidden-list" id="cvs-hidden-list">${listCvStr}</div>
  <a data-label-of="tags-hidden-list" class="menu-item list-open-button">Tags (${window.database.listTag.length})&ensp; <i style="font-size: 16px;" class="fas fa-chevron-down"></i></a>
  <div class="hidden-list" id="tags-hidden-list">${listTagStr}</div>
  <a data-label-of="sorts-hidden-list" class="menu-item list-open-button">Sorts&ensp; <i style="font-size: 16px;" class="fas fa-chevron-down"></i></a>
  <div class="hidden-list" id="sorts-hidden-list">${listSortStr}</div>
  <a class="menu-item open-model-btn">Gacha Machine</a>
  <a href="https://nhdasmr-v.glitch.me/" class="menu-item">Another versions</a>`;
  
  window.sharedView.menuContent = menuContent.replace(/\s+/g, ' ');
}
//Footer------------------------------------------------------------------------------------------------------
{
  let footerGridItemTemplate = 
  `<div class="grid-item">
      <h2>{title}</h2>
      {links}
  </div>`;
  let linkTemplate = `<a target="_blank" href="{href}"><span style="color: #00BFFF;">►</span> {name}</a>`;
  let links = [
    {
      title: 'Source ASMR Websites',
      links:  [
        {name: 'DLsite', href: 'https://www.dlsite.com/maniax/asmr'},
        {name: 'Japanese ASMR', href: 'https://japaneseasmr.com/'},
        {name: 'ASMR ONE', href: 'https://www.asmr.one/works'},
        {name: 'Nightfawn ASMR', href: 'https://nightfawn.com/listen-public/'},
        {name: 'JASMR', href: 'https://www.jasmr.net/'}
      ]
    },
    {
      title: 'Many Type Of Hentai Website',
      links: [
        {name: 'HentaiAnimeZone', href: 'https://hentaianimezone.com/'}
      ]
    },
    {
      title: 'Manga Hentai Websites',
      links: [
        {name: 'IMHentai', href: 'https://imhentai.xxx/'},
        {name: 'HentaiFox', href: 'https://hentaifox.com/'}
      ]
    }
  ];
  let grid = ``;
  
  links.forEach(item => {
    let links = ``;
    let gridItem = ``;
    gridItem = footerGridItemTemplate.replace('{title}', item.title);
    item.links.forEach(link => {
      links += linkTemplate.replace('{href}', link.href).replace('{name}', link.name);
    });
    grid += gridItem.replace('{links}', links);;
  })

  window.sharedView.footerContent = grid.replace(/\s+/g, ' ');
}
//Hidden-Data--------------------------------------------------------------------------------------------------
{
  let hiddenData = ``;
  if(!window.settingfs.isMobile() && screen.width > 780) {
    window.database.listTrack.forEach((track)=>{
      hiddenData += track.getHiddenDataHtml();
    })    
  }
  window.sharedView.hiddenDataContent = hiddenData.replace(/\s+/g, ' ');
}