import gsap from "gsap";
import { useEffect, useRef } from "react";
import "../components/cinematic/SceneRenderer.css";
import ParticleLayer from "./ParticleLayer"
import EnvironmentRenderer from "./EnvironmentRenderer";

function SceneRenderer({ config }) {
    const titleRef = useRef(null);
    const contentRef = useRef(null);
   
    //const scene = config.scene;
    const scene = config?.scene;  // Safe extraction using optional chaining
    

    useEffect(() => {
        // If there is no scene, exit the effect early
        if (!scene) return;

        const timeline = gsap.timeline();

        timeline
            .fromTo(                        //animation of title 
                titleRef.current,
                { opacity: 0, y : 40 },
                { opacity: 1, y: 0, duration: 2, ease: "power4.out" },
            )
            .fromTo(                        //animation of content 
                contentRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 2, ease: "power2.out" },
                "1.3"
        );

        return () => {
            timeline.kill();
        };

    }, [scene]);

    // 2. Early returns for JSX must come AFTER all hooks
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
            <ParticleLayer config={ config } />
            <div className="cinematic-content">
                {/*<h1 ref={titleRef} className="cinematic-title">*/}
                {/*    {scene.title}*/}
                {/*</h1>*/}

                <p ref={contentRef} className="cinematic-block">
                    {scene.content}
                </p>
            </div>            
        </main>
    );
}

export default SceneRenderer;