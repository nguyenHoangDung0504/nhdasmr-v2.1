var allLink = [];
var cpc = 0;
var loopTime = 0;

var result = [];
var tk = {
  numberImage: 0,
  numberAudio: 0,
  numberVideo: 0
}

for(let i=0; i<database.thumbnail.length; i++) {
  let track = {
    code: database.code[i],
    links: []
  }
  track.links.push(database.thumbnail[i]);
  for(let j=0; j<database.images[i].length; j++) {
    if(database.images[i][j].indexOf('kiko') != -1) {continue;}
    track.links.push(database.images[i][j]);
  }  
  for(let j=0; j<database.audios[i].length; j++) {
    track.links.push(database.audios[i][j]);
  }
  
  allLink.push(track);
}

function fetchLinks() {
  let promises = [];
  for(let i=0; i<allLink.length; i++) {
    for(let j=0; j<allLink[i].links.length; j++) {
      let promise = fetch(allLink[i].links[j], {
        method: 'HEAD'}).then(function (response) {
          let size = Number((response.headers.get("content-length")/(1024*1024)).toFixed(2));
          let type = response.headers.get("content-type");
          cpc += size;
          let rs = {
            size: size+"MB",
            type: type
          }
          result.push({
            code: allLink[i].code,
            type: type.split('/')[0],
            size: size,
            link: allLink[i].links[j],
            mess: `${allLink[i].code} - ${type.split('/')[0]}: ${size}MB - Link:${allLink[i].links[j]}`
          });
          console.log(`${allLink[i].code} - ${type.split('/')[0]}: ${size}MB - Link:${allLink[i].links[j]}`);
          if(type.indexOf('image')!=-1) {
            tk.numberImage++;
          } else if(type.indexOf('audio')!=-1) {
            tk.numberAudio++;
          } else if(type.indexOf('video')!=-1) {
            tk.numberVideo++;
          }
        loopTime++;
      });    
      promises.push(promise);
    }
  }
  return Promise.all(promises);
}
fetchLinks().then(function() {
  let body = document.querySelector('div');
  let innerData = '<h3>Total Capacity: '+cpc.toFixed(0)+' MB</h3><br>';
  result.sort(function(a, b) {
    return a.code - b.code;
    /*GIẢM DẦN: return b.code-a.code;*/
  });
  for(let i=0; i<result.length; i++) {
    // console.log(`${result[i].mess}`);
    let j=i;
    while(result[j].type!='image') { 
      if(result[j].link.indexOf('(0)')!=-1 || result[j].link.indexOf('-0.')!=-1) {break;}
      j++; 
    }
    let code = result[i].code;
    innerData += "<h4>&ensp;Code: "+code+"</h4><br><img loading='lazy' style='display: block; width: 400px;' src='"+result[j].link+"'>";
    let codenow = result[i].code;
    let cap = 0;
    try {
      while(result[i].code == codenow){
        innerData += "&ensp;- Type: "+result[i].type+"&ensp;&ensp;Size: "+result[i].size+" MB&ensp;&ensp;Link: <a target='_blank' href='"+result[i].link+"'>"+result[i].link+"</a><br>";
        cap += result[i].size;
        i++;
      }
    }catch(e){}
    innerData += '<h4>&ensp;&ensp;Total: '+cap.toFixed(2)+' MB&ensp;&ensp;&ensp;           <a target="_blank" href="https://nhdasmr-v2.glitch.me/download?code='+code+'">Download</a></h4><hr><br>';
    i--;
  }
  body.innerHTML = innerData;  
}).then(console.log('success'));


