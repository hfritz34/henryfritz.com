// ProjectVideo — muted looping preview for a project card.
// Plays only while on screen; visitors who prefer reduced motion get the poster still.
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';

export default function ProjectVideo({ webm, mp4, poster, alt }) {
  const ref = useRef(null);
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduced]);

  if (reduced) return <img src={poster} alt={alt} />;

  return (
    <video ref={ref} muted loop playsInline preload="metadata" poster={poster} aria-label={alt}>
      {webm && <source src={webm} type="video/webm" />}
      {mp4 && <source src={mp4} type="video/mp4" />}
    </video>
  );
}
