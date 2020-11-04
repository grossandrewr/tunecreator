import 'regenerator-runtime/runtime';

import * as Tone from 'tone';

let title = document.getElementById("title");
let titleText = title.innerText;
console.log(titleText);

const notes = ["C", "D", "E", "F", "G", "G#", "A#"]
const bassNotes = ["C", "F", "G", "A#"]
//create a synth and connect it to the main output (your speakers)

const synthA = new Tone.Synth().toDestination();
const synthB = new Tone.AMSynth().toDestination();

//create a distortion effect
const distortion = new Tone.Distortion(0.05).toDestination();
//connect a player to the distortion
synthA.connect(distortion);
synthB.connect(distortion);

const loopA = new Tone.Loop( (time) => {
  let note = Math.floor(Math.random() * bassNotes.length);
  synthA.triggerAttackRelease(bassNotes[note].toString()+"3", "1n");
}, "1n").start(0);

let up = 1;
let interval = 1;
let rand = 0;
let randTwo = 0;
let note = 4;

const loopB = new Tone.Loop( (time) => {
  rand = Math.random();
  randTwo = Math.random();
  if (rand>.85){
    up = -1*up;
  }
  if (randTwo<.6){
    interval=1
  } else {
    interval = 2;
  }
  note = (note+up*interval+notes.length)%notes.length;
  synthB.triggerAttackRelease(notes[note].toString()+"4", "4n");
  title.innerText = title.innerText.slice(notes[note].length)+notes[note];
}, "4n").start(0);


//attach a click listener to a play button
document.getElementById('start')?.addEventListener('click', async () => {
  await Tone.start();
  console.log('audio is ready');
  Tone.Transport.start()
});

document.getElementById('play')?.addEventListener('click', async () => {
  Tone.Transport.stop()

});
