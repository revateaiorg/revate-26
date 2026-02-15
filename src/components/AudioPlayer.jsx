import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

export function AudioPlayer({ audioSrc }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const SKIP_AMOUNT = 5; // 5 seconds

  // Generate random heights for waveform bars
  const waveformBars = Array.from(
    { length: 30 },
    () => Math.floor(Math.random() * 60) + 20
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () =>
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, [audioSrc]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (audioRef.current) {
        setProgress(audioRef.current.currentTime);

        // Auto-pause when audio ends
        if (audioRef.current.ended) {
          setIsPlaying(false);
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        audioRef.current.currentTime - SKIP_AMOUNT
      );
      setProgress(audioRef.current.currentTime);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        duration,
        audioRef.current.currentTime + SKIP_AMOUNT
      );
      setProgress(audioRef.current.currentTime);
    }
  };

  return (
    <div className="flex items-center gap-6 ">
      <audio ref={audioRef} src={audioSrc} />

      <div className="flex items-center gap-3">
        {/* Skip Backward Button */}
        <button
          onClick={skipBackward}
          className="flex h-9 w-9 items-center justify-center rounded-full text-white hover:bg-[#373737] transition-all active:scale-95"
          aria-label="Skip backward 5 seconds"
        >
          <SkipBack className="h-5 w-5 cursor-pointer" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#484848] text-white transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 fill-white cursor-pointer" />
          ) : (
            <Play className="h-5 w-5 fill-white cursor-pointer" />
          )}
        </button>

        {/* Skip Forward Button */}
        <button
          onClick={skipForward}
          className="flex h-9 w-9 items-center justify-center rounded-full text-white hover:bg-[#373737] transition-all active:scale-95"
          aria-label="Skip forward 5 seconds"
        >
          <SkipForward className="h-5 w-5 cursor-pointer" />
        </button>
      </div>

      {/* Waveform */}
      <div className="flex items-center gap-1 h-15">
        {waveformBars.map((height, index) => {
          const barProgress = (index / waveformBars.length) * duration;
          const isPassed = barProgress <= progress;

          return (
            <div
              key={index}
              className={`w-1 rounded-full bg-gray-200 transition-all duration-150 ${index >= 15 ? "hidden md:block" : ""
                }`}
              style={{
                height: `${height}%`,
                opacity: isPlaying && isPassed ? 0.4 : 1,
                transform: isPlaying && isPassed ? "scaleY(0.8)" : "scaleY(1)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
