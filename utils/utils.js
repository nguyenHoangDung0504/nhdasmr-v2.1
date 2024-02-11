window.utils = {
  getStartAndEnd: 'Lấy index của track đầu tiên và track cuối cùng của trang "page"',
  getGroup: 'Lấy group Pagination',
  addQuery: 'Thêm giá trị get vào url',
  shuffleArr: 'Xáo trộn mảng',
  highlight: 'Highlight kết quả tìm kiếm',
  removeHighlight: 'Loại bỏ highlight',
  convertToTitleCase: 'Xử lý string: abcDef -> Abc Def, abc -> Abc,...'
}

window.utils.getStartAndEnd = (page, trackPerPage, limitTrack)=>{
  let start0 = 0, 
      end0 = trackPerPage - 1,
      pageCount = 1;
  while(pageCount != page) {
    start0 += trackPerPage;
    end0 += trackPerPage;
    pageCount++;
  }
  end0 = end0>limitTrack ? limitTrack : end0;
  return {
    start: start0,
    end: end0
  }
}
window.utils.getGroup = (currentPage, pagePerGroup, limitPage)=>{
  pagePerGroup = pagePerGroup>limitPage ? limitPage : pagePerGroup
  // Xử lý trường hợp đặc biệt khi pagePerGroup là 2
  if (pagePerGroup === 2) {
    if (currentPage === 1) {
      return [1, 2];
    }
    if (currentPage === limitPage) {
      return [limitPage - 1, limitPage];
    }
  }

  // Xử lý trường hợp đặc biệt khi currentPage nằm ở đầu hoặc cuối mảng
  if (currentPage === 1) {
    const endPage = Math.min(limitPage, currentPage + pagePerGroup - 1);
    return Array.from({ length: endPage }, (_, i) => i + 1);
  }
  if (currentPage === limitPage) {
    const startPage = Math.max(1, currentPage - pagePerGroup + 1);
    return Array.from({ length: pagePerGroup }, (_, i) => startPage + i);
  }

  // Xử lý trường hợp chung
  const halfGroupSize = Math.floor(pagePerGroup / 2);
  let startPage = currentPage - halfGroupSize;
  let endPage = currentPage + halfGroupSize;

  // Kiểm tra và điều chỉnh startPage và endPage nếu chúng vượt quá giới hạn
  if (startPage < 1) {
    const adjustment = 1 - startPage;
    startPage += adjustment;
    endPage += adjustment;
  }
  if (endPage > limitPage) {
    const adjustment = endPage - limitPage;
    endPage -= adjustment;
    startPage -= adjustment;
    if (startPage < 1) {
      startPage = 1;
    }
  }

  // Tạo mảng kết quả
  const pageArray = Array.from(
    { length: pagePerGroup },
    (_, i) => startPage + i
  );

  return pageArray;  
}
window.utils.addQuery = (key, value) =>{
  let currentLink = window.location.href;
  let url = new URL(currentLink);
  let queryParams = url.searchParams;

  if (queryParams.has(key)) {
    queryParams.set(key, value);
  } else {
    queryParams.append(key, value);
  }

  return url.toString();
}
window.utils.shuffleArray = (array)=>{
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while(currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
window.utils.highlight = (text, search)=>{
  let regexp = new RegExp(search, 'i');
  return text.toString().replace(regexp, `<span class="highlight">$&</span>`);
}
window.utils.removeHighlight = (text)=>{
  let regex = /<span class="highlight">([\s\S]*?)<\/span>/gi;
  return text.toString().replace(regex, '$1');
}
window.utils.convertToTitleCase = (str)=>{
  let formattedStr = str.replace(/([A-Z])/g, ' $1');
  formattedStr = formattedStr.replace(/([a-z])([A-Z])/g, '$1 $2');
  formattedStr = formattedStr.replace(/\b\w/g, (match) => match.toUpperCase());
  return formattedStr;
}