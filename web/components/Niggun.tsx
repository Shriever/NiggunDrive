import React, { useRef, useState, useEffect } from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import PlayPause from './PlayPause';
import { Track } from './NiggunList';
import { formatTime } from '../utils/formatTime';
import {
  LikeMutation,
  useLikeMutation,
} from '../generated/graphql';
import { ApolloCache } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';

type Props = {
  track: Track;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  trackIndex: number;
  setTrackIndex: React.Dispatch<React.SetStateAction<number>>;
};

const updateAfterLike = (
  trackIndex: number,
  cache: ApolloCache<LikeMutation>
) => {
  const data = cache.readFragment<{ id: number; isLiked: boolean | null }>({
    id: 'Niggun:' + trackIndex,
    fragment: gql`
      fragment __ on Niggun {
        id
        isLiked
      }
    `,
  });

  if (data) {
    cache.writeFragment({
      id: 'Niggun:' + trackIndex,
      fragment: gql`
        fragment __ on Niggun {
          id
          isLiked
        }
      `,
      data: { isLiked: !data.isLiked },
    });
  }
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
  const router = useRouter();
  const [like] = useLikeMutation();
  const [trackProgress, setTrackProgress] = useState(0);

  const audioRef = useRef(new Audio(track.link));
  const intervalRef = useRef<NodeJS.Timer>();

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

  const handleLike = async () => {
    try {
      await like({
        variables: { niggunId: trackIndex },
        update: cache => updateAfterLike(trackIndex, cache),
      });
    } catch (err) {
      router.push('/login');
    }
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
            <h4 className='text-lg'>{track.title}</h4>
          </div>
          {track.isLiked ? (
            <IoHeart
              onClick={handleLike}
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
          <span className='mr-2'>
            {isPlaying || trackProgress > 0
              ? formatTime(trackProgress)
              : formatTime(track.length)}
          </span>
          <input
            type='range'
            step='0.1'
            min='0'
            max={track.length}
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
