//create one of Tone's built-in synthesizers
var oscillator = [];
var numOsc = 20;

var chorus = new Tone.Chorus();
var filter = new Tone.Filter(300, "lowpass", -24);
var freeverb = new Tone.Freeverb(0.7, 0.3);
var eq = new Tone.EQ(1, 0.7, 0.3);

//if you want to change the chorus do "chorus."

chorus.connect(filter);
filter.connect(freeverb);
freeverb.connect(eq);
eq.toMaster();


for (var i = 0; i < numOsc; i++) {

    oscillator[i] = new Tone.Oscillator((200 * (i + 1)) / 50, "sine");

    //connect the synth to the master output channel
    oscillator[i].connect(chorus);
    oscillator[i].volume.value = -30;


    oscillator[i].start();
}

var newGreen;
var newRed;

nx.onload = function() {
    mousey.on("x", function(x) {
        //console.log(x);
        for (var i = 0; i < numOsc; i++) {
            oscillator[i].frequency.value = x * i * 200 + 200;
            oscillator[i].volume.value = -30;

        }
    });
    mousey.on("deltax", function(deltax) {
        console.log(deltax);
        //phaser.frequency.value = deltax;

    });

    mousey.on("y", function(y) {
        filter.frequency.value = (y * 1000) + 100;
        filter.Q.value = (1 - y) * 2;
        newGreen = Math.round(255 - y * 255);
        newRed = Math.round(y * 255);
        document.body.style.background = rgbToHex(newRed, newGreen, 255);

    });
};

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
