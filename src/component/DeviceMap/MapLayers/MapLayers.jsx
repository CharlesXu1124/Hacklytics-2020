import React from "react";
import { LayersControl, TileLayer } from "react-leaflet";

const { BaseLayer } = LayersControl;

const SATELLITE_TILE_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const SATELLITE_TILE_ATTRIBUTION =
  "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community";
const LABEL_TILE_URL =
  "https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png";

export const MapLayers = () => {
  return (
    <LayersControl>
      <BaseLayer checked name="ERSI Satellite">
        <TileLayer
          url={SATELLITE_TILE_URL}
          attribution={SATELLITE_TILE_ATTRIBUTION}
        />
      </BaseLayer>
      <BaseLayer checked name="names">
        <TileLayer url={LABEL_TILE_URL} />
      </BaseLayer>
    </LayersControl>
  );
};
