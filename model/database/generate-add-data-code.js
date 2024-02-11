let addStr = ``;
window.database.listTrackNewest.forEach((track)=>{
   addStr += `addTrack(${track.code}, "${track.rjCode}", "${track.cvs.join(',')}", "${track.tags.join(',')}", "${track.series}", "${track.engName}", "${track.japName}", "${track.thumbnail}", "${track.images.join(',')}", "${track.audios.join(',')}")\n`; 
});
console.log(addStr);