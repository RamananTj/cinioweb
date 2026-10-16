Frontend:
1st commit
Added Particle layer - containing dustlayer with particle animation
particleLayer.jsx gets used in SceneRenderer.jsx
Cinematic-config.jsx uses SceneRenderer({config}) fn. Cinematic-config passes scene data (getCinematicConfigBySceneId) in config prop.
SceneService has getCinematicConfigBySceneId function - it dynamically gets id value and returns scene data via GET Api fetch call.
________________