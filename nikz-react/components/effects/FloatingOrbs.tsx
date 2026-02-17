"use client";

export default function FloatingOrbs() {
  const orbs = [
    {
      color: "accent-purple",
      size: "w-96 h-96",
      position: "top-20 left-10",
      duration: "20s",
    },
    {
      color: "accent-cyan",
      size: "w-80 h-80",
      position: "top-40 right-20",
      duration: "25s",
    },
    {
      color: "accent-pink",
      size: "w-72 h-72",
      position: "bottom-40 left-1/4",
      duration: "30s",
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {orbs.map((orb, index) => (
        <div
          key={index}
          className={`absolute ${orb.position} ${orb.size} rounded-full opacity-8 blur-xl animate-float`}
          style={{
            background: `radial-gradient(circle, var(--${orb.color}) 0%, transparent 70%)`,
            animationDuration: orb.duration,
            animationDelay: `${index * 3}s`,
          }}
        />
      ))}
    </div>
  );
}
