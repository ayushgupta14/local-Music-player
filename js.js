console.log("play some we rollin");

// let track = new Audio("musics/werollin.mp3");

let nowplaying = document.querySelector(".nowplaying");
let trackart = document.querySelector(".trackart");
let trackname = document.querySelector(".trackname");
let trackartist = document.querySelector(".trackartist");

let playpause = document.getElementById('playpause');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

let currtime = document.querySelector(".currenttime");
let totduration = document.querySelector(".totalduration");
let seekslider = document.querySelector(".seekslider");
let volslider = document.querySelector(".volumeslider");

let trackindex = 0;
let playing = false;
let updatetimer;

let currtrack = document.createElement('audio');

let tracklist = [
    {
        name: "We Rollin",
        artist: "Shubh",
        Image: "posters/poster.jpg",
        path: "musics/werollin.mp3"
    },

    {
        name: "8 Saal",
        artist: "Emiway",
        Image: "posters/poster3.jpg",
        path: "musics/8saal.mp3"
    },

    {
        name: "2 Step",
        artist: "Ed Sheeran",
        Image: "posters/poster2.jpg",
        path: "musics/2step.mp3"
    },

    {
        name: "Mera",
        artist: "Emiway",
        Image: "posters/poster4.jpg",
        path: "musics/Mera.mp3"
    }
];

function loadtrack(trackindex) {
    clearInterval(updatetimer);
    resetValues();

    currtrack.src = tracklist[trackindex].path;
    currtrack.load();

    trackart.style.backgroundImage = "url(" + tracklist[trackindex].Image + ")";
    trackname.textContent = tracklist[trackindex].name;
    trackartist.textContent = tracklist[trackindex].artist;

    nowplaying.textContent = "PLAYING " + (trackindex + 1) + " OF " + tracklist.length;


    updatetimer = setInterval(seekUpdate, 1000);

    currtrack.addEventListener("ended", nextone);
}

function resetValues() {
    currtime.textContent = "00:00";
    totduration.textContent = "00:00";
    seekslider.value = 0;
}

function playtrack() {
    currtrack.play();
    playing = true;

    playpause.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pausetrack() {
    currtrack.pause();
    playing = false;

    playpause.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function playpausetrack() {
    if(!playing) playtrack();
    else pausetrack();
}

function previous(){
    if(trackindex > 0){
        trackindex -= 1;
    }
    else trackindex = tracklist.length - 1;

    loadtrack(trackindex);
    playtrack();
}

function nextone(){
    if(trackindex < tracklist.length - 1){
        trackindex += 1;
    }
    else trackindex = 0;

    loadtrack(trackindex);
    playtrack();
}

function lyrics(){
    if(!playing) playtrack();
    else pausetrack();
}

function seekTo() {
    seekto = currtrack.duration * (seekslider.value / 100);

    currtrack.currentTime = seekto;
    
}

function changeto() {
    currtrack.volume = volslider.value / 100;
}

function seekUpdate() {
    let seekposition = 0;

    if(!isNaN(currtrack.duration)) {
        seekposition = currtrack.currentTime * (100 / currtrack.duration);
        seekslider.value = seekposition;

        let currentmin = Math.floor(currtrack.currentTime / 60);
        let currentsec = Math.floor(currtrack.currentTime - currentmin * 60);

        let durationmin = Math.floor(currtrack.duration / 60);
        let durationsec = Math.floor(currtrack.duration - durationmin * 60);

        if(currentmin < 10) {currentmin = "0" + currentmin;}
        if(currentsec < 10) {currentsec = "0" + currentsec;}
        if(durationmin < 10) {durationmin = "0" + durationmin;}
        if(durationsec < 10) {durationsec = "0" + durationsec;}

        currtime.textContent = currentmin + ":" + currentsec;
        totduration.textContent = durationmin + ":" + durationsec;
    }
}



loadtrack(trackindex);













