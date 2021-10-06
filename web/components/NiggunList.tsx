import React, { useRef, useState, useEffect } from 'react';
import Niggun from './Niggun';

export type Track = {
  title: string;
  audioSrc: any;
};

type Props = { tracks: Track[] };

const NiggunList = ({ tracks }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);

  return (
    <div className='mx-auto max-w-sm md:max-w-xl mt-6'>
      {tracks.map((track, idx) => {
        let isCurrPlaying = false;
        if (idx === trackIndex) {
          isCurrPlaying = isPlaying;
        }
        return (
          <Niggun
            key={idx}
            track={track}
            isPlaying={isCurrPlaying}
            setIsPlaying={setIsPlaying}
            trackIndex={idx}
            setTrackIndex={setTrackIndex}
          />
        );
      })}
    </div>
  );
};

export default NiggunList;
