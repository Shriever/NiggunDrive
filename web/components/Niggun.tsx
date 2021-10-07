import React, { useRef, useState, useEffect } from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import PlayPause from './PlayPause';
import { Track } from './NiggunList';
import { formatTime } from '../utils/formatTime';

type Props = {
  track: Track;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  trackIndex: number;
  setTrackIndex: React.Dispatch<React.SetStateAction<number>>;
};

const Niggun = ({
  track,
  isPlaying,
  setIsPlaying,
  trackIndex,
  setTrackIndex,
}: Props) => {
  if (typeof Audio === 'undefined') {
    return <div></div>;
  }

  const [isLiked, setIsLiked] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);

  const audioRef = useRef(new Audio(track.audioSrc));
  const intervalRef = useRef<NodeJS.Timer>();
  const { duration } = audioRef.current;

  const startTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        // My code
        setIsPlaying(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isPlaying]);

  const onScrub = (value: string) => {
    setTrackIndex(trackIndex);
    const numValue = parseInt(value);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    audioRef.current.currentTime = numValue;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const onPlayPauseClick = (isPlay: boolean) => {
    setTrackIndex(trackIndex);
    setIsPlaying(isPlay);
  };

  const handleLike = () => {
    setIsLiked(true);
  };
  const handleUnlike = () => {
    setIsLiked(false);
  };

  return (
    <div suppressHydrationWarning={true}>
      <div className='shadow mb-4 p-4'>
        <div className='flex justify-between'>
          <div className='flex'>
            <PlayPause
              isPlaying={isPlaying}
              onPlayPauseClick={onPlayPauseClick}
            />
            <h4>{track.title}</h4>
          </div>
          {isLiked ? (
            <IoHeart
              onClick={handleUnlike}
              className='text-green-500 cursor-pointer transform hover:scale-110'
              size={'1.6em'}
            />
          ) : (
            <IoHeartOutline
              onClick={handleLike}
              className='text-green-500 cursor-pointer transform hover:scale-110'
              size={'1.6em'}
            />
          )}
        </div>

        <div className='flex items-center'>
          <span className='mr-2'>{formatTime(duration)}</span>
          <input
            type='range'
            step='0.1'
            min='0'
            max={duration ? duration : `${duration}`}
            value={trackProgress}
            onChange={e => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
          />
        </div>
      </div>
    </div>
  );
};

export default Niggun;
