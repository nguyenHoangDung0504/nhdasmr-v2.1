'use strict'

window.watchView = {
  vidDivContent: '',
  contentDivContent: ''
}

const urlParams = new URLSearchParams(window.location.search);
let trackId = urlParams.get("code");
let track = window.databasefs.getTrackByCode(trackId) || window.databasefs.getTrackByRjCode(trackId);
if(!trackId || !track) {
  window.history.back();
} 
document.title = "Watch "+track.code+" - NHD ASMR";
//Vid-div-content---------------------------------------------------------------------------------------
{
  let series = window.databasefs.findSingleSeries(track.series);
  if(!series)
    series = new window.classes.Series('', 0)
  let vidDivContent = 
  `<iframe id="vid_frame" src="watch/alt-player?code=${track.code}"></iframe>
  <h3 id="track-info">
    <span id="track_name"><b><i>${track.rjCode}</i></b> - ${track.engName} (Original name: ${track.japName})</span>
    <br><br>
    <span style="display: ${track.series?'':'none'}"><span id="track_series"><b>Series: </b><a href="..?series=${series.name}">${series.getHtml('yes', 'yes')}</a></span>
    <br><br></span>            
    <span id="track_list_cv">${track.getCvsHtmlWithCount().replaceAll('<br>', '')}</span>
    <br><br>
    <span id="track_list_tag">${track.getTagsHtmlWithCount().replaceAll('<br>', '')}</span>
  </h3>
  <h3 id="download-box" style="display: block"><a target="_blank" href="watch/download?code=${track.code}">Download &darr;</a></h3>`;
  window.watchView.vidDivContent = vidDivContent.replace(/\s+/g, ' ');  
}
//Content-div-content---------------------------------------------------------------------------------------
{
  let contentDivContent = `<h2>Random post</h2> <div id="random-post">`;
  localStorage.removeItem('shuffledIndexes');
  let listToRandom = [...window.database.listTrack].filter((element)=>{
    return (element.code !== track.code && !element.cvs.some(item => track.cvs.includes(item)));
  });
  listToRandom = window.databasefs.getRandomTracks(listToRandom, 10);
  listToRandom.forEach((e)=>{
    contentDivContent += e.getDisplayContentHtml();
  })
  contentDivContent += `</div>`;
  
  track.cvs.forEach((cv)=>{
    listToRandom = window.databasefs.getTracksByCV(cv).filter((element)=>{
      return element.code !== track.code;
    });
    let end = listToRandom.length;
    if(end<=0)
      return;
    localStorage.removeItem('shuffledIndexes');
    end = end<=5 ? end : 5;
    listToRandom = window.databasefs.getRandomTracks(listToRandom, end);
    contentDivContent += `<h2>Related tracks by <a href="..?cv=${cv}"><span class="cv">${cv}</span></a></h2> <div id="CV - ${cv}">`;
    listToRandom.forEach((e)=>{
      contentDivContent += e.getDisplayContentHtml();
    })
    contentDivContent += `</div>`;
  })
  window.watchView.contentDivContent = contentDivContent.replace(/\s+/g, ' '); 
}