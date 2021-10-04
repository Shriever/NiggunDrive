import React, { useRef } from 'react';
import audioFile from '../assets/sample-9s.mp3';
import PlayPause from './PlayPause';

const Niggun = () => {
  const audioRef = useRef(
    typeof Audio !== 'undefined' ? new Audio(audioFile) : undefined
  );
  return (
    <div>
      <div className='flex'>
        <PlayPause />
        <span>3:14</span>
        <h4>Best Niggun</h4>
      </div>
      <div></div>
    </div>
  );
};

export default Niggun;
