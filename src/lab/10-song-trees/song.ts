import songUrl from './assets/lindenmayr-song.mp3';

const song = new Audio(songUrl);
song.autoplay = true;
song.pause();

let canPlayThrough = false;

[
  'abort',
  'canplay',
  'canplaythrough',
  'durationchange',
  'emptied',
  'encrypted',
  'ended',
  'error',
  'interruptbegin',
  'interruptend',
  'loadeddata',
  'loadedmetadata',
  'loadstart',
  'mozaudioavailable',
  'pause',
  'play',
  'playing',
  'progress',
  'ratechange',
  'seeked',
  'seeking',
  'stalled',
  'suspend',
  'timeupdate',
  'volumechange',
  'waiting',
].forEach(eventName => {
  song.addEventListener(eventName, () => {
    console.log(eventName);
  });
});

song.addEventListener('canplaythrough', () => {
  canPlayThrough = true;
});

export default {
  play() {
    song.play();
  },

  get canPlayThrough() {
    return canPlayThrough;
  },
};
