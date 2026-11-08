'use client';

//import { useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
export function BackgroundMusic({
  onReady,
}: {
  onReady: (play: () => Promise<void>) => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const startMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Unable to play music:', error);
    }
  };
  useEffect(() => {
    onReady(startMusic);
  }, [onReady]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await startMusic();
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/wedding.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        type="button"
        className="music-control"
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? <Pause size={17} /> : <Play size={17} />}
      </button>
    </>
  );
}
