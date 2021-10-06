import React, { useRef, useState, useEffect } from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import PlayPause from './PlayPause';
import { Track } from './NiggunList';

type Props = {
  track: Track;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  intervalRef: React.MutableRefObject<NodeJS.Timer | undefined>;
  trackIndex: number;
  setTrackIndex: React.Dispatch<React.SetStateAction<number>>;
};

const Niggun = ({
  track,
  isPlaying,
  setIsPlaying,
  intervalRef,
  trackIndex,
  setTrackIndex,
}: Props) => {
  const formatTime = (seconds: number) => {
    console.log(seconds);

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
  if (typeof Audio === 'undefined') {
    return <div></div>;
  }

  const [isLiked, setIsLiked] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);

  // const isReady = useRef(false);
  const audioRef = useRef(new Audio(track.audioSrc));
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
    // Clear any timers already running
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

  //   const currentPercentage = duration
  //     ? `${(trackProgress / duration) * 100}%`
  //     : '0%';
  //   const trackStyling = `
  //   -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  // `;

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
            // style={{ background: trackStyling }}
          />
        </div>
      </div>
    </div>
  );
};

export default Niggun;
