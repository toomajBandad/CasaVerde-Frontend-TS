import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet-draw";

interface DrawControlProps {
  onDrawComplete?: (coords: any) => void;
}

export default function DrawControl({ onDrawComplete }: DrawControlProps) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: {
          showArea: true,
          shapeOptions: {
            color: "#01796f",
            weight: 3,
          },
          guideLayers: [],
          metric: true,
        },
        rectangle: false,
        polyline: false,
        marker: false,
        circle: false,
        circlemarker: false,
      },
    });

    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, (e: any) => {
      const layer = e.layer;
      drawnItems.addLayer(layer);
      const coords = layer.getLatLngs();
      if (onDrawComplete) onDrawComplete(coords);
    });

    return () => {
      map.removeControl(drawControl);
    };
  }, [map, onDrawComplete]);

  return null;
}
