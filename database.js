var codes       = [0];
var cv_class    = [0];
var rj_code     = [0];
var jap_name    = [0];
var eng_name    = [0];
var cv_name     = [0];
var link_pic    = [0];
var track_tags  = [0];
var links_image = [0];
var links_audio = [0];

function pushData(i, _class_arr, r_code, j_name, e_name, c_name_arr, l_pic, tr_tag, img, aud) {
  codes.push(i);
  cv_class.push(_class_arr);
  rj_code.push(r_code);
  jap_name.push(j_name);
  eng_name.push(e_name);
  cv_name.push(c_name_arr);
  link_pic.push(l_pic);
  track_tags.push(tr_tag);
  links_image.push(img);
  links_audio.push(aud);
}

function getCodeFromLink(link) {
  const start = link.lastIndexOf('/') + 1;
  const end = link.indexOf('(');
  const rs = link.substring(start, end);
  const n = Number(link.substring(start, end));
  console.log(rs+"   "+n);
  // return Number(link.substring(start, end));
}

console.log(links.length);
for(let i=1; i<links.length; i++) {
  getCodeFromLink(links[i]); 
}