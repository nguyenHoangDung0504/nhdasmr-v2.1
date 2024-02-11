var codes = window.database.listCode;
var request = new XMLHttpRequest();
var innerData = '';
let checkedCode = [];
let numberOfTrack = 0;
request.open('GET', '../develop/list-code/txts/queue.txt', true);
request.onreadystatechange = function() {
  if (request.readyState === 4 && request.status === 200) {
    var linesAfterProcessing = request.responseText;
    var lines = request.responseText.split('\n'); // Tách nội dung thành các dòng
    lines.forEach(function(line) {
      let dataInLine = line.split(',');
      if(dataInLine.length>=2) {
        innerData += '<div class="cont">';
        dataInLine.forEach(function(col) {
          let code = col.split('*')[0];
          if(codes.indexOf(Number(code)) != -1) {
            console.log("Trùng code trong database: "+code); return;
          }
          if(checkedCode.indexOf(code)!=-1) { console.log('Trùng code: '+code); return;}
          let mess = col.split('*')[1]?col.split('*')[1]:'';
          if(code.indexOf('http') != -1) {
            innerData += `<a target="_blank" href='${code}'>${code}</a>`;
          } else {
            checkedCode.push(code);
            if(mess.indexOf('http') != -1) {
              mess = mess.replaceAll("(", "").replaceAll(")", "")
              innerData += `<div class="cont2"><a target="_blank" href='https://japaneseasmr.com/${code}'>${code}</a> <a target="_blank" href="${mess}">Link Of ${code}</a></div>`;
            } else {
              innerData += `<a target="_blank" href='https://japaneseasmr.com/${code}'>${code} ${mess}</a>`;
            }
            numberOfTrack++;
          }
        });  
        innerData += '</div>';
      } else {
          let code = line.split('*')[0];
          if(codes.indexOf(Number(code)) != -1) {
            console.log("Trùng code trong database: "+code); return;
          }
          if(checkedCode.indexOf(code)!=-1) { console.log('Trùng code: '+code); return;}
          checkedCode.push(code);
          numberOfTrack++;
          let mess = line.split('*')[1]?line.split('*')[1]:'';
          innerData += `
            <a target="_blank" href='https://japaneseasmr.com/`+code+`'>`+code+` `+mess+`</a>
          `;
      }
    });
  }
  document.querySelector('body').innerHTML = '<h2 style="color: white">'+numberOfTrack+' Tracks</h2>'+innerData;
};
request.send();
