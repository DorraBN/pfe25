"use client"; // 👈 À ne pas oublier !

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0"
      options={{
        fullScreen: { enable: false },
        background: { color: "transparent" },
        particles: {
          number: { value: 60, density: { enable: true, area: 800 } },
          color: { value: "#aaa" },
          links: {
            enable: true,
            color: "#aaa",
            distance: 150,
            opacity: 0.4,
            width: 1,
          },
          move: { enable: true, speed: 1, outModes: { default: "bounce" } },
          size: { value: 1.5 },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
          },
        },
      }}
    />
  );
};

export default ParticlesBackground;
