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
  for(let j=0; j<arr_tags.length; j++) {
    if( tags[i].innerHTML.indexOf(arr_tags[j]) != -1 ) {
      tags_after.push(arr_tags[j]);
    }
  }
}
console.log(tags_after);



//
let dl = document.querySelectorAll('.download-btn'); 
for(let i=0; i<=dl; i++) {
  dl[i].click();
}