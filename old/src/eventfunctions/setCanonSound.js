var sound_shutter = new Howl({
    src: ['src/sounds/shutter.mp3'],
    html5: true,
    loop: false
});

var sound_rewind = new Howl({
    src: ['src/sounds/rewind.mp3'],
    html5: true,
    loop: false
});

function setCanonSound(event) {

    sound_shutter.pause();
    sound_rewind.pause();

    Howler.volume(1);
    if ((canonState.arm) && (canonState.triggered) && (canonState.loaded) ){
        sound_shutter.play();
        canonState.triggered = false;
        canonState.loaded = false;
        canonState.hold = false;
        
    } else if ((canonState.loaded) && (canonState.hold == false)){

        canonState.hold = true;
        sound_rewind.play();
    } else {
        Howler.volume(0);
    }
}
