import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

import "../components/cinematic/SceneRenderer.css";

// import ParticleLayer from "./ParticleLayer";
// import EnvironmentRenderer from "./EnvironmentRenderer";

import { generateBeatBackground } from "../services/assetService";
import GlobalErrorPage from "../GlobalErrorPage";

const SERVER_URL = "http://localhost:8080";

function SceneRenderer({
    beat,
    chapterTitle,
    showChapterTitle = false
}) {
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    const [backgroundUrl, setBackgroundUrl] = useState("");
    const [loadingBackground, setLoadingBackground] = useState(true);
    const [backgroundError, setBackgroundError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadBackground() {
            setLoadingBackground(true);
            setBackgroundError("");
            setBackgroundUrl("");

            try {
                const asset = await generateBeatBackground(beat);

                if (!cancelled) {
                    const imageUrl = asset.assetUrl.startsWith("http")
                        ? asset.assetUrl
                        : `${SERVER_URL}${asset.assetUrl}`;

                    setBackgroundUrl(imageUrl);
                }
            } catch (err) {
                if (!cancelled) {
                    setBackgroundError(err.message || "Background generation failed.");                    
                }
            } finally {
                if (!cancelled) {
                    setLoadingBackground(false);
                }
            }
        }

        loadBackground();

        return () => {
            cancelled = true;
        };
    }, [beat]);

    // GSAP animations
    useEffect(() => {
        if (!beat) return;

        const timeline = gsap.timeline();

        if (showChapterTitle && titleRef.current) {
            timeline.fromTo(
                titleRef.current,
                {
                    opacity: 0,
                    y: 35
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.6,
                    ease: "power3.out"
                }
            );
        }

        if (contentRef.current) {
            timeline.fromTo(
                contentRef.current,
                {
                    opacity: 0,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.4,
                    ease: "power2.out"
                },
                showChapterTitle ? "-=0.5" : 0
            );
        }

        return () => {
            timeline.kill();
        };
    }, [beat, showChapterTitle]);

    if (!beat) {
        return (
            <main className="cinematic-scene">
                <div className="no-scene-message">
                    No story beat available.
                </div>
            </main>
        );
    }

    return (
        <main className="cinematic-scene">

            {/* Generated background */}
            <div
                className="cinematic-background"
                style={{
                    backgroundImage: backgroundUrl
                        ? `url("${backgroundUrl}")`
                        : "none"
                }}
            />

            {/* Background overlay */}
            <div className="cinematic-background-overlay" />

            {/* Existing environment and particle effects disabled for now */}
            {/*
                <EnvironmentRenderer config={config} />
                <ParticleLayer config={config} />
            */}

            {showChapterTitle && (
                <h1
                    ref={titleRef}
                    className="cinematic-title"
                >
                    {chapterTitle}
                </h1>
            )}

            <div className="cinematic-content">

                <p
                    ref={contentRef}
                    className="cinematic-block"
                >
                    {beat.sourceText}
                </p>

            </div>

            {/* Image generation status */}
            {loadingBackground && (
                <div className="background-status">
                    Creating cinematic environment...                    
                </div>
            )}

            {backgroundError && (
                <div className="background-status background-error">
                    {backgroundError}
                    <GlobalErrorPage />
                </div>
            )}

        </main>
    );
}

export default SceneRenderer;