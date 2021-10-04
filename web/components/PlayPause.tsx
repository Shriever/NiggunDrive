import React, { useState } from 'react';
import { IoPlayOutline, IoPauseOutline } from 'react-icons/io5';

const PlayPause = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <button
      onClick={() => {
        setIsPlaying(!isPlaying);
      }}
      className='rounded'
    >
      {isPlaying ? <IoPauseOutline /> : <IoPlayOutline />}
    </button>
  );
};

export default PlayPause;
