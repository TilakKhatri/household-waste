import { Marker } from "react-leaflet";

export default function ClusterComponent({ points, icon }: any) {
  const pointList = points.map((item: any) => JSON.parse(item));

  return (
    pointList &&
    pointList.map((point: any, index: number) => (
      <Marker key={index} position={[point.lat, point.lng]} icon={icon} />
    ))
  );
}
