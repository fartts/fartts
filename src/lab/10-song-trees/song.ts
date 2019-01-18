import songUrl from './assets/lindenmayr-song.mp3';

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
