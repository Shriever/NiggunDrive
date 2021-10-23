export const formatTime = (seconds: number) => {
  seconds = Math.floor(seconds);
  if (seconds < 10) {
    return `00:0${seconds}`;
  } else if (seconds < 60) {
    return `00:${seconds}`;
  } else {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes < 10 && remainingSeconds < 10) {
      return `0${minutes}:0${remainingSeconds}`;
    } else if (minutes < 10) {
      return `${minutes}:${remainingSeconds}`;
    } else if (remainingSeconds < 10) {
      return `${minutes}:0${remainingSeconds}`;
    } else {
      return `${minutes}:${remainingSeconds}`;
    }
  }
};
