var request = new XMLHttpRequest();
var innerData = '';
request.open('GET', 'txt/queue.txt', true);
request.onreadystatechange = function() {
  if (request.readyState === 4 && request.status === 200) {
    var lines = request.responseText.split('\n'); // Tách nội dung thành các dòng

    lines.forEach(function(line) {
      let dataInLine = line.split(',');
      if(dataInLine.length>=2) {
        dataInLine.forEach(function(col) {
          let code = col.split('*')[0];
          let mess = col.split('*')[1];
          innerData += `
            <a>`+col+` `+mess?mess:''+`</a>
          `;        
        });        
      } else {
        
      }
    });
  }
  document.querySelector('body').innerHTML = innerData;
};
request.send();
