
import { useState } from "react";

const formConfigs = {
    book: {
        title: "Add Book",
        fields: [
            {
                name: "title",
                label: "Book Title",
                type: "text",
                required: true,
            },
            {
                name: "author",
                label: "Author",
                type: "text",
                required: true,
            },
            {
                name: "description",
                label: "Description",
                type: "textarea",
                required: false,
            },
        ],
    },

    chapter: {
        title: "Add Chapter",
        fields: [
            {
                name: "title",
                label: "Chapter Title",
                type: "text",
                required: true,
            },
            {
                name: "chapterOrder",
                label: "Chapter Number",
                type: "number",
                required: true,
            },
            {
                name: "chapterText",
                label: "Chapter Text",
                type: "textarea",
                required: true,
            },
        ],
    },
};

function EntityForm({ entityType, onSubmit, onClose }) {
    const config = formConfigs[entityType];

    const [formData, setFormData] = useState({});
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    if (!config) {
        return <p>Unsupported form type.</p>;
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setSaving(true);

        try {
            const payload = {};

            for (const field of config.fields) {
                const value = formData[field.name] ?? "";

                if (field.type === "number") {
                    payload[field.name] = value === "" ? null : Number(value);
                } else {
                    payload[field.name] = value;
                }
            }

            await onSubmit(payload);
            onClose();
        } catch (err) {
            setError(err.message || "Unable to save.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="form-overlay">
            <form className="entity-form" onSubmit={handleSubmit}>
                <h2>{config.title}</h2>

                {config.fields.map((field) => (
                    <div className="form-field" key={field.name}>
                        <label htmlFor={field.name}>
                            {field.label}
                        </label>

                        {field.type === "textarea" ? (
                            <textarea
                                id={field.name}
                                name={field.name}
                                value={formData[field.name] ?? ""}   //field.value - might be the perfect var name here i think so
                                onChange={handleChange}
                                required={field.required}
                                rows={5}        // height of the textarea - Initial Height: The input box will start with a fixed height equal to 5 lines of text,
                            />
                        ) : (
                            <input
                                id={field.name}
                                name={field.name}
                                type={field.type}
                                value={formData[field.name] ?? ""}
                                onChange={handleChange}
                                required={field.required}
                                min={
                                    field.type === "number"
                                        ? 1
                                        : undefined
                                }
                            />
                        )}
                    </div>
                ))}

                {error && (
                    <p className="form-error">{error}</p>
                )}

                <div className="form-actions">
                    <button
                        type="button"
                        className="button button-secondary"
                        onClick={onClose}
                        disabled={saving}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="button button-primary"
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EntityForm;
