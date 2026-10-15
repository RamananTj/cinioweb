import "../components/cinematic/Particle.css"

import {  useEffect, useRef } from "react";
import gsap from "gsap";

function ParticleLayer() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const particles = [];
        for (let i = 0; i < 30; i++) {

            const particle = document.createElement("div");
            particle.textContent = "*";
            particle.className = "dust-particle";

            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;

            particle    
            container.appendChild(particle);

            particles.push(particle);

            gsap.to(particle, {
                y: -100 - Math.random() * 200,  //returns a floating-point decimal number that is greater than or equal to 0 (inclusive) and strictly less than 1 (exclusive)
                x: Math.random() * 60 - 30,
                opacity: 0,
                duration: 5 + Math.random() * 6,
                repeat: -1,         //repeat infinitely
                delay: Math.random() * 5,
                ease : "none"
            });
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className = "particle-layer"
        />
    );
}

export default ParticleLayer;