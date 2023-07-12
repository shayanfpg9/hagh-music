export default function formatTime(time) {
  let min = ~~(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }

  let sec = ~~(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }

  return `${min}:${sec}`;
}
