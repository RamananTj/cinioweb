import gsap from "gsap";
import { useEffect, useRef } from "react";
import "../components/cinematic/SceneRenderer.css";
import ParticleLayer from "./ParticleLayer";
import EnvironmentRenderer from "./EnvironmentRenderer";

function SceneRenderer({ config, showChapterTitle = false }) {
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    const scene = config?.scene;
    const chapterTitle = scene?.chapter?.title;

    useEffect(() => {        

        const timeline = gsap.timeline();
        const timeline2 = gsap.timeline();
        if (scene && showChapterTitle) {
            timeline
                .fromTo(
                    titleRef.current,
                    { opacity: 0, y: 35 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.6,
                        ease: "power3.out",
                    }
                )
                .fromTo(
                    contentRef.current,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.4,
                        ease: "power2.out",
                    },
                    "-=0.5"
                );
        }
        else if (scene) {
            timeline2               
                .fromTo(
                    contentRef.current,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.4,
                        ease: "power2.out",
                    }                    
                );
        }

        return () => timeline.kill();
    }, [scene, scene.id, showChapterTitle]);

    if (!scene) {
        return (
            <main className="cinematic-scene">
                <div className="no-scene-message">
                    No scene is associated with this configuration.
                </div>
            </main>
        );
    }

    return (
        <main className="cinematic-scene">
            <EnvironmentRenderer config={config} />
            <ParticleLayer config={config} />

            {showChapterTitle && (
                <h1 ref={titleRef} className="cinematic-title">
                    {chapterTitle}
                </h1>
            )}

            <div className="cinematic-content">
                <p
                    ref={contentRef}
                    className="cinematic-block"
                >
                    {scene.content}
                </p>
            </div>
        </main>
    );
}

export default SceneRenderer;