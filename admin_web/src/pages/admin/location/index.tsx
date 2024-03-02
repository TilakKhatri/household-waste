import { useEffect, useState } from "react";

import L from "leaflet";
import AddUserModal from "./components/Modal";
import MapLayout from "@/components/map-layout/Layout";
import { Circle, Marker, Popup } from "react-leaflet";

import logo from "@/assets/location.svg";
import useGetLocationQuery from "@/services/location/use-get-location-query";

const customIcon = new L.Icon({
  iconUrl: logo,
  iconSize: new L.Point(20, 27),
});

function Centers() {
  const [isDrawerOpen, setIsModalOpen] = useState(false);
  const { data: CenterLocations } = useGetLocationQuery();
  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="my-12 px-4 md:px-8 xl:px-12 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl">Collection center Location</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-fit px-4 primary-btn"
          >
            Add Location
          </button>
        </div>
      </div>

      <AddUserModal isOpen={isDrawerOpen} toggleModal={toggleModal} />
      <div className="md:px-8 my-12">
        <MapLayout>
          {/* <CircleMarker
            center={[28.668754, 83.104185]}
            pathOptions={{ color: "red" }}
            radius={200}
          >
            <Popup>Collector Name</Popup>
          </CircleMarker> */}
          {CenterLocations &&
            CenterLocations.map((center: any) => (
              <>
                {/* <Circle
                  key={center._id}
                  center={[center.lat, center.lng]}
                  pathOptions={{ color: "blue" }}
                  radius={20000}
                /> */}
                <Marker
                  key={center._id}
                  position={[center.lat, center.lng]}
                  icon={customIcon}
                />
              </>
            ))}

          {/* <CircleMarker
            center={[28.668754, 82.104185]}
            pathOptions={{ color: "blue" }}
            radius={200}
          > 
            <Popup>Collector Name</Popup>
          </CircleMarker>
          */}
        </MapLayout>
      </div>
    </>
  );
}

export default Centers;
