import React, { useState } from 'react';
import Niggun from './Niggun';

export type Track = {
  id: number;
  title: string;
  link: string;
  length: number;
};

type Props = { tracks: Track[] };

const NiggunList = ({ tracks }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);

  return (
    <div className='mx-auto max-w-sm md:max-w-xl mt-6'>
      {tracks.map(track => {
        let isCurrPlaying = false;
        if (track.id === trackIndex) {
          isCurrPlaying = isPlaying;
        }
        return (
          <Niggun
            key={track.id}
            track={track}
            isPlaying={isCurrPlaying}
            setIsPlaying={setIsPlaying}
            trackIndex={track.id}
            setTrackIndex={setTrackIndex}
          />
        );
      })}
    </div>
  );
};

export default NiggunList;
