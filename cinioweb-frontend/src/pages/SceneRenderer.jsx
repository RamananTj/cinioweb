import gsap from "gsap";
import { useEffect, useRef } from "react";
import "../components/cinematic/SceneRenderer.css";
import ParticleLayer from "./ParticleLayer"

function SceneRenderer({ config }) {
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    const scene = config.scene;

    useEffect(() => {
        const timeline = gsap.timeline();

        timeline
            .fromTo(
                titleRef.current,
                { opacity: 0, y : 40 },
                { opacity: 1, y: 0, duration: 2, ease: "power4.out" },
            )
            .fromTo(
                contentRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 2, ease: "power2.out" },
                "1.3"
        );

        return () => {
            timeline.kill();
        };

    },[]);

    return (
        <main className="cinematic-scene">
            <ParticleLayer />
            <div className="cinematic-content">
                <h1 ref={titleRef} className="cinematic-title">
                    {scene.title}
                </h1>

                <p ref={contentRef} className="cinematic-block">
                    {scene.content}
                </p>
            </div>            
        </main>
    );
}

export default SceneRenderer;