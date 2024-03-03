function leakLinkImgAndAud(code){
  let result;
  let timeout = 200;
  code = code.toString();
  window.link = {
    rar: '',
    images: [],
    audios: []
  }
  let linkBox = document.querySelectorAll('.css-vurnku div[type="button"]');
  let linkNeed = [];
  for(let i=0; i<linkBox.length; i++) {
    if(linkBox[i].innerText.indexOf(code) != -1) {
      linkNeed.push(linkBox[i]);
    }
  }
  for(let i=0; i<linkNeed.length; i++) {
    setTimeout(function() {
      linkNeed[i].click();
      setTimeout(function() {
      let data = document.querySelector('.input-wrap input').getAttribute('value');
      if(data.indexOf('.rar') != -1) {
        window.link.rar = data;
      } else if(data.indexOf('.jpg') != -1 || data.indexOf('.png') != -1 || data.indexOf('.webp') != -1 || data.indexOf('.mp4') != -1) {
        window.link.images.push(data);
      } else if(data.indexOf('.mp3') != -1) {
        window.link.audios.push(data);
      }
      document.querySelector('button.css-10jd2z1').click();
      }, timeout);
    }, i * timeout);
  }
  setTimeout(async function() {
    let template = ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10', 'omake', 'freetalk']
    window.link.audios.sort((a, b)=>{
      for (let i = 0; i < template.length; i++) {
        const mau = template[i];
        if (a.includes(mau) && !b.includes(mau)) {
          return -1;
        } else if (!a.includes(mau) && b.includes(mau)) {
          return 1;
        }
      }
      return a.localeCompare(b);
    });
    
    window.link.images.sort((a, b) => {
        const indexA = parseInt(a.match(/-(\d+)(\.[^.]+)?\?/)[1]);
        const indexB = parseInt(b.match(/-(\d+)(\.[^.]+)?\?/)[1]);
        return indexA - indexB;
    });
    let thumbnail = window.link.images[0];
    let result = {
      thumbnail: thumbnail,
      images: (window.link.images.slice(1)).join(","),
      audios: window.link.audios.join(","),
      rar: window.link.rar
    }
    console.log(result);
    if (confirm('Xác nhận sao chép')) {
      try{
        navigator.clipboard.writeText(`"${result.thumbnail}", "${result.images}", "${result.audios}"`);
        console.log('Sao chép thành công!');
      } catch(e) {
        console.log('error')
      }
    }
  }, timeout * linkNeed.length + 100);
}