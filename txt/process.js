var request = new XMLHttpRequest();
var innerData = '';
let checkedCode = [];
request.open('GET', 'txt/queue.txt', true);
request.onreadystatechange = function() {
  if (request.readyState === 4 && request.status === 200) {
    var lines = request.responseText.split('\n'); // Tách nội dung thành các dòng

    lines.forEach(function(line) {
      let dataInLine = line.split(',');
      if(dataInLine.length>=2) {
        innerData += '<div class="cont">';
        dataInLine.forEach(function(col) {
          let code = col.split('*')[0];
          if(checkedCode.indexOf(code)!=-1) { console.log('Trùng code: '+code); }
          checkedCode.push(code);
          let mess = col.split('*')[1]?col.split('*')[1]:'';
          innerData += `
            <a target="_blank" href='https://japaneseasmr.com/`+code+`'>`+col+` `+mess+`</a>
          `;        
        });  
        innerData += '</div>';
      } else {
          let code = line.split('*')[0];
          if(checkedCode.indexOf(code)!=-1) { console.log('Trùng code: '+code); }
          checkedCode.push(code);
          let mess = line.split('*')[1]?line.split('*')[1]:'';
          innerData += `
            <a target="_blank" href='https://japaneseasmr.com/`+code+`'>`+code+` `+mess+`</a>
          `;         
      }
    });
  }
  document.querySelector('body').innerHTML = innerData;
};
request.send();
