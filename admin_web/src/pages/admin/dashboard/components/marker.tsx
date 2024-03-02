import { Marker } from "react-leaflet";

function MarkerComponent({ position, icon }: { position: any; icon: any }) {
  return <Marker position={position} icon={icon} />;
}

export default MarkerComponent;
