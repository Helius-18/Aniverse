import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js'; // Import HLS.js

interface HLSPlayerProps {
  videoUrl: string;
}

const HLSPlayer: React.FC<HLSPlayerProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement && Hls.isSupported()) {
      const hls = new Hls({
        fragLoadingTimeOut: 200000, // Increase the fragment load timeout (default is 10000ms)
        // Optionally, you can also adjust other timeout settings:
        // maxMaxBufferLength: 30, // Adjust buffer length
        // maxBufferLength: 20, // Adjust buffer size
        // maxBufferSize: 60 * 1000 * 1000, // Max buffer size
      });

      // Load the HLS stream
      hls.loadSource(videoUrl);

      // Attach the HLS.js instance to the video element
      hls.attachMedia(videoElement);

      // Handle HLS.js events (optional)
      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        console.log('Manifest parsed:', data);
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.log('Error:', data);
      });

      // Cleanup HLS.js instance when the component is unmounted
      return () => {
        hls.destroy();
      };
    } else if (videoElement && videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari or other browsers that natively support HLS
      videoElement.src = videoUrl;
    }
  }, [videoUrl]);

  return (
    <div>
      <video
        ref={videoRef}
        controls
        width="1000vh"
        height="auto"
        autoPlay={true}
        style={{ maxWidth: '100%', minHeight: '100%'}}
      />
    </div>
  );
};

export default HLSPlayer;
