import { useState, useRef, useEffect } from "react";

// Video URL - replace with your actual video URL
const VIDEO_URL = "https://cdn.coverr.co/videos/coverr-concert-crowd-with-lights-1573/1080p.mp4";

export function VideoBackground() {
  const [loaded, setLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Delay video loading for performance - prioritize first paint
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!shouldLoad || !videoRef.current) return;
    
    const video = videoRef.current;
    
    // Check connection quality for mobile optimization
    const connection = (navigator as unknown as Record<string, unknown>).connection as { effectiveType?: string; saveData?: boolean } | undefined;
    if (connection) {
      // Don't load video on slow connections
      if (connection.effectiveType === '2g' || connection.saveData) {
        return;
      }
    }

    const handleCanPlay = () => {
      setLoaded(true);
      video.play().catch(() => {
        // Autoplay might be blocked, that's okay
      });
    };

    video.addEventListener('canplay', handleCanPlay);
    video.load();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [shouldLoad]);

  return (
    <div className="video-bg-container">
      {/* Animated gradient fallback (always visible) */}
      <div className="video-fallback" />
      
      {/* Additional overlay effects */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(124, 58, 237, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 60%)
          `
        }}
      />
      
      {/* Scan lines effect */}
      <div 
        className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        }}
      />

      {/* Video element */}
      {shouldLoad && (
        <video
          ref={videoRef}
          className="video-bg"
          data-loaded={loaded ? "true" : "false"}
          muted
          loop
          playsInline
          preload="auto"
          poster=""
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      )}

      {/* Dark overlay on top of video */}
      <div className="absolute inset-0 z-[3] bg-gradient-to-b from-black/40 via-black/60 to-black/90" />
    </div>
  );
}
