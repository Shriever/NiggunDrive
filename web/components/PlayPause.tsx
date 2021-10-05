import React from 'react';
import { IoPlayOutline, IoPauseOutline } from 'react-icons/io5';

type Props = {
  isPlaying: boolean;
  onPlayPauseClick: (arg: boolean) => void;
};

const PlayPause = ({ isPlaying, onPlayPauseClick }: Props) => {
  return (
    <button
      onClick={() => {
        onPlayPauseClick(!isPlaying);
      }}
      className='rounded'
    >
      {isPlaying ? <IoPauseOutline /> : <IoPlayOutline />}
    </button>
  );
};

export default PlayPause;
