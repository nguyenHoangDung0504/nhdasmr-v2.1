const w = window.open('/', 'myPopup', 'width=1300,height=850')
const rjcode = document.querySelectorAll('p')[3].textContent.split(': ')[1]
const code = Number(location.href.match(/\d+/)[0])
const i = document.createElement('iframe')
const i2 = document.createElement('iframe')
const imgs = document.querySelector('.entry-content').querySelectorAll('img')
const audios = document.querySelectorAll('audio')
const imgSrcs = Array.from(imgs).map(image => image.src).filter((src, index, self) => src.includes(rjcode) && self.indexOf(src) === index).sort()
const audSrc = Array.from(audios).map(audio => audio.querySelector('source').src).sort()
const styles = '<style>iframe{width: 100%; height: 500px; background-color: gray};audio{width: 90%; height: 50px; margin: 5px; margin-top: 400px; background-color: white;}</style>'
const audioElement = audSrc.map(src => {
  const audio = document.createElement('audio')
  audio.controls = true
  audio.innerHTML = `<source src=${src}>`
  return audio
})

i.src = imgSrcs[0]
i2.src = 'https://v.weeab0o.xyz/'
setTimeout(() => {
  w.document.head.innerHTML = styles
  w.document.body.innerHTML = ''
  w.document.body.appendChild(i)
  w.document.body.appendChild(i2)
  i2.onload = ()=>{
    i2.ownerDocument.body.innerHTML += '<button>Download</button>'
    i2.ownerDocument.querySelector('button').addEventListener('click', ()=>{
      downloadAudio(document.querySelector('source').src, 'fileName')
      function downloadAudio(url, fileName) {
        fetch(url)
          .then(response => response.blob())
          .then(blob => {
            // Tạo một liên kết tạm thời từ dữ liệu tải xuống
            var link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName;

            // Kích hoạt sự kiện click trên liên kết để bắt đầu tải xuống
            link.click();
          })
          .catch(error => {
            console.error('Lỗi khi tải xuống âm thanh:', error);
          });
      }
    })
  }
  audioElement.forEach(e => {
    w.document.body.appendChild(e)
  })
}, 1000)

/*
function downloadAudio(url, fileName) {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      // Tạo một liên kết tạm thời từ dữ liệu tải xuống
      var link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;

      // Kích hoạt sự kiện click trên liên kết để bắt đầu tải xuống
      link.click();
    })
    .catch(error => {
      console.error('Lỗi khi tải xuống âm thanh:', error);
    });
}

downloadAudio(document.querySelector('source').src, 'fileName')
*/