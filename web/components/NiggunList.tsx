import React, { useState } from 'react';
import Niggun from './Niggun';

export type Track = {
  title: string;
  audioSrc: any;
};

type Props = { tracks: Track[] };

const NiggunList = ({ tracks }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className='mx-auto max-w-sm md:max-w-xl mt-6'>
      {tracks.map((track, idx) => (
        <Niggun key={idx} track={track} isPlaying={isPlaying} />
      ))}
    </div>
  );
};

export default NiggunList;
