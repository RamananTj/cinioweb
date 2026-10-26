import "../components/cinematic/ParticleLayer.css"

import {  useEffect, useRef } from "react";
import gsap from "gsap";

function ParticleLayer({ config }) {
    const containerRef = useRef(null);

    const particleType = config?.particleType || "golden_stars";
    const particleCount = Math.min(100, Math.max(0, Number(config?.particleCount ?? 30)));
    const particleSpeed = config?.particleSpeed || "slow";
    const particleOpacity = Math.min(1, Math.max(0, Number(config?.particleOpacity ?? 0.5)));


    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        
        const particles = [];

        const speedSettings = {
            slow : [8,12],
            medium: [4,7],
            fast: [2,4]
        }

        const [minDuration, maxDuration] = speedSettings[particleSpeed] || speedSettings.slow;

        const symbols = {
            // Stars, magic & celestial
            golden_stars: "✦",
            stardust: "·",
            cosmic_stars: "✧",
            magic_sparkles: "✧",
            magic_orbs: "●",
            fairy_dust: "✧",
            moon_dust: "☾",
            celestial_glow: "✴",
            constellation: "•",
            comet_trails: "☄",

            // Weather & atmosphere
            rain: "|",
            heavy_rain: "│",
            mist: "〰",
            fog: "〰",
            snow: "❄",
            blizzard: "❅",
            hail: "•",
            wind_leaves: "❧",
            wind_debris: "·",
            sandstorm: "·",
            water_spray: "°",
            thunder_sparks: "ϟ",

            // Fire, heat & destruction
            embers: "•",
            fire_sparks: "✴",
            burning_ash: "·",
            flames: "♨",
            heat_shimmer: "〰",
            smoke: "〰",
            volcanic_ash: "·",
            lava_sparks: "✦",
            explosion_debris: "▪",

            // Nature & forest
            dust: ".",
            pollen: "·",
            fireflies: "●",
            falling_leaves: "❧",
            autumn_leaves: "🍂",
            cherry_blossoms: "🌸",
            flower_petals: "✿",
            dandelion_seeds: "❋",
            forest_spores: "•",
            moss_particles: "·",
            sakura_glow: "✿",
            feathers: "🪶",

            // Water & underwater
            bubbles: "○",
            underwater_plankton: "•",
            ocean_sparkles: "✧",
            seafoam: "°",
            deep_sea_glow: "●",
            water_droplets: "💧",

            // Romance & dreams
            heart_sparkles: "♡",
            rose_petals: "❀",
            dream_dust: "✧",
            soft_glow: "✦",
            pink_orbs: "●",
            luminous_threads: "∿",

            // Sci-fi & technology
            digital_dust: "·",
            data_stream: "1",
            neon_sparks: "+",
            holographic_glitch: "▧",
            energy_orbs: "●",
            electric_arcs: "ϟ",
            cyber_sparks: "+",
            quantum_particles: "•",
            portal_energy: "✧",
            stasis_fragments: "◇",

            // Historical & war
            candle_ash: "·",
            torch_embers: "•",
            battle_dust: "·",
            gunpowder_smoke: "〰",
            war_ash: "·",
            parchment_dust: ".",
            desert_dust: "·",

            // Horror & dark fantasy
            spectral_mist: "〰",
            ghost_orbs: "◦",
            dark_ash: "·",
            blood_specks: "•",
            cursed_sparks: "✦",
            shadow_fragments: "▪",
            soul_fragments: "◦",
            necromantic_energy: "✧",

            // Light & camera atmosphere
            light_motes: "·",
            sun_dust: "✦",
            light_rays: "│",
            lens_sparkles: "✧",
            prism_fragments: "◇",
            floating_dust: ".",
            film_grain: "·",

            // Abstract & transitions
            geometric_fragments: "▪",
            glass_shards: "◇",
            crystal_fragments: "✧",
            memory_fragments: "▧",
            time_fragments: "✦",
            transition_sparks: "✧",
            void_particles: "•"
        };

        const symbol = symbols[particleType] || symbols.golden_stars;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");

            particle.className = `cinematic-particle particle-${particleType}`;
            particle.textContent = symbol;

            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.opacity = String(particleOpacity);

            container.appendChild(particle);
            particles.push(particle);

            const duration = minDuration + Math.random() * (maxDuration - minDuration);


            gsap.fromTo(
                particle,
                {
                    y: particleType === "rain" ? -100 : 0,
                    x: 0,
                    opacity: particleOpacity
                },
                {
                    y: particleType === "rain"
                        ? window.innerHeight + 100
                        : -100 - Math.random() * 150,  
                    x: particleType === "dust"
                        ? Math.random() * 50 - 25
                        : Math.random() * 40 - 20,
                    opacity: 0,
                    duration,
                    repeat: -1,         //repeat infinitely
                    delay: Math.random() * duration,
                    ease : "none"
                }
            );
        }

        return () => {  //return statement inside useEffect - used as cleanup function
            particles.forEach(particle => {
                gsap.killTweensOf(particle);
                particle.remove();
            });
        };
    }, [particleType, particleCount, particleSpeed, particleOpacity]);

    return (
        <div
            ref={containerRef}
            className = "particle-layer"
        />
    );
}

export default ParticleLayer;