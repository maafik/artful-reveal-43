import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top = `${my}px`;
      }
    };

    const animate = () => {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.left = `${cx}px`;
        glowRef.current.style.top = `${cy}px`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Glow blob — lazy follow */}
      <div
        ref={glowRef}
        className="cursor-glow"
        style={{
          width: 120,
          height: 120,
          background: "radial-gradient(circle, hsl(38 65% 60% / 0.18) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
      {/* Dot — instant */}
      <div
        ref={dotRef}
        className="cursor-glow"
        style={{
          width: 8,
          height: 8,
          background: "hsl(38 65% 55%)",
          boxShadow: "0 0 12px 3px hsl(38 65% 60% / 0.5)",
        }}
      />
    </>
  );
};

export default CustomCursor;
