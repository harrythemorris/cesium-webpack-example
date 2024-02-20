import {
  Cartesian3,
  Math,
  Terrain,
  Viewer,
  createOsmBuildingsAsync,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

export const init = async () => {
  console.log("bundle initializing");

  // CesiumJS has a default access token built in but it's not meant for active use.
  // please set your own access token can be found at: https://cesium.com/ion/tokens.
  // Ion.defaultAccessToken = "YOUR TOKEN HERE";

  // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
  const viewer = new Viewer("cesiumContainer", {
    terrain: Terrain.fromWorldTerrain(),
  });

  // Add Cesium OSM Buildings, a global 3D buildings layer.
  const osmBuildingsTileset = await createOsmBuildingsAsync();
  viewer.scene.primitives.add(osmBuildingsTileset);

  // Fly the camera to San Francisco at the given longitude, latitude, and height.
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    orientation: {
      heading: Math.toRadians(0.0),
      pitch: Math.toRadians(-15.0),
    },
  });
}
