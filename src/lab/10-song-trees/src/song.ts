import songUrl from './assets/lindenmayr-song.mp3';

const song = new Audio(songUrl);

let canPlayThrough = false;

[
  'playing',
  'waiting',
  'seeking',
  'seeked',
  'ended',
  'loadedmetadata',
  'loadeddata',
  'canplay',
  'canplaythrough',
  'durationchange',
  'timeupdate',
  'play',
  'pause',
  'ratechange',
  'volumechange',
  'suspend',
  'emptied',
  'stalled',
].forEach((eventType) => {
  song.addEventListener(eventType, ({ type }: Event) => {
    // console.log(eventType, type); // tslint:disable-line
    canPlayThrough =
      canPlayThrough || type === 'canplaythrough' || type === 'loadedmetadata';
  });
});

export default {
  play(): void {
    song.play().catch(({ name, message }) => {
      console.log(name, message); // tslint:disable-line
    });
  },

  get canPlayThrough(): boolean {
    return canPlayThrough;
  },
};
