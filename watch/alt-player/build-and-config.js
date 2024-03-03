'use strict';

let isPortrait = false;
const elem = document.documentElement;

const fullscreenBtn = document.querySelector('#fullscreen-btn')

const openFullscreen = () => {
    const icon = fullscreenBtn.querySelector('i');
    if (Array.from(icon.classList).includes('fa-expand')) {
        icon.classList.remove('fa-expand');
        icon.classList.add('fa-compress');
    }
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
    if (window.screen.width <= 600) {
        screen.orientation.lock('landscape');
    }
    isPortrait = false;
}

const closeFullscreen = () => {
    const icon = fullscreenBtn.querySelector('i');
    if (Array.from(icon.classList).includes('fa-compress')) {
        icon.classList.remove('fa-compress');
        icon.classList.add('fa-expand');
    }
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    screen.orientation.unlock();
}

const rolateScreen = () => {
    if (document.fullscreen) {
        if (isPortrait == true) { 
            screen.orientation.unlock(); 
            screen.orientation.lock('landscape'); 
            screen.orientation.lock('landscape'); 
            isPortrait = false; 
        }
        else { 
            screen.orientation.unlock(); 
            screen.orientation.lock('portrait'); 
            screen.orientation.lock('portrait'); 
            isPortrait = true; 
        }
    }
}

document.querySelector('#opn-cls-menu-btn').addEventListener('click', () => {
    document.body.classList.toggle('open-menu-ctn');
});
document.querySelector('#opn-cls-menu-mp3-btn').addEventListener('click', () => {
    document.body.classList.toggle('open-menu-mp3');
});
document.querySelector('#rolate-btn').addEventListener('click', rolateScreen);
document.querySelector('#reload-btn').addEventListener('click', ()=>{
    const listSrc = Array.from(document.querySelectorAll('audio, video, img.img[src]'));
    listSrc.forEach(ele => {
        ele.load();
    });
});

const alignBtn = document.querySelector('#align-btn')
alignBtn.addEventListener('click', () => {
    document.body.classList.toggle('menu-ctn-right');
    const icon = alignBtn.querySelector('i');
    if (Array.from(icon.classList).includes('fa-align-left')) {
        icon.classList.remove('fa-align-left');
        icon.classList.add('fa-align-right');
    } else if (Array.from(icon.classList).includes('fa-align-right')) {
        icon.classList.remove('fa-align-right');
        icon.classList.add('fa-align-left');
    }
});

fullscreenBtn.addEventListener('click', () => {
    document.fullscreen ? closeFullscreen() : openFullscreen();
});

const contentContainer = document.querySelector('.content-container');
const mp3Container = document.querySelector('.menu-mp3');

document.querySelector('#next-btn').addEventListener('click', ()=>{
    contentContainer.appendChild(contentContainer.firstChild);
});

document.querySelector('#prev-btn').addEventListener('click', ()=>{
    contentContainer.insertBefore(contentContainer.lastChild, contentContainer.firstChild);
});

const urlParams = new URLSearchParams(window.location.search);
let trackId = urlParams.get("code");
let track = window.databasefs.getTrackByCode(trackId) || window.databasefs.getTrackByRjCode(trackId);
if(!trackId || !track) {
  window.history.back();
}
document.title = "NHD ASMR - Alt Player: "+track.code;

if(!track.images.includes(track.thumbnail))
  track.images.unshift(track.thumbnail);

track.images.forEach(iov => {
  contentContainer.appendChild(iov.includes('.mp4') ? new window.classes.VideoPlayer(iov) : new window.classes.ImageDisplayer(iov, closeFullscreen, openFullscreen));
});
track.audios.forEach(src => {
  mp3Container.appendChild(new window.classes.AudioPlayer(src));
});
