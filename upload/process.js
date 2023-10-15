function removeCommasAndTrim(str) {
  let trimmedStr = str.replace(/^[,\s]+|[,\s]+$/g, '').trim();
  return trimmedStr;
}


function handleForm() {
  let error = '';
  let code = document.querySelector('#code').value;
  if(database.code.indexOf(code)!=-1) {error+="trùng code<br>"}
  let rjcode = document.querySelector('#rjcode').value;
  if(database.rjCode.indexOf(rjcode)!=-1) {error+="trùng rjcode<br>"}
  let cvs = removeCommasAndTrim(document.querySelector('#cvs').value);
  let japname = document.querySelector('#japname').value;
  let engname = document.querySelector('#engname').value;
  let thumbnail = document.querySelector('#thumbnail').value;
  let tags =  removeCommasAndTrim(document.querySelector('#tags').value);
  let images = removeCommasAndTrim(document.querySelector('#images').value);
  let tracks = removeCommasAndTrim(document.querySelector('#tracks').value);
  
  if(error != '') {
    document.querySelector('#result').innerHTML += '<span style="color: red;">'+error+'</span>';
    return;
  }
  
  let str = `pushData(${code}, "${rjcode}", "${cvs}", "${japname}", "${engname}", "${thumbnail}", "${tags}", "${images}", "${tracks}");`;
  
  document.querySelector('#result').innerHTML += str+'<br>';
}

function reserForm() {
  document.querySelector('#code').value = '';
  document.querySelector('#rjcode').value = '';
  document.querySelector('#cvs').value = '';
  document.querySelector('#japname').value = '';
  document.querySelector('#engname').value = '';
  document.querySelector('#thumbnail').value = '';
  document.querySelector('#tags').value = '';
  document.querySelector('#images').value = '';
  document.querySelector('#tracks').value = '';
}