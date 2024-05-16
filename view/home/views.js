'use strict'

window.homeView = {
  messageContent: 'NHD Hentai - ASMR Hentai Tracks',
  hiddenDataContent: '',
  dataContent: '',
  paginationContent: '',
  trackPerPage: 40,
  trackPerPageMobile: 24,
  linksPerGroupPagination: 7,
  linksPerGroupPaginationMobile: 5
};

const trackPerPage = window.settingfs.isMobile()
                      ? window.homeView.trackPerPageMobile 
                      : window.homeView.trackPerPage;
const urlParams = new URLSearchParams(window.location.search);
let listTrack = [...window.database.listTrack],
    series = urlParams.get('series'),
    cv = urlParams.get('cv'),
    tag = urlParams.get('tag'),
    sort = urlParams.get('sort'),
    search = urlParams.get('search') || urlParams.get('s'),
    page = Number(urlParams.get('page'));
if(search) {
  listTrack = window.databasefs.searchTracks(search, listTrack);
  window.homeView.messageContent += `<br>Result of key word: <b><i>"${search}"</i></b> (${listTrack.length})`;
  if(search == '@newest' || search == '@n') {
    listTrack = [...window.database.listTrackNewest].reverse();
    window.homeView.messageContent = 'NHD Hentai - ASMR Hentai Tracks';
  }
} else {
  if(series) {
    listTrack = window.databasefs.getTracksBySeries(series, listTrack);
    window.homeView.messageContent += `<br>Series: ${window.databasefs.findSingleSeries(series).getHtml('yes', 'yes')}`;
  } else if(cv) {
    listTrack = window.databasefs.getTracksByCV(cv, listTrack);
    window.homeView.messageContent += `<br>CV: ${window.databasefs.findSingleCvOrTag('cv', cv).getHtml('yes', 'yes')}`;
  } else if(tag) {
    listTrack = window.databasefs.getTracksByTag(tag, listTrack);
    window.homeView.messageContent += `<br>Tag: ${window.databasefs.findSingleCvOrTag('tag', tag).getHtml('yes', 'yes')}`;
  }
}

if(sort == 'oldest') {
  listTrack = listTrack.reverse();
}
if(listTrack.length==0) {
  window.homeView.messageContent = `No result for key word: "${search}"&ensp;&ensp; <a href="javascript:void(0)" class="series" onclick="window.history.back()">Back</a>`;
}
let limitPage = Math.ceil(listTrack.length/trackPerPage);
limitPage == 0 ? limitPage = 1 : limitPage;
page = (!page)? 1 : page;
page<1 || page>limitPage ? /*window.location.href = ".."*/ window.history.back() : '';


//List--------------------------------------------------------------------------------------------------------
{
  let trackIndex = window.utils.getStartAndEnd(page, trackPerPage, listTrack.length-1);
  let data = ``;
  
  for(let i=trackIndex.start; i<=trackIndex.end; i++) {
    data += listTrack[i].getDisplayCellHtml();
  }

  window.homeView.dataContent = data.replace(/\s+/g, ' ');
}
//Pagination--------------------------------------------------------------------------------------------------
{
  let group = window.utils.getGroup(
    page, 
    window.settingfs.isMobile() ? window.homeView.linksPerGroupPaginationMobile 
                                : window.homeView.linksPerGroupPagination, 
    limitPage
  );
  let links0 = [
    `<a class="[class]" href="${window.utils.addQuery('page', '1')}" id="first-link">&lt;&lt;</a>`,
    `[links]`,
    `<a class="[class]" href="${window.utils.addQuery('page', limitPage)}" id="last-link">&gt;&gt;</a>`
  ], links = ``;
  
  links0[0] = (page==1) ? links0[0].replace('[class]', 'block') : links0[0];
  links0[2] = (page==limitPage) ? links0[2].replace('[class]', 'block') : links0[2];
  group.forEach((p)=>{
    links += `<a class="${p==page ? 'active' : ''}" href="${window.utils.addQuery('page', p)}">${p}</a>`;
  })
  
  let paginationContent = links0.join('');
  paginationContent = paginationContent.replace('[links]', links);
  
  window.homeView.paginationContent = paginationContent.replace(/\s+/g, ' ');
}