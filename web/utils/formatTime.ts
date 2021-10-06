export const formatTime = (seconds: number) => {
  seconds = Math.floor(seconds);
  if (seconds < 10) {
    return `00:0${seconds}`;
  } else if (seconds < 60) {
    return `00:${seconds}`;
  } else {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes < 10 && seconds < 10) {
      return `0${minutes}:0${seconds}`;
    } else if (minutes < 10) {
      return `0${minutes}:${seconds}`;
    } else if (seconds < 10) {
      return `${minutes}:0${seconds}`;
    } else {
      return `${minutes}:${seconds}`;
    }
  }
};
