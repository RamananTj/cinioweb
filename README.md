Import the cinioweb backend as Maven spring project 
Build it and run it.

Run the front end react using - npm run dev in terminal of your IDE.

Locate the hosted application in browser by entering the url got shown after runnning the above prompt
_______________
Frontend:
1st commit
Added Particle layer - containing dustlayer with particle animation
particleLayer.jsx gets used in SceneRenderer.jsx
Cinematic-config.jsx uses SceneRenderer({config}) fn. Cinematic-config passes scene data (getCinematicConfigBySceneId) in config prop.
SceneService has getCinematicConfigBySceneId function - it dynamically gets id value and returns scene data via GET Api fetch call.
________________
