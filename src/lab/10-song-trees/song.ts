import songUrl from './assets/Lindenmayr Song - 12_23_18, 6.35 AM.mp3';

const song = new Audio(songUrl);

let canPlayThrough = false;
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
