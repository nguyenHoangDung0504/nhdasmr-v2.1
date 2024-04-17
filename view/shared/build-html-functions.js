'use strict'

window.buildhtmlfs = {
  buildListCvOrTag: ''
}

window.buildhtmlfs.buildListCvOrTag = (type, list)=>{
  let listStr = ``;
  list.forEach((e)=>{
    listStr += `<a class="sub-item" data-count="${e.count}" href="..?${type.toLowerCase()}=${e.name}">`
              + ((type=='cv') ? '<span style="color: red;">❤</span>' : '<span style="color: gold">♦</span>')
              +`  ${e.getHtml('no', 'yes')}</a>`;
  });
  return listStr;
}