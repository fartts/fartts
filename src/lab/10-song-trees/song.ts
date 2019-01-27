import songUrl from './assets/lindenmayr-song.mp3';

const song = new Audio(songUrl);
song.autoplay = true;
song.pause();

let canPlayThrough = false;

song.addEventListener('canplaythrough', () => {
  canPlayThrough = true;
});

export default {
  play() {
    song.play().catch(({ name, message }) => {
      console.log(name, message); // tslint:disable-line
    });
  },

  get canPlayThrough() {
    return canPlayThrough;
  },
};
