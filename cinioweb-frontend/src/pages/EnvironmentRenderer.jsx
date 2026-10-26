import "../components/cinematic/EnvironmentRenderer.css";

function EnvironmentRenderer({ config }) {
    const rawType = config?.environmentType;

    // Keep database values CSS-class safe.
    const environmentType =
        typeof rawType === "string" &&
            /^[a-zA-Z0-9_-]+$/.test(rawType.trim())
            ? rawType.trim().toLowerCase()
            : "minimal_dark";

    return (
        <div
            className={`environment-renderer environment-${environmentType}`}
            aria-hidden="true"
        >
            {/* Base environmental lighting and wall depth */}
            <div className="environment-wall" />

            {/* Ambient light, moonlight, sunlight or artificial glow */}
            <div className="environment-light" />

            {/* Fog, haze, atmospheric depth and environmental movement */}
            <div className="environment-atmosphere" />

            {/* Subtle environmental texture */}
            <div className="environment-texture" />

            {/* Cinematic edge darkening */}
            <div className="environment-vignette" />
        </div>
    );
}

export default EnvironmentRenderer;
