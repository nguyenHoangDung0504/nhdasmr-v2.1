import data from "../database/database.js";

function log() {
  console.log(data.database);
  console.log(data.listToFilter);
  console.log(data.dataProcessing);  
}

document.querySelector('button#').onclick = log;