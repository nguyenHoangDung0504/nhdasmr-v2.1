var request = new XMLHttpRequest();
request.open('GET', 'txt/queue.txt', true);
request.onreadystatechange = function() {
  if (request.readyState === 4 && request.status === 200) {
    var lines = request.responseText.split('\n'); // Tách nội dung thành các dòng

    lines.forEach(function(line) {
      document.querySelector()
    });
  }
};
request.send();