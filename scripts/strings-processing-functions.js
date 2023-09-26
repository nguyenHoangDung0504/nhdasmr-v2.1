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