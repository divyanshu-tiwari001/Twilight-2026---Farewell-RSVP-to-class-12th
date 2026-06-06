
import React, { useEffect, useState, useMemo } from 'react';
import Particles, { initParticlesEngine } from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Container, ISourceOptions } from "tsparticles-engine";
import { motion } from 'framer-motion';

interface ParticleBackgroundProps {
    motionStyle: React.CSSProperties;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ motionStyle }) => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        // You can add logic here for when particles are loaded
    };

    const options: ISourceOptions = useMemo(() => ({
        background: {
            color: {
                value: 'transparent',
            },
        },
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: {
                    enable: false,
                },
                onClick: {
                    enable: false,
                },
            },
        },
        particles: {
            color: {
                value: ["#fde047", "#e0e7ff"],
            },
            links: {
                enable: false,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "out",
                },
                random: true,
                speed: 0.1, // Reduced speed for more subtlety
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                },
                value: 40, // Reduced particle count
            },
            opacity: {
                value: { min: 0.1, max: 0.5 },
                 animation: {
                    enable: true,
                    speed: 0.4, // Slowed down opacity animation
                    minimumValue: 0.1,
                    sync: false
                }
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 3 },
            },
        },
        detectRetina: true,
    }), []);

    return (
        <motion.div 
            style={motionStyle}
            className="absolute top-0 left-0 w-full h-full z-[-1]"
        >
            {init && (
                 <Particles
                    id="tsparticles"
                    particlesLoaded={particlesLoaded}
                    options={options}
                    className="h-full w-full"
                />
            )}
        </motion.div>
    );
};

export default ParticleBackground;