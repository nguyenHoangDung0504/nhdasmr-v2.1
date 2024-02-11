class Track {
  constructor(code, rjCode, cvs, tags, series, engName, japName, thumbnail, images, audios) {
    this.code = code;
    this.rjCode = rjCode;
    this.cvs = cvs;
    this.tags = tags;
    this.series = series;
    this.engName = engName;
    this.japName = japName;
    this.thumbnail = thumbnail;
    this.images = images;
    this.audios = audios;
  }
  
  getCvsHtml() {
    let cv_string = '<br><b>CV' + (this.cvs.length>1 ? 's' : '') + '</b>: ';
    for(let j=0; j<this.cvs.length; j++) {
      if(j < this.cvs.length-1) {
        cv_string += '<a title="CV: '+this.cvs[j]+'" class="cv" href="..?cv='+this.cvs[j]+'">'+this.cvs[j]+'</a>, ';
      } else if(j==this.cvs.length-1) {
        cv_string += '<a title="CV: '+this.cvs[j]+'" class="cv" href="..?cv='+this.cvs[j]+'">'+this.cvs[j]+'</a>';
      }
    }
    return cv_string;
  }
  getCvsHtmlWithCount() {
    let cv_string = '<br><b>CV' + (this.cvs.length>1 ? 's' : '') + '</b>: ';
    for(let j=0; j<this.cvs.length; j++) {
      let cv = window.databasefs.findSingleCvOrTag('cv', this.cvs[j]);
      if(j < this.cvs.length-1) {
        cv_string += '<a title="CV: '+cv.name+'" href="..?cv='+cv.name+'">'+cv.getHtml('yes', 'yes')+'</a>, ';
      } else if(j==this.cvs.length-1) {
        cv_string += '<a title="CV: '+cv.name+'" href="..?cv='+cv.name+'">'+cv.getHtml('yes', 'yes')+'</a>';
      }
    }
    return cv_string;    
  }
  getTagsHtml() {
    let tag_string = '<br><b>Tag' + (this.tags.length>1 ? 's' : '') + '</b>: ';
    for(let j=0; j<this.tags.length; j++) {
      if(j < this.tags.length-1) {
        tag_string += '<a title="Tag: '+this.tags[j]+'" class="tag" href="..?tag='+this.tags[j]+'">'+this.tags[j]+'</a>, ';
      } else if(j == this.tags.length-1) {
        tag_string += '<a title="Tag: '+this.tags[j]+'" class="tag" href="..?tag='+this.tags[j]+'">'+this.tags[j]+'</a>';
      }
    }
    return tag_string;    
  }
  getTagsHtmlWithCount() {
    let tag_string = '<br><b>Tag' + (this.tags.length>1 ? 's' : '') + '</b>: ';
    for(let j=0; j<this.tags.length; j++) {
      let tag = window.databasefs.findSingleCvOrTag('tag', this.tags[j]);
      if(j < this.tags.length-1) {
        tag_string += '<a title="Tag: '+tag.name+'" href="..?tag='+tag.name+'">'+tag.getHtml('yes', 'yes')+'</a>, ';
      } else if(j==this.tags.length-1) {
        tag_string += '<a title="Tag: '+tag.name+'" href="..?tag='+tag.name+'">'+tag.getHtml('yes', 'yes')+'</a>';
      }
    }
    return tag_string;    
  }
  getTagsHtmlNolink() {
    let tag_string = '<b>Tags</b>: ';
    for(let j=0; j<this.tags.length; j++) {
      if(j<this.tags.length-1) {
        tag_string += '<span class="tag">'+this.tags[j]+'</span>, ';
      } else if(j==this.tags.length-1) {
        tag_string += '<span class="tag">'+this.tags[j]+'</span>';
      }
    }
    return tag_string;
  }
  getDisplayCellHtml() {
    let returnValue = '<div data-added-action="false" data-code="'+this.code+'" class="grid-item" id="link_to_'+this.code+'">'+
                '<div class="image-container"><a href="/watch?code='+this.code+'">'+
                  '<img loading="lazy" src="'+this.thumbnail+'" alt="thumbnail of '+this.code+'"/>'+
                '</a></div>'+
                '<div class="flex-container">'+
                  '<a href="/watch?code='+this.code+'"><div class="text-container">'+
                    '<p title="'+this.rjCode+' - '+this.engName+'" class="multiline-ellipsis">'+'<b><i>'+this.rjCode+'</i></b> - <span>'+this.engName+'</span></p>'+
                  '</div></a>'+
                  '<div class="text-container">'+
                    '<p class="singleline-ellipsis">'+this.getCvsHtml()+'</p>'+
                  '</div>'+
                '</div>'+
                '<!--<div class="info-button" code="'+this.code+'">i</div>-->'+
            '</div>';
    return returnValue.replace(/\s+/g, ' ');  
  }
  getHiddenDataHtml() {
    let returnValue = '<div class="hidden-info" id="hidden_info_of_'+this.code+'">'
              +'<div class="image-container"><img loading="lazy" src="'+this.thumbnail+'" alt="thumbnail of "'+this.code+'></div>'
              +'<h3><b>RJ Code</b>: '+this.rjCode+'</h3>'
              +(this.series?'<h3><b>Series</b>: <span class="series">'+this.series+'</span></h3>':'')
              +'<h3><b>Eng Name</b>: '+this.engName+'</h3>'
              +'<h3><b>Original Name</b>: '+this.japName+'</h3>'
              +'<h3>'+this.getCvsHtml().substring(4)+'</h3>'
              +'<h3>'+this.getTagsHtmlNolink()+'</h3>'
            +'</div>';
    return returnValue.replace(/\s+/g, ' '); 
  }
  getDisplayContentHtml() {
    let returnValue = '<a href="../watch?code='+this.code+'"><div class="imgcontainer"><img loading="lazy" src="'+this.thumbnail+'" alt="thumbnail of '+this.code+'"></div>'
                    +'<div class="text-box"><p class="content-p"><b><i>'+this.rjCode+'</i></b> - '+this.engName+'</p></div>'
                    +'</a>';
    return returnValue.replace(/\s+/g, ' ');
  }
}
class SearchResult {
  constructor(type, value, keyword, code) {
    this.type = type;
    this.value = value;
    this.keyword = keyword;
    this.code = code;
    this.displayType = window.utils.convertToTitleCase(this.type);
  }
  
