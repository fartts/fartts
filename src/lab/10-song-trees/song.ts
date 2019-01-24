import songUrl from './assets/lindenmayr-song.mp3';

const song = new Audio(songUrl);

let canPlayThrough = false;

/**
 * This preposterous hack is because Mobile Safari doesn't trigger
 * 'canplaythrough' until you actually call song.play() which you are not
 * allowed to do outside a UI event so we set it to autoplay and then call
 * song.pause() as soon as it starts loading which then triggers
 * 'canplaythrough' ... why
 */
song.autoplay = true;
song.addEventListener('loadstart', () => {
  song.pause();
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
