function getCodeFromLink(link) {
  const start = link.lastIndexOf('/') + 1;
  const end = link.indexOf('(');
  const rs = link.substring(start, end);
  return Number(rs);
}

function writePushData() {
  let rs = '';
  for(let i=1; i<170; i++) {
    let code = getCodeFromLink(links[i]);
    let rj_code2 = JSON.stringify(rj_code[i]);  
    let jap_name2 = JSON.stringify(jap_name[i]); 
    let eng_name2 = JSON.stringify(eng_name[i]);
    let cv_name2 = JSON.stringify(cv_name[i].join(','));
    let link_pic2 = JSON.stringify(link_pic[i]);
    let track_tags2 = JSON.stringify(track_tags[i]);
    let img = JSON.stringify(links_image[i].join(','));
    let aud = JSON.stringify(links_audio[i].join(','));
    rs += "pushData("+code+", "+rj_code2+", "+cv_name2+", "+jap_name2+", "+eng_name2+", "+link_pic2+", "+track_tags2+", "+img+", "+aud+");\n";
    // rs += "pushData("+i+", "+cv_class2+", "+rj_code2+", "+jap_name2+", "+eng_name2+", "+cv_name2+", "+link_pic2+", "+track_tags2+", "+img+", "+aud+");\n";
  }
  console.log(rs);
}


function createCopyButton() {
  // Tạo phần tử button
  const button = document.createElement('button');
  button.textContent = 'Copy Images';
  button.style.position = 'fixed';
  button.style.top = '100px';
  button.style.right = '100px';

  // Gắn sự kiện click cho button
  button.addEventListener('click', function() {
    const dataTransfer = new DataTransfer();
    // Lặp qua từng phần tử <img> và thêm nội dung vào DataTransfer
    let imageElements = document.querySelectorAll('div.fotorama__stage__frame img');
  // Tạo một mảng chứa các promise tải xuống hình ảnh
  const downloadPromises = Array.from(imageElements).map(img => {
    const imageUrl = img.src;
    return fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      });
  });

  // Chờ tất cả các promise hoàn thành
  Promise.all(downloadPromises)
    .then(results => {
      // Tạo một mảng chứa các chuỗi base64 của hình ảnh
      const imageBase64Array = results.filter(result => typeof result === 'string');

      // Nếu có hình ảnh, sao chép chuỗi base64 vào clipboard
      if (imageBase64Array.length > 0) {
        const textToCopy = imageBase64Array.join('\n');
        return navigator.clipboard.writeText(textToCopy);
      }
    })
    .then(() => {
      console.log('Images copied to clipboard.');
    })
    .catch(error => {
      console.error('Error copying images to clipboard:', error);
    });
  });

  // Gắn button vào DOM
  document.body.appendChild(button);
}