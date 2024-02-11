const scriptFiles = [
  'https://nhdasmr-v2-1.glitch.me/utils/utils.js', 
  'https://nhdasmr-v2-1.glitch.me/model/classes.js',
  'https://nhdasmr-v2-1.glitch.me/model/database/build-database.js'
];

function fetchDatabase(scriptFiles, callback) {
  const fetchPromises = scriptFiles.map(scriptFile => fetch(scriptFile));

  Promise.all(fetchPromises)
    .then(responses => Promise.all(responses.map(response => response.text())))
    .then(scripts => {
      scripts.forEach(script => {
        eval(script);
      });

      // Gọi callback sau khi tất cả các file script đã chạy xong
      callback();
    })
    .catch(error => {
      console.error('Đã xảy ra lỗi khi fetch hoặc chạy script:', error);
    });
}

let generateCode = ()=>{
  let series = '';
  (function leakData() {
    let codes = window.database.listCode;
    function getTagArr() {
      let arr_tags = [];
      let arr_series = [];
      window.database.listTag.forEach((tagObj)=>{arr_tags.push(tagObj.name)});
      window.database.listSeries.forEach((seriesObj)=>{arr_series.push(seriesObj.name)});
      let tags = document.querySelectorAll('.post-meta.post-tags a');
      let tags_after = [];
      for(let i=0; i<tags.length; i++) {
        if( tags[i].innerText.indexOf('Student') != -1 ) {
          tags_after.push('School Girl');
          continue;
        }
        if( tags[i].innerText.indexOf('Imouto') != -1 ) {
          tags_after.push('Sister');
          continue;
        }
        if( tags[i].innerText.indexOf('Breast Sex') != -1 ) {
          tags_after.push('Paizuri');
          continue;
        }
        for(let j=0; j<arr_tags.length; j++) {
          if( tags[i].innerText.indexOf(arr_tags[j]) != -1 && tags_after.indexOf(arr_tags[j]) == -1) {
            tags_after.push(arr_tags[j]);
          }
        }
        // arr_series.forEach((s)=>{
        //   if(s.includes(tags[i].innerText)){
        //     series = s;
        //   }
        // });
      }
      console.log(tags_after.sort());
      return tags_after;
    }

    function getData() {
      let ps = document.querySelectorAll('p');
      let data = {
        japName: ps[1].textContent,
        cvs: ps[2].textContent.split(': ')[1].replace('Aruha Kotone','Kotone Akatsuki'),
        rjCode: ps[3].textContent.split(': ')[1]
      }
      console.table(data);
      return data;
    }

    function generateUploadCode() {
      let data = getData();
      if(codes.indexOf( Number(location.href.match(/\d+/)[0]) ) != -1) {
        alert('Trùng code!');
        return;
      }
      let str = `addTrack(${location.href.match(/\d+/)[0]}, "${data.rjCode}", "${data.cvs.replaceAll(', ',',')}", "${getTagArr().join(',')}", "${series}", "engName", "${data.japName}", t0i0a);`;
      if (window.confirm('Xác nhận sao chép')) {
        navigator.clipboard.writeText(str)
          .then(() => {console.log('Đã sao chép.')})
          .catch(error => {console.error('Lỗi khi sao chép', error)});
      }
      return str;
    }
    return generateUploadCode();  
  })();
}


fetchDatabase(scriptFiles, generateCode);