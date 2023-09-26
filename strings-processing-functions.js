function getCodeFromLink(link) {
  const start = link.lastIndexOf('/')+1;
  const end = link.indexOf('(');
  return link.substring(start, end);
}
