import { useState } from "react";
import { useSelector } from "react-redux";

import L, { MarkerCluster } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import MapLayout from "@/components/map-layout/Layout";
import logo from "@/assets/location.svg";

import MapComponent from "@/components/map-layout/Layout";
import useGetLocationQuery from "@/services/location/use-get-location-query";
import { Circle, Marker } from "react-leaflet";
import MarkerComponent from "./components/marker";
import useGetClusterLocation from "@/services/dashboard/use-get-cluster-query";
import ClusterComponent from "./components/cluster";

const createClusterCustomIcon = function (cluster: MarkerCluster) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: L.point(33, 33, true),
  });
};
const customIcon = new L.Icon({
  iconUrl: logo,
  iconSize: new L.Point(40, 47),
});

function Dashboard() {
  const { data: clusterData } = useGetClusterLocation();

  const { user } = useSelector((state: any) => state.user);
  // const { data: locationData, isLoading } = useGetLocationQuery();
  // console.log("response", locationData);
  const [dynamicPosition, setPosition] = useState<L.LatLngExpression>([
    28.051687, 83.987261,
  ]);
  console.log("clustering data", clusterData);
  return (
    <>
      <div className="p-4">
        <h1 className="text-xl font-bold">
          Welcome,{user?.fullname || "Tilak"}{" "}
        </h1>
      </div>

      <div className="my-12 px-4 md:px-8 xl:px-12 py-4">
        <MapLayout>
          <MarkerComponent
            position={[28.668754, 83.104185]}
            icon={customIcon}
          />
          {clusterData &&
            clusterData.map((cluster: any, index: number) => (
              <>
                <Circle
                  key={index}
                  center={[cluster.centroid.lat, cluster.centroid.lng]}
                  pathOptions={{ color: "blue" }}
                  radius={cluster.max_radius * 1000}
                />
                {cluster.points && (
                  <ClusterComponent points={cluster.points} icon={customIcon} />
                )}
              </>
            ))}
          {/* <MarkerClusterGroup
            onClick={(e) => console.log("onClick", e)}
            iconCreateFunction={createClusterCustomIcon}
            maxClusterRadius={150}
            spiderfyOnMaxZoom={true}
            polygonOptions={{
              fillColor: "#ffffff",
              color: "#f00800",
              weight: 5,
              opacity: 1,
              fillOpacity: 0.8,
            }}
            showCoverageOnHover={true}
          >
            <Marker position={[28.668754, 83.104185]} icon={customIcon} />
            <Marker position={[29.587613, 83.944535]} icon={customIcon} />
            <Marker position={[28.614681, 83.121517]} icon={customIcon} />
            <Marker position={[29.357641, 83.328708]} icon={customIcon} />
            <Marker
              position={dynamicPosition}
              title="a title  as asd2"
              icon={customIcon}
            />
            <Marker position={[28.931841, 83.876713]} icon={customIcon} />
          </MarkerClusterGroup> */}
        </MapLayout>
      </div>
    </>
  );
}

export default Dashboard;
