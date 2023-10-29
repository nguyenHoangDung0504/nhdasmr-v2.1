(function leakData() {
  let codes = [
      1,
      6265,
      8390,
      19178,
      20055,
      23580,
      31826,
      32791,
      33002,
      33106,
      35998,
      38274,
      38876,
      41099,
      45123,
      46213,
      48337,
      48474,
      48817,
      48878,
      50613,
      50816,
      51046,
      51289,
      51491,
      51602,
      51918,
      52130,
      52506,
      52993,
      53014,
      53134,
      53311,
      53520,
      53983,
      53993,
      54338,
      54342,
      54417,
      54749,
      54829,
      55385,
      56709,
      56735,
      56829,
      57544,
      57648,
      58273,
      59138,
      60497,
      60604,
      60827,
      61286,
      61735,
      61841,
      62234,
      62248,
      62673,
      62951,
      63119,
      63345,
      63721,
      64135,
      64676,
      65047,
      65789,
      65793,
      65932,
      66870,
      67073,
      67108,
      67197,
      67423,
      67990,
      68317,
      68344,
      68446,
      69272,
      69274,
      69670,
      70239,
      70249,
      70437,
      70545,
      70549,
      70559,
      70744,
      70855,
      71004,
      71191,
      71419,
      71765,
      71789,
      71846,
      72339,
      72361,
      72371,
      72373,
      72385,
      73273,
      73353,
      73684,
      74317,
      74581,
      74842,
      75252,
      75264,
      75342,
      75401,
      75549,
      75578,
      75602,
      75921,
      75923,
      76192,
      76230,
      76364,
      76368,
      76737,
      76778,
      76798,
      77015,
      77055,
      77079,
      77471,
      78234,
      78358,
      78560,
      78568,
      78704,
      78779,
      78915,
      78957,
      79035,
      79318,
      79406,
      79438,
      79781,
      79828,
      79846,
      79892,
      80129,
      80247,
      80550,
      80993,
      81031,
      81409,
      81427,
      81439,
      81777,
      81817,
      88888,
      95894,
      95930,
      95970,
      95986,
      96253,
      96557,
      96583,
      96589,
      96639,
      96647,
      96731,
      97022,
      97305,
      97357,
      97409,
      97433,
      98389,
      99172,
      99218,
      99248,
      99284,
      101296,
      102368,
      102406,
      102412,
      102424
  ]
  function getTagArr() {
    let arr_tags = [
        "3D",
        "<i><b>[Haitatsuin Ni Saimin (Series)]</b></i>",
        "<i><b>[Oma*ko Gakuen (Series)]</b></i>",
        "<i><b>[Ripe Woman (Series)]</i></b>",
        "<i><b>[全編ゆるオホ (Series)]</b></i>",
        "AI一部利用",
        "ASMR",
        "Ahegao",
        "Anal",
        "Angel",
        "Animal Ears",
        "Animation",
        "Armpit",
        "Assjob",
        "Big Breasts",
        "Bitch",
        "Blowjob",
        "Breast Sex",
        "Breasts",
        "Bunny Girl",
        "Buttocks",
        "Cheating",
        "Cheerleader",
        "Childhood Friend",
        "Chubby",
        "Classmate",
        "Cosplay",
        "Deepthroat",
        "Demon",
        "Dirty Talk",
        "Ear Licking",
        "Elf",
        "English",
        "Facesitting",
        "Fetish",
        "Foot Job",
        "Futanari",
        "Gal",
        "Girlfriend",
        "Glasses",
        "Group Sex",
        "Gym Clothes",
        "Hand Job",
        "Harem",
        "Housewife",
        "Idol",
        "Incest",
        "Kissing",
        "Kouhai",
        "Kuudere",
        "Licking",
        "Loli",
        "Lotion",
        "Magical Girl",
        "Maid",
        "Milf",
        "Monster Girl",
        "Mother",
        "Naughty",
        "Nipple Licking",
        "Nurse",
        "Oneesan",
        "Peeing",
        "Perverted",
        "Pregnancy",
        "Queen/Princess",
        "Rape",
        "School",
        "School Girl",
        "School Swimwear",
        "School Uniform",
        "Sister",
        "Sister-In-Law",
        "Smell Fetish",
        "Stockings",
        "Succubus",
        "Swimwear",
        "Tailjob",
        "Tanned Skin",
        "Teacher",
        "Tease",
        "Tentacle",
        "Thighjob",
        "Trap",
        "Tsundere",
        "Twin Tail",
        "Twins",
        "Uniform",
        "Vampire",
        "Virgin Female",
        "Vtuber",
        "Yandere",
        "Yuri"
    ]
    let tags = document.querySelectorAll('.post-meta.post-tags a');
    let tags_after = [];
    for(let i=0; i<tags.length; i++) {
      if( tags[i].textContent.indexOf('Student') != -1 ) {
        tags_after.push('School Girl');
        continue;
      }
      for(let j=0; j<arr_tags.length; j++) {
        if( tags[i].textContent.indexOf(arr_tags[j]) != -1 && tags_after.indexOf(arr_tags[j]) == -1) {
          tags_after.push(arr_tags[j]);
        }
      }
    }
    console.log(tags_after.sort());
    return tags_after; 
  }

  function getData() {
    let ps = document.querySelectorAll('p');
    let data = {
      japName: ps[1].textContent,
      cvs: ps[2].textContent.split(': ')[1],
      rjCode: ps[3].textContent.split(': ')[1]
    }
    console.table(data);
    return data;
  }

  function generateUploadCode() {
    let data = getData();
    if(codes.indexOf( Number(location.href.match(/\d+/)[0]) ) != -1) {
      alert('Trùng code!');
      return;
    }
    let str = `pushData(${location.href.match(/\d+/)[0]}, "${data.rjCode}", "${data.cvs.replaceAll(', ',',')}", "${data.japName}", "engName", "thumbnail", "${getTagArr().join(',')}", "imgs", "tracks");`;
    if (window.confirm('Xác nhận sao chép')) {
      navigator.clipboard.writeText(str)
        .then(() => {console.log('Đã sao chép.')})
        .catch(error => {console.error('Lỗi khi sao chép', error)});
    }
    return str;
  }
  return generateUploadCode();  
})();

(function downloadAudio(){
  let dl_buttons = document.querySelectorAll('.download-btn');
  for (let i = 0; i < dl_buttons.length; i++) {
    dl_buttons[i].click();
  }  
})();

//==========================================================================================================================

function downloadAllImage(code, imgs) {
  imgs.forEach((imageElement, index) => {
    const imageUrl = imageElement.src;
    const imageName = `${code} (${index + 1}).jpg`;

    const downloadLink = document.createElement('a');
    downloadLink.href = imageUrl;
    downloadLink.download = imageName;
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  });  
}

function getImages(rjCode) {
  let result = [];
  let srcs = [];
  let imgs = document.querySelectorAll('img');
  for(let i=0; i<imgs.length; i++) {
    if(imgs[i].src.indexOf(rjCode) != -1 && srcs.indexOf(imgs[i].src) == -1) {
      result.push(imgs[i]);
      srcs.push(imgs[i].src);
    }
  }
  console.log(result.sort());
  return result;
}
getImages('');

//===========================================================================================================================

