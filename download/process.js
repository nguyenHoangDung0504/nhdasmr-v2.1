const urlParams = new URLSearchParams(window.location.search);
var id_vid = urlParams.get("code");
if(!id_vid || database.code.indexOf(Number(id_vid)) == -1) {
  window.location = '..';
} 

document.title = 'Download - '+id_vid;

const data = databaseTypeObject.find((item) => item.code == id_vid);
let images = [data.thumbnail];
const uniqueElements = data.images.filter(item => !images.includes(item));
images.push(...uniqueElements);
let audios = data.audios;

function extractNumberFromLink(link) {
    // Tách phần số từ đường link
    let startIndex = link.lastIndexOf('/') + 1;
    let endIndex = link.lastIndexOf('.');
    endIndex = (endIndex > startIndex) ? endIndex : (link.lastIndexOf('?v'));
    let number = link.substring(startIndex, endIndex);
    return number;
}

function downloadZip() {
    var zip = new JSZip();
    const filename = `${data.code} - ${data.rjCode}`;
    var folder = zip.folder(filename);

    let imageLinks = images;
    let audioLinks = audios;

    const numberOfImages = imageLinks.length;
    const numberOfAudios = audioLinks.length;
  
    const statusElement = document.getElementById('status');
    statusElement.innerHTML = `Processing: ${filename}.zip<br><br>
                                The file is being compressed and ready to download immediately, you will not have to wait for the download anymore when the compression process is completed.<br>
                                (File đang được nén và sẵn sàng tải xuống lập tức, bạn sẽ không phải chờ tải nữa khi tiến trình nén hoàn thành.)`;
    const percent = document.getElementById('percent');
    const process = document.getElementById('process');
    function updateProgress(percentage) {
      percent.innerText = `${percentage.toFixed(1)}%`;
      process.style.width = `${percentage}%`;
    }
//     Promise.all(
//         imageLinks.map(function(link) {
//             return fetch(link).then(function(res) {
//                 return res.blob();
//             });
//         })
//     )
//     .then(function(imageBlobs) {
//         imageBlobs.forEach(function(blob, index) {
//             const imageNumber = extractNumberFromLink(imageLinks[index]);
//             folder.file(`${imageNumber}.jpg`, blob, { binary: true });
//         });

//         Promise.all(
//             audioLinks.map(function(link) {
//                 return fetch(link).then(function(res) {
//                     return res.blob();
//                 });
//             })
//         )
//         .then(function(audioBlobs) {
//             audioBlobs.forEach(function(blob, index) {
//                 const audioNumber = extractNumberFromLink(audioLinks[index]);
//                 folder.file(`${audioNumber}.mp3`, blob, { binary: true });
//             });

//             zip.generateAsync({ type: 'blob' })
//                 .then(function(content) {
//                     saveAs(content, filename);
//                     statusElement.innerHTML = 'Done!';
//                 });
//         });
//     });
      const totalFiles = numberOfImages + numberOfAudios;
      Promise.all(
        imageLinks.map(function(link) {
          return fetch(link).then(function(res) {
            return res.blob();
          });
        })
      )
        .then(function(imageBlobs) {
          let filesDownloaded = 0;
          imageBlobs.forEach(function(blob, index) {
            const imageNumber = extractNumberFromLink(imageLinks[index]);
            if(imageLinks[index].indexOf('.mp4')!=-1) {
              folder.file(`${imageNumber}.mp4`, blob, { binary: true });
            } else {
              folder.file(`${imageNumber}.jpg`, blob, { binary: true });
            }
            filesDownloaded++;
            updateProgress((filesDownloaded / totalFiles) * 100);
          });
        
          Promise.all(
            audioLinks.map(function(link) {
              return fetch(link).then(function(res) {
                return res.blob();
              });
            })
          )
            .then(function(audioBlobs) {
              audioBlobs.forEach(function(blob, index) {
                const audioNumber = extractNumberFromLink(audioLinks[index]);
                if(audioLinks[index].indexOf('.mp4')!=-1) {
                  folder.file(`${audioNumber}.mp4`, blob, { binary: true });
                } else {
                  folder.file(`${audioNumber}.mp3`, blob, { binary: true });
                }
                filesDownloaded++;
                updateProgress((filesDownloaded / totalFiles) * 100);
              });
            
              zip.generateAsync({ type: 'blob' })
                .then(function(content) {
                  saveAs(content, filename);
                  // statusElement.innerHTML = 'Done!';
                });
            });
        });
}