import React, { useRef, useState, useEffect } from 'react';
import audioFile from '../assets/sample-9s.mp3';
import PlayPause from './PlayPause';

const track = { audioSrc: audioFile, title: 'Best audio ever' };

const formatTime = (seconds: number) => {
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

const Niggun = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const intervalRef = useRef();
  const isReady = useRef(false);
  const audioRef = useRef(
    typeof Audio !== 'undefined' ? new Audio(track.audioSrc) : undefined
  );
  const duration = audioRef.current?.duration || 0;

  const onPlayPauseClick = (arg: boolean) => {

  }


  return (
    <div className='shadow mb-4 p-2'>
      <div className='flex'>
        <PlayPause isPlaying={isPlaying} onPlayPauseClick={onPlayPauseClick} />
        <span>{formatTime(duration)}</span>
        <h4>{track.title}</h4>
      </div>

      <div>
        <input type='range' min='0' />
      </div>
    </div>
  );
};

export default Niggun;
