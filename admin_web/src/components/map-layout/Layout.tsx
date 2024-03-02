import { MapContainer, TileLayer } from "react-leaflet";

import "@/App.css";
import "leaflet/dist/leaflet.css";

function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MapContainer
        className="leaflet-container"
        center={[28.25, 83.95]}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </MapContainer>
    </>
  );
}

export default MapLayout;
