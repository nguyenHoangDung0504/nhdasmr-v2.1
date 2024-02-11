'use strict'
console.time('Build database query functions time');
window.databasefs = {
  findSingleCvOrTag: 'Tìm và trả về 1 cv hoặc tag theo từ khóa',
  findCvOrTag: 'Tìm và trả về mảng cv hoặc tag theo từ khóa',
  getSearchSuggestions: 'Hàm trả về mảng các đối tượng gợi ý tìm kiếm',
  searchTracks: 'Hàm tìm kiếm các Track dựa trên từ khóa (không phân biệt hoa thường): Trả về một mảng gồm các đối tượng Track',
  getTracksByTag: 'Hàm lấy Track theo tag: Trả về một mảng gồm các đối tượng Track',
  getTracksByCV: 'Hàm lấy Track theo cv: Trả về một mảng gồm các đối tượng Track',
  getTracksBySeries: 'Hàm lấy Track theo series: Trả về một mảng gồm các đối tượng Track',
  getTrackByCode: 'Hàm lấy Track theo code: Trả về một đối tượng Track',
  getTrackByRjCode: 'Hàm lấy Track theo rjcode: Trả về một đối tượng Track',
  getRandomTracks: 'Lấy về một mảng các đối tượng Track ngẫu nhiên, không bị trùng lặp với nhiều lần gọi',
}
window.databasefs.findSingleCvOrTag = (type, keyword)=> {
  const lowerCaseKeyword = keyword.toLowerCase();
  let arrayToSearch, returnValue = '';
  
  if (type === 'cv') {
    arrayToSearch = [...window.database.listCv];
  } else if (type === 'tag') {
    arrayToSearch = [...window.database.listTag];
  } else {
    return '';
  }
  
  arrayToSearch.forEach((e)=>{
    if(e.name.toLowerCase() == lowerCaseKeyword)
      returnValue = e;
  })
  return returnValue;
}
window.databasefs.findCvOrTag = (type, keyword)=> {
  const lowerCaseKeyword = keyword.toLowerCase();
  let arrayToSearch;
  
  if (type === 'cv') {
    arrayToSearch = [...window.database.listCv];
  } else if (type === 'tag') {
    arrayToSearch = [...window.database.listTag];
  } else {
    return [];
  }

  const returnValue = arrayToSearch.filter(item => item.name.toLowerCase().includes(lowerCaseKeyword));

  returnValue.sort((a, b) => {
    const indexA = a.name.toLowerCase().indexOf(lowerCaseKeyword);
    const indexB = b.name.toLowerCase().indexOf(lowerCaseKeyword);
    return indexA - indexB;
  });
  // console.log(`\nSearch suggestions for the type: "${type}" and the key word: "${keyword}"`);
  // console.log(returnValue);
  return returnValue;
}
window.databasefs.getSearchSuggestions = (keyword, listTrack = window.database.listTrack) => {
  const lowerCaseKeyword = keyword.toString().toLowerCase();
  const results = [];
  const seen = new Set();

  listTrack.forEach((track) => {
    const lowerCaseCode = track.code.toString().toLowerCase();
    const lowerCaseRjCode = track.rjCode.toLowerCase();
    const lowerCaseJapName = track.japName.toLowerCase();
    const lowerCaseEngName = track.engName.toLowerCase();
    const lowerCaseSeries = track.series.toLowerCase();

    // Kiểm tra code
    if (lowerCaseCode.includes(lowerCaseKeyword) && !seen.has(`${track.code}_code`)) {
      results.push(new window.classes.SearchResult("code", track.code, keyword, track.code));
      seen.add(`${track.code}_code`);
    }
    // Kiểm tra rjCode
    if (lowerCaseRjCode.includes(lowerCaseKeyword) && !seen.has(`${track.rjCode}_rjCode`)) {
      results.push(new window.classes.SearchResult("rjCode", track.rjCode, keyword, track.code));
      seen.add(`${track.rjCode}_rjCode`);
    }
    // Kiểm tra cvs
    track.cvs.forEach((cv) => {
      const lowerCaseCv = cv.toLowerCase();
      if (lowerCaseCv.includes(lowerCaseKeyword) && !seen.has(`${cv}_cv`)) {
        results.push(new window.classes.SearchResult("cv", cv, keyword, track.code));
        seen.add(`${cv}_cv`);
      }
    });
    // Kiểm tra tags
    track.tags.forEach((tag) => {
      const lowerCaseTag = tag.toLowerCase();
      if (lowerCaseTag.includes(lowerCaseKeyword) && !seen.has(`${tag}_tag`)) {
        results.push(new window.classes.SearchResult("tag", tag, keyword, track.code));
        seen.add(`${tag}_tag`);
      }
    });
    // Kiểm tra engName
    if (lowerCaseEngName.includes(lowerCaseKeyword) && !seen.has(`${track.engName}_engName`)) {
      results.push(new window.classes.SearchResult("engName", track.engName, keyword, track.code));
      seen.add(`${track.engName}_engName`);
    }
    // Kiểm tra japName
    if (lowerCaseJapName.includes(lowerCaseKeyword) && !seen.has(`${track.japName}_japName`)) {
      results.push(new window.classes.SearchResult("japName", track.japName, keyword, track.code));
      seen.add(`${track.japName}_japName`);
    }
    // Kiểm tra series
    if (lowerCaseSeries.includes(lowerCaseKeyword) && !seen.has(`${track.series}_series`)) {
      results.push(new window.classes.SearchResult("series", track.series, keyword, track.code));
      seen.add(`${track.series}_series`);
    }
  });

  const typeOrder = ["code", "rjCode", "cv", "tag", "series", "engName", "japName"];

  results.sort((a, b) => {
    const keywordIndexA = a.value.toString().toLowerCase().indexOf(lowerCaseKeyword);
    const keywordIndexB = b.value.toString().toLowerCase().indexOf(lowerCaseKeyword);
    if (keywordIndexA !== keywordIndexB) {
      return keywordIndexA - keywordIndexB;
    }
    const typeComparison = typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type);
    if (typeComparison !== 0) {
      return typeComparison;
    }
    return a.value.toString().localeCompare(b.value.toString());
  });
  
  return results;
};
window.databasefs.searchTracks = (keyword, listTrack = window.database.listTrack) => {
  const lowerCaseKeyword = keyword.toString().toLowerCase();
  const results = [];

  // Tìm các Track có code, tên hoặc rjCode chứa từ khóa (không phân biệt hoa thường)
  listTrack.forEach((track, index) => {
    const lowerCaseCode = track.code.toString().toLowerCase();
    const lowerCaseRjCode = track.rjCode.toLowerCase();
    const lowerCaseJapName = track.japName.toLowerCase();
    const lowerCaseEngName = track.engName.toLowerCase();

    if (
      lowerCaseCode.includes(lowerCaseKeyword) ||
      lowerCaseRjCode.includes(lowerCaseKeyword) ||
      lowerCaseJapName.includes(lowerCaseKeyword) ||
      lowerCaseEngName.includes(lowerCaseKeyword)
    ) {
      results.push(index);
    }
  });

  // Tìm các Track có CV chứa từ khóa (không phân biệt hoa thường)
  listTrack.forEach((track, index) => {
    track.cvs.forEach((cv) => {
      const lowerCaseCv = cv.toLowerCase();
      if (lowerCaseCv.includes(lowerCaseKeyword) && !results.includes(index)) {
        results.push(index);
      }
    });
  });

  // Tìm các Track có tag chứa từ khóa (không phân biệt hoa thường)
  listTrack.forEach((track, index) => {
    track.tags.forEach((tag) => {
      const lowerCaseTag = tag.toLowerCase();
      if (lowerCaseTag.includes(lowerCaseKeyword) && !results.includes(index)) {
        results.push(index);
      }
    });
  });

  let returnValue = results
    .map((index) => listTrack[index])
    .sort((a, b) => b.code - a.code);

  return returnValue;
};
window.databasefs.getTracksByTag = (tag, listTrack = window.database.listTrack)=>{
  const lowerCaseTag = tag.toLowerCase();
  const tracks = [];
  listTrack.forEach(track => {
    if (track.tags.some(t => t.toLowerCase() === lowerCaseTag)) {
      tracks.push(track);
    }
  });
  // console.log(`\nSearch result for Tag: "${tag}"`);
  // console.log(tracks);
  return tracks;
}
window.databasefs.getTracksByCV = (cv, listTrack = window.database.listTrack)=>{
  const lowerCaseCV = cv.toLowerCase();
  const tracks = [];
  listTrack.forEach(track => {
    if (track.cvs.some(c => c.toLowerCase() === lowerCaseCV)) {
      tracks.push(track);
    }
  });
  // console.log(`\nSearch result for CV: "${cv}"`);
  // console.log(tracks);
  return tracks;
}
window.databasefs.findSingleSeries = (keyword)=> {
  const lowerCaseKeyword = keyword.toLowerCase();
  let arrayToSearch = window.database.listSeries, returnValue = '';
  arrayToSearch.forEach((e)=>{
    if(e.name.toLowerCase() == lowerCaseKeyword)
      returnValue = e;
  })
  return returnValue;
}
window.databasefs.getTracksBySeries = (series, listTrack = window.database.listTrack)=>{
  const lowerCaseSeries = series.toLowerCase();
  const tracks = [];
  listTrack.forEach(track => {
    if (track.series.toLowerCase() === lowerCaseSeries) {
      tracks.push(track);
    }
  });
  // console.log(`\nSearch result for Series: "${series}"`);
  // console.log(tracks);
  return tracks;  
}
window.databasefs.getTrackByCode = (code, listTrack = window.database.listTrack)=>{
  let rs = '';
  listTrack.forEach(track => {
    if (track.code == code) {
      rs = track;
    }
  });
  // console.log(`\nTrack have code "${code}":`);
  // console.log(rs);    
  return rs;
}
window.databasefs.getTrackByRjCode = (rjCode, listTrack = window.database.listTrack)=>{
  let rs = '';
  listTrack.forEach(track => {
    if (track.rjCode.toLowerCase() == rjCode.toLowerCase()) {
      rs = track;
    }
  });
  // console.log(`\nTrack have RJcode "${rjCode}":`);
  // console.log(rs);
  return rs; 
}
window.databasefs.getRandomTracks = (listTrack, n)=>{
  let shuffledIndexes = JSON.parse(localStorage.getItem('shuffledIndexes'));

  if (!shuffledIndexes || shuffledIndexes.length < n) {
    const remainingIndexes = Array.from(
      Array(!shuffledIndexes ? listTrack.length : listTrack.length - shuffledIndexes.length).keys()
    );
    window.utils.shuffleArray(remainingIndexes);
    if (!shuffledIndexes) {
      shuffledIndexes = remainingIndexes;
    } else {
      shuffledIndexes.push(...remainingIndexes);
    }
    localStorage.setItem('shuffledIndexes', JSON.stringify(shuffledIndexes));
  }

  const randomTracks = [];
  for (let i = 0; i < n; i++) {
    const trackIndex = shuffledIndexes[i];
    const track = listTrack[trackIndex];
    randomTracks.push(track);
  }

  shuffledIndexes = shuffledIndexes.slice(n);
  localStorage.setItem('shuffledIndexes', JSON.stringify(shuffledIndexes));

  return randomTracks;
}
console.timeEnd('Build database query functions time');

console.time('Database functions testing time');
window.databasefs.findCvOrTag('cv', '');
window.databasefs.findCvOrTag('tag', '');
window.databasefs.getSearchSuggestions('na');
window.databasefs.searchTracks('saka');
window.databasefs.getTracksByCV('narumi aisaka');
window.databasefs.getTracksByTag('elf');
window.databasefs.getTracksBySeries('ドスケベjKシリーズ');
window.databasefs.getTrackByCode('70855');
window.databasefs.getTrackByRjCode('Rj377038');
window.databasefs.getRandomTracks(window.database.listTrack, 10);
console.timeEnd('Database functions testing time');