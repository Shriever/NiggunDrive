import React from 'react';
import { IoPlaySharp, IoPauseSharp } from 'react-icons/io5';

type Props = {
  isPlaying: boolean;
  onPlayPauseClick: React.Dispatch<React.SetStateAction<boolean>>;
};

const PlayPause = ({ isPlaying, onPlayPauseClick }: Props) => {
  const size = '1.2em';
  return (
    <button
      onClick={() => {
        onPlayPauseClick(!isPlaying);
      }}
      className='rounded-full bg-green-500 w-7 h-7 flex items-center justify-center text-white text-lg mr-2'
    >
      {isPlaying ? (
        <IoPauseSharp className="pl-0.5" size={size} />
      ) : (
        <IoPlaySharp className="pl-1" size={size} />
      )}
    </button>
  );
};

export default PlayPause;
