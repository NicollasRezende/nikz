// components/features/OrbitingIcons.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TECH_ICONS } from "@/lib/constants";

interface OrbitingIconsProps {
  imageUrl: string;
  imageAlt: string;
}

export function OrbitingIcons({ imageUrl, imageAlt }: OrbitingIconsProps) {
  // Orbital animation for tech icons
  const orbitRadius = 200; // radius of orbit in pixels
  const iconSize = 60;

  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[500px]">
      {/* Pulsing background gradient */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(0,198,255,0.3) 0%, rgba(77,140,255,0.2) 35%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Spinning dashed ring */}
      <motion.div
        className="absolute"
        style={{
          width: orbitRadius * 2,
          height: orbitRadius * 2,
          border: "2px dashed rgba(0,198,255,0.3)",
          borderRadius: "50%",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Profile Image Container */}
      <div className="relative z-10">
        <motion.div
          className="relative overflow-hidden rounded-full"
          style={{
            width: 280,
            height: 280,
            boxShadow: "0 0 60px rgba(0,198,255,0.4), 0 0 120px rgba(77,140,255,0.2)",
          }}
          animate={{
            boxShadow: [
              "0 0 60px rgba(0,198,255,0.4), 0 0 120px rgba(77,140,255,0.2)",
              "0 0 80px rgba(0,198,255,0.6), 0 0 140px rgba(77,140,255,0.3)",
              "0 0 60px rgba(0,198,255,0.4), 0 0 120px rgba(77,140,255,0.2)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={280}
            height={280}
            priority
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Orbiting Tech Icons */}
      {TECH_ICONS.map((tech, index) => {
        const angle = (index / TECH_ICONS.length) * 2 * Math.PI;
        const delay = index * 1.5; // stagger the animations

        return (
          <motion.div
            key={tech.name}
            className="absolute"
            style={{
              width: iconSize,
              height: iconSize,
            }}
            animate={{
              x: [
                Math.cos(angle) * orbitRadius,
                Math.cos(angle + Math.PI * 2) * orbitRadius,
              ],
              y: [
                Math.sin(angle) * orbitRadius,
                Math.sin(angle + Math.PI * 2) * orbitRadius,
              ],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              delay: delay,
            }}
          >
            <motion.div
              className="relative w-full h-full rounded-xl flex items-center justify-center cursor-pointer group"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              }}
              whileHover={{
                scale: 1.2,
                boxShadow: "0 0 30px rgba(0,198,255,0.6)",
              }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: delay,
                },
              }}
            >
              {/* Icon */}
              <i
                className={`${tech.icon} text-3xl`}
                style={{
                  filter: "drop-shadow(0 0 8px rgba(0,198,255,0.5))",
                }}
              />

              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,198,255,0.4) 0%, transparent 70%)",
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Tooltip */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {tech.tooltip}
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Additional floating particles for extra pizzazz */}
      {[...Array(8)].map((_, i) => {
        const particleAngle = (i / 8) * 2 * Math.PI;
        const particleRadius = orbitRadius * 1.3;

        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: "rgba(0,198,255,0.6)",
              boxShadow: "0 0 10px rgba(0,198,255,0.8)",
            }}
            animate={{
              x: [
                Math.cos(particleAngle) * particleRadius,
                Math.cos(particleAngle + Math.PI * 2) * particleRadius,
              ],
              y: [
                Math.sin(particleAngle) * particleRadius,
                Math.sin(particleAngle + Math.PI * 2) * particleRadius,
              ],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        );
      })}
    </div>
  );
}
