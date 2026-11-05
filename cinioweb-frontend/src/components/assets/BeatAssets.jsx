import { useState } from "react";
import { generateBeatAssets } from "../../services/assetService";
import "./BeatAssets.css";

const SERVER_URL = "http://localhost:8080";

function BeatAssets({ beat }) {

    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleGenerate() {

        setLoading(true);
        setError("");

        try {
            const result = await generateBeatAssets({
                beatOrder: beat.beatOrder,
                action: beat.action,
                emotionalShift: beat.emotionalShift,
                location: beat.location,
                timeContext: beat.timeContext,
                characters: beat.characters || []
            });

            setAssets(result);

        } catch (err) {
            setError(err.message || "Unable to generate images.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="beat-assets">

            <div className="asset-header">
                <h2>Visual Assets</h2>

                <button
                    onClick={handleGenerate}
                    disabled={loading}
                >
                    {loading
                        ? "Generating..."
                        : "Generate Images"}
                </button>
            </div>

            {error && (
                <p className="asset-error">{error}</p>
            )}

            {loading && (
                <div className="asset-loading">
                    Generating your cinematic visuals...
                </div>
            )}

            <div className="asset-grid">

                {assets.map((asset, index) => (

                    <div className="asset-card" key={index}>

                        <h3>{asset.assetType}</h3>

                        <img
                            src={`${SERVER_URL}${asset.assetUrl}`}
                            alt={asset.assetType}
                        />

                        <p>{asset.prompt}</p>

                    </div>
                ))}

            </div>

        </section>
    );
}

export default BeatAssets;