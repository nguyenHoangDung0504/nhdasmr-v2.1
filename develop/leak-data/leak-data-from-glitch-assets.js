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
    function move(arr, index) {
      if (index < 0 || index >= arr.length) {
        console.error('Vị trí không hợp lệ.');
        return arr;
      }
      const element = arr.splice(index, 1)[0];
      arr.push(element);
      return arr;
    }
    window.link.images.sort();
    window.link.audios.sort();
    for(let i=0; i<window.link.audios.length; i++) {
      if(window.link.audios[i].indexOf('track') == -1) {
        move(window.link.audios, i);
      }
    }
    let thumbnail = window.link.images[0];
    window.link.images.sort((a, b) => {
        const indexA = parseInt(a.match(/-(\d+)(\.[^.]+)?\?/)[1]);
        const indexB = parseInt(b.match(/-(\d+)(\.[^.]+)?\?/)[1]);
        return indexA - indexB;
    });
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
      } catch(e) {console.log('error')}
      
//       // Hàm để sao chép giá trị và trả về một Promise
//       const copyValue = async (value) => {
//         await navigator.clipboard.writeText(value);
//       };

//       // Mảng các giá trị cần sao chép
//       const valuesToCopy = [result.rar, result.audios, result.images, result.thumbnail];

//       // Hàm chạy lần lượt các lệnh sao chép với khoảng thời gian trễ
//       const copyValuesSequentially = async () => {
//         for (const value of valuesToCopy) {
//           await copyValue(value);
//           await new Promise((resolve) => setTimeout(resolve, 400)); // Khoảng thời gian trễ 100ms
//         }
//         console.log('Đã sao chép thành công!');
//       };

//       // Gọi hàm chạy sao chép tuần tự
//       copyValuesSequentially().catch((error) => {
//         console.error('Đã xảy ra lỗi khi sao chép:', error);
//       });
    }
  }, timeout * linkNeed.length + 100);
}