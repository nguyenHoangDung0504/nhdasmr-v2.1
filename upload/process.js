function removeCommasAndTrim(str) {
  let trimmedStr = str.replace(/^,+\s*|\s*,+$/g, '');
  return trimmedStr;
}


function handleForm() {
  let code = document.querySelector('#code').value;
  let rjcode = document.querySelector('#rjcode').value;
  let cvs = document.querySelector('#cvs').value;
  let japname = document.querySelector('#japname').value;
  let engname = document.querySelector('#engname').value;
  let thumbnail = document.querySelector('#thumbnail').value;
  let tags = document.querySelector('#tags').value;
  let images = document.querySelector('#images').value;
  let tracks = document.querySelector('#tracks').value;
  
  let str = `pushData(${code}, "${rjcode}", "${cvs}", "${japname}", "${engname}", "${thumbnail}", "${tags}", "${images}", "${tracks}");`;
  
  document.querySelector('body').innerHTML += str;
}