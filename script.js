class DrumKit{
    constructor(){
        this.pads=document.querySelectorAll('.pad');
        this.playBtn=document.querySelector('.play');
        this.currentKick='./BeatSounds/kick-classic.wav';
        this.currentSnare='./BeatSounds/snare-acoustic01.wav';
        this.currentHihat='./BeatSounds/hihat-acoustic01.wav';
        this.kickAudio=document.querySelector('.kick-sound');
        this.snareAudio=document.querySelector('.snare-sound');
        this.hihatAudio=document.querySelector('.hihat-sound');
        this.index=0;
        this.bpm=200;
        this.isPlaying=null;
        this.click=0;
        this.selects=document.querySelectorAll('select');
        this.muteBtns=document.querySelectorAll('.mute');
        this.tempoSlider=document.querySelector('.tempo-slider');
        this.themeBtn=document.querySelector('.theme-btn');
        this.volumeSlider=document.querySelectorAll('.volume-slider');

    }
    toggleText(){
        if(this.click%2===0){
            this.playBtn.innerText='Stop';
        }
        else{
            this.playBtn.innerText='Play';
        }
        this.click++;
    }
    activePad(){
        this.classList.toggle('active');
    }
    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        //Loop over pads
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            if(bar.classList.contains('active')){
                //Check each sound
                if(bar.classList.contains('kick-pad')){
                    this.kickAudio.currentTime=0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains('snare-pad')){
                    this.snareAudio.currentTime=0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains('hihat-pad')){
                    this.hihatAudio.currentTime=0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }
    start(){
        const interval = (60/this.bpm)*1000;
        //Check if playing
        if(!this.isPlaying){
            this.isPlaying= setInterval(()=> {
                this.repeat();
            }, interval);   
        }
        else{
            //Clear interval
            clearInterval(this.isPlaying);
            this.isPlaying=null;
        }
    }
    changeSound(e){
        const selectionName=e.target.name;
        const selectionValue=e.target.value;
        switch(selectionName){
            case "kick-select":
                this.kickAudio.src=selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src=selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src=selectionValue;
                break;

        }
    }
    mute(e){
        const muteIndex = e.target.getAttribute('data-track');
        e.target.classList.toggle('active');
        if(e.target.classList.contains('active')){
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume=0;
                    break;
                case "1":
                    this.snareAudio.volume=0;
                    break;
                case "2":
                    this.hihatAudio.volume=0;
                    break;
            }
        }
        else{
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume=1;
                    break;
                case "1":
                    this.snareAudio.volume=1;
                    break;
                case "2":
                    this.hihatAudio.volume=1;
                    break;
            }
        }
    }
    changeTempo(e){
        const tempoText=document.querySelector('.tempo-number');
        this.bpm=e.target.value;
        tempoText.innerText=e.target.value;

    }
    updateTempo(){
        clearInterval(this.isPlaying);
        this.isPlaying=null;
        const playBtn=document.querySelector('.play');
        if(this.click%2!=0){
            this.start();
        }
    }
    updateVolume(e){
        const volumeValue=e.target.value;
        console.log(e.target.classList);
        if(e.target.classList.contains('kick')){
            this.kickAudio.volume=volumeValue/100;
        }
        if(e.target.classList.contains('snare')){
            this.snareAudio.volume=volumeValue/100;
        }
        if(e.target.classList.contains('hihat')){
            this.hihatAudio.volume=volumeValue/100;
        }
        
    }
    
}


const drumKit = new DrumKit();

//Event listeners

drumKit.pads.forEach(pads => {
    pads.addEventListener('click',drumKit.activePad);
    pads.addEventListener('animationend', function(){
        this.style.animation="";
    });
});

drumKit.playBtn.addEventListener('click', ()=>{
    drumKit.start();
    drumKit.toggleText();
});

drumKit.selects.forEach(select => {
    select.addEventListener('change',function(e){
        drumKit.changeSound(e);
    });
});

drumKit.muteBtns.forEach(btn => {
    btn.addEventListener('click', function(e){
        drumKit.mute(e);
    });
});

drumKit.tempoSlider.addEventListener('input', function(e){
    drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener('change', function(e){
    drumKit.updateTempo(e);
});

drumKit.volumeSlider.forEach(input =>{
    input.addEventListener('change',function(e){
        drumKit.updateVolume(e);
    });
});










