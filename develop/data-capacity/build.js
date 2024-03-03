let size = 0;
let stop = 0;
const sizectn = document.querySelector('.total');
const topCtn = document.querySelector('.top');
const cpl = document.querySelector('.cpl');
document.querySelector('button').addEventListener('click', ()=>{
  stop = 1;
})

const getFileName = (link) => {
  return link.slice(link.lastIndexOf('/')+1, link.lastIndexOf('?'));
}

const toMb = (value, digit) => {
  return (value/(1024*1024)).toFixed(digit ?? 2);
}

const calculateFileSizes = async (tracks)=>{
  let count = 0;
  
  for (const track of tracks) {
    if(stop != 0) {
      break;
    }
    const thumbnail = track.thumbnail, images = track.images, audios = track.audios;
    const trackData = {
      thumbnail: thumbnail,
      imageSizes: [],
      audioSizes: []
    };

    if (!images.includes(thumbnail)) {
      images.unshift(thumbnail);
    }

    for (const image of images) {
      if (!image.includes('glitch')) continue;
      const imageSize = await getFileSize(image);
      trackData.imageSizes.push({ link: image, size: imageSize });
    }

    for (const audio of audios) {
      if (!audio.includes('glitch')) continue;
      const audioSize = await getFileSize(audio);
      trackData.audioSizes.push({ link: audio, size: audioSize });
    }
    console.log(trackData);
    let div = document.createElement('div');
    div.classList.add('databox');
    div.innerHTML = `<a class="img" target="_blank" href="../../watch?code=${track.code}"><img src="${trackData.thumbnail}"></a>
      <div class="contentctn">
        <div class="content">
          ${trackData.imageSizes.concat(trackData.audioSizes).reduce((html, data)=>{
            html+=`<div class="actn"><p>File name:</p>&ensp;<a target="_blank" class="highlight" href="${data.link}">${getFileName(data.link)}</a> | <p>Capacity: </p>&ensp;<a>${toMb(data.size)} MB</a></div>`;
            return html;
          }, ``)}
        </div>
      </div>`;
    document.body.insertBefore(div, document.body.firstChild);
    document.body.insertBefore(document.body.querySelector('#top2'), document.body.firstChild);
    document.body.insertBefore(topCtn, document.body.firstChild);
    count++;
    document.querySelector('.cpl').textContent = 'Complete '+count+'/'+tracks.length;
    if(count == tracks.length) {
      window.scrollTop = 0;
    }
  }
}

const getFileSize = async (url)=>{
  if(stop != 0) {
    return;
  }
  const response = await fetch(url, { method: 'HEAD' });
  const contentLength = response.headers.get('content-length');
  size += parseInt(contentLength);
  sizectn.textContent = `Total: ${toMb(size)} MB ~ ${toMb(size/1024)} GB`;
  return parseInt(contentLength);
}

calculateFileSizes(window.database.listTrackNewest)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error('Error:', error);
  });