  getSRHtml() {
    let value = window.utils.highlight(this.value, this.keyword);
    let href = ``;
    if(this.type == 'cv' || this.type == 'tag' || this.type == 'series')
      href = `..?${this.type}=${this.value}`
    else
      href = `../watch?code=${this.code}`;
    return `<a href="${href}">🔎 <strong>${this.displayType}</strong>: <span class="cnt">${value}</span></a>`;
  }
}
class Cv {
  constructor(name, count) {
    this.name = name;
    this.count = count;
  }
  
  getHtml(style, count) {
    if(style == 'no' && count == 'yes') {
      return `<span class="hover">${this.name} (${this.count})</span>`;
    }
    else if (style == 'yes' && count == 'no') {
      return `<span class="cv">${this.name}</span>`;
    }
    else if (style == 'yes' && count == 'yes') {
      return `<span class="cv">${this.name} (${this.count})</span>`;
    }
  }
}
class Tag {
  constructor(name, count) {
    this.name = name;
    this.count = count;
  }
  
  getHtml(style, count) {
    if(style == 'no' && count == 'yes') {
      return `<span class="hover">${this.name} (${this.count})</span>`;
    }
    else if (style == 'yes' && count == 'no') {
      return `<span class="tag">${this.name}</span>`;
    }
    else if (style == 'yes' && count == 'yes') {
      return `<span class="tag">${this.name} (${this.count})</span>`;
    }
  }
}
class Series {
  constructor(name, count) {
    this.name = name;
    this.count = count;
  }
  
  getHtml(style, count) {
    if (style == 'yes' && count == 'no') {
      return `<span class="series">${this.name}</span>`;
    }
    else if (style == 'yes' && count == 'yes') {
      return `<span class="series">${this.name} (${this.count})</span>`;
    }
  }
}

window.classes = {
  Track: Track,
  SearchResult: SearchResult,
  Cv: Cv,
  Tag: Tag,
  Series: Series
}