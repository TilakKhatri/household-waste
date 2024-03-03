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
  color: "blue",
});

function Dashboard() {
  const randomColor = [
    "green",
    "red",
    "blue",
    "orange",
    "teal",
    "purple",
    "magenta",
    "yellow",
    "pink",
    "black",
    "violet",
  ];
  const colorFun = () => {
    let index = Math.floor(Math.random() * randomColor.length);
    return randomColor[index];
  };
  const { data: clusterData } = useGetClusterLocation();
  // const clusterData = [
  //   {
  //     centroid: { location_name: "Lamachaur", lat: 28.26126, lng: 83.97224 },
  //     clients_location_points: [
  //       {
  //         lat: 28.285839398111236,
  //         lng: 83.9753737423089,
  //         pickup_identifier: 0,
  //       },
  //       {
  //         lat: 28.28248141936339,
  //         lng: 83.96774139857848,
  //         pickup_identifier: 1,
  //       },
  //       {
  //         lat: 28.28687568440012,
  //         lng: 83.97321110205046,
  //         pickup_identifier: 2,
  //       },
  //       {
  //         lat: 28.279010648429526,
  //         lng: 83.97375388509548,
  //         pickup_identifier: 3,
  //       },
  //       {
  //         lat: 28.278449980302305,
  //         lng: 83.96809975549921,
  //         pickup_identifier: 4,
  //       },
  //       {
  //         lat: 28.28183214227053,
  //         lng: 83.96743655267885,
  //         pickup_identifier: 5,
  //       },
  //       {
  //         lat: 28.2783323954562,
  //         lng: 83.97308699305687,
  //         pickup_identifier: 6,
  //       },
  //       {
  //         lat: 28.28629996727403,
  //         lng: 83.97504373352889,
  //         pickup_identifier: 7,
  //       },
  //       {
  //         lat: 28.28034449192096,
  //         lng: 83.9770985917352,
  //         pickup_identifier: 8,
  //       },
  //       {
  //         lat: 28.27818063477876,
  //         lng: 83.9684174039889,
  //         pickup_identifier: 9,
  //       },
  //       {
  //         lat: 28.281836612587814,
  //         lng: 83.97216238231975,
  //         pickup_identifier: 10,
  //       },
  //       {
  //         lat: 28.279188716851912,
  //         lng: 83.96960885789389,
  //         pickup_identifier: 11,
  //       },
  //       {
  //         lat: 28.28494033249215,
  //         lng: 83.96886445349963,
  //         pickup_identifier: 12,
  //       },
  //       {
  //         lat: 28.280528247164423,
  //         lng: 83.96782797695782,
  //         pickup_identifier: 13,
  //       },
  //       {
  //         lat: 28.278324742671597,
  //         lng: 83.96913081397473,
  //         pickup_identifier: 14,
  //       },
  //       {
  //         lat: 28.278527130143893,
  //         lng: 83.9677667791566,
  //         pickup_identifier: 15,
  //       },
  //       {
  //         lat: 28.27817041428584,
  //         lng: 83.96743618970727,
  //         pickup_identifier: 16,
  //       },
  //       {
  //         lat: 28.281807266835795,
  //         lng: 83.97553831674901,
  //         pickup_identifier: 17,
  //       },
  //       {
  //         lat: 28.281744072166873,
  //         lng: 83.9714148508333,
  //         pickup_identifier: 18,
  //       },
  //       {
  //         lat: 28.286119705245827,
  //         lng: 83.96877387803227,
  //         pickup_identifier: 19,
  //       },
  //     ],
  //     max_radius: 2.8499212529848266,
  //     density_ratio: 0.7838165024453504,
  //   },
  //   {
  //     centroid: { location_name: "Bagar", lat: 28.24054, lng: 83.98754 },
  //     clients_location_points: [
  //       {
  //         lat: 28.245471234196287,
  //         lng: 83.98827680762322,
  //         pickup_identifier: 20,
  //       },
  //       {
  //         lat: 28.237530158394208,
  //         lng: 83.98689190950273,
  //         pickup_identifier: 21,
  //       },
  //       {
  //         lat: 28.242202031448834,
  //         lng: 83.99169580006591,
  //         pickup_identifier: 22,
  //       },
  //       {
  //         lat: 28.239090670685684,
  //         lng: 83.9845781934013,
  //         pickup_identifier: 23,
  //       },
  //       {
  //         lat: 28.23737005169034,
  //         lng: 83.98728144770942,
  //         pickup_identifier: 24,
  //       },
  //       {
  //         lat: 28.241896642875666,
  //         lng: 83.99128929780373,
  //         pickup_identifier: 25,
  //       },
  //       {
  //         lat: 28.241494097266933,
  //         lng: 83.98813752402633,
  //         pickup_identifier: 26,
  //       },
  //       {
  //         lat: 28.238533615114036,
  //         lng: 83.98799018502551,
  //         pickup_identifier: 27,
  //       },
  //       {
  //         lat: 28.245225657813066,
  //         lng: 83.98677468991636,
  //         pickup_identifier: 28,
  //       },
  //       {
  //         lat: 28.243582942877655,
  //         lng: 83.98367368436016,
  //         pickup_identifier: 30,
  //       },
  //       {
  //         lat: 28.238251383033173,
  //         lng: 83.9912832743067,
  //         pickup_identifier: 31,
  //       },
  //       {
  //         lat: 28.2436882762876,
  //         lng: 83.99069067885107,
  //         pickup_identifier: 32,
  //       },
  //       {
  //         lat: 28.2372711536896,
  //         lng: 83.98766411579845,
  //         pickup_identifier: 33,
  //       },
  //       {
  //         lat: 28.244353306693515,
  //         lng: 83.98696860643237,
  //         pickup_identifier: 34,
  //       },
  //       {
  //         lat: 28.243860202123884,
  //         lng: 83.98669643079225,
  //         pickup_identifier: 35,
  //       },
  //       {
  //         lat: 28.24441254853511,
  //         lng: 83.98452830817514,
  //         pickup_identifier: 36,
  //       },
  //       {
  //         lat: 28.23935772755605,
  //         lng: 83.99153726266692,
  //         pickup_identifier: 37,
  //       },
  //       {
  //         lat: 28.238640735500255,
  //         lng: 83.98553648928664,
  //         pickup_identifier: 38,
  //       },
  //       {
  //         lat: 28.237164868877368,
  //         lng: 83.9878486015313,
  //         pickup_identifier: 39,
  //       },
  //       {
  //         lat: 28.237416229598686,
  //         lng: 83.98659892370335,
  //         pickup_identifier: 53,
  //       },
  //       {
  //         lat: 28.23720106163297,
  //         lng: 83.98547009198876,
  //         pickup_identifier: 55,
  //       },
  //       {
  //         lat: 28.237550376282424,
  //         lng: 83.98591349137499,
  //         pickup_identifier: 56,
  //       },
  //       {
  //         lat: 28.237464698113538,
  //         lng: 83.98879941280187,
  //         pickup_identifier: 59,
  //       },
  //     ],
  //     max_radius: 0.553057989932112,
  //     density_ratio: 23.935175794697095,
  //   },
  //   {
  //     centroid: { location_name: "Nadipur", lat: 28.23309, lng: 83.99046 },
  //     clients_location_points: [
  //       {
  //         lat: 28.23589853367934,
  //         lng: 83.98835130811038,
  //         pickup_identifier: 29,
  //       },
  //       {
  //         lat: 28.237286083920708,
  //         lng: 83.99286709992882,
  //         pickup_identifier: 40,
  //       },
  //       {
  //         lat: 28.22953870467075,
  //         lng: 83.98715189254723,
  //         pickup_identifier: 41,
  //       },
  //       {
  //         lat: 28.230835156064128,
  //         lng: 83.9918443617455,
  //         pickup_identifier: 42,
  //       },
  //       {
  //         lat: 28.229513520479355,
  //         lng: 83.99188237040904,
  //         pickup_identifier: 43,
  //       },
  //       {
  //         lat: 28.229525386647445,
  //         lng: 83.98705852244768,
  //         pickup_identifier: 44,
  //       },
  //       {
  //         lat: 28.2358806237568,
  //         lng: 83.98734567778165,
  //         pickup_identifier: 45,
  //       },
  //       {
  //         lat: 28.23527297889257,
  //         lng: 83.9935506726845,
  //         pickup_identifier: 46,
  //       },
  //       {
  //         lat: 28.228809001708704,
  //         lng: 83.99098588176372,
  //         pickup_identifier: 47,
  //       },
  //       {
  //         lat: 28.23632814708698,
  //         lng: 83.98914422978613,
  //         pickup_identifier: 48,
  //       },
  //       {
  //         lat: 28.237700672841754,
  //         lng: 83.99246737094997,
  //         pickup_identifier: 49,
  //       },
  //       {
  //         lat: 28.235344380290837,
  //         lng: 83.989278232993,
  //         pickup_identifier: 50,
  //       },
  //       {
  //         lat: 28.231578646092167,
  //         lng: 83.9910686897345,
  //         pickup_identifier: 51,
  //       },
  //       {
  //         lat: 28.236795880318493,
  //         lng: 83.99478678588837,
  //         pickup_identifier: 52,
  //       },
  //       {
  //         lat: 28.229183666165344,
  //         lng: 83.99375592543063,
  //         pickup_identifier: 54,
  //       },
  //       {
  //         lat: 28.230172653232152,
  //         lng: 83.99160024817547,
  //         pickup_identifier: 57,
  //       },
  //       {
  //         lat: 28.235849565555057,
  //         lng: 83.99171725022687,
  //         pickup_identifier: 58,
  //       },
  //     ],
  //     max_radius: 0.5911620103802011,
  //     density_ratio: 15.484101657419757,
  //   },
  //   {
  //     centroid: { location_name: "Chipledhunga", lat: 28.22463, lng: 83.9895 },
  //     clients_location_points: [
  //       {
  //         lat: 28.22173466608787,
  //         lng: 83.99248119416986,
  //         pickup_identifier: 60,
  //       },
  //       {
  //         lat: 28.22685021281269,
  //         lng: 83.99068314453845,
  //         pickup_identifier: 61,
  //       },
  //       {
  //         lat: 28.226959028137106,
  //         lng: 83.99109063131678,
  //         pickup_identifier: 62,
  //       },
  //       {
  //         lat: 28.221303252148104,
  //         lng: 83.98764831072911,
  //         pickup_identifier: 63,
  //       },
  //       {
  //         lat: 28.226413309673728,
  //         lng: 83.99317664411352,
  //         pickup_identifier: 64,
  //       },
  //       {
  //         lat: 28.228218145235108,
  //         lng: 83.98586864346368,
  //         pickup_identifier: 65,
  //       },
  //       {
  //         lat: 28.222236486003197,
  //         lng: 83.9920769525848,
  //         pickup_identifier: 66,
  //       },
  //       {
  //         lat: 28.22145752460277,
  //         lng: 83.98540329724604,
  //         pickup_identifier: 67,
  //       },
  //       {
  //         lat: 28.22914916024467,
  //         lng: 83.98510132144779,
  //         pickup_identifier: 68,
  //       },
  //       {
  //         lat: 28.226481583326002,
  //         lng: 83.98879622068328,
  //         pickup_identifier: 69,
  //       },
  //       {
  //         lat: 28.224095169223137,
  //         lng: 83.9886706165904,
  //         pickup_identifier: 70,
  //       },
  //       {
  //         lat: 28.220350222172808,
  //         lng: 83.98998585768996,
  //         pickup_identifier: 71,
  //       },
  //       {
  //         lat: 28.226756234874347,
  //         lng: 83.9848032091446,
  //         pickup_identifier: 72,
  //       },
  //       {
  //         lat: 28.221475736727967,
  //         lng: 83.99332670053737,
  //         pickup_identifier: 73,
  //       },
  //       {
  //         lat: 28.223764822546446,
  //         lng: 83.99034516793189,
  //         pickup_identifier: 74,
  //       },
  //       {
  //         lat: 28.227458821959587,
  //         lng: 83.98596066911243,
  //         pickup_identifier: 75,
  //       },
  //       {
  //         lat: 28.221649411562115,
  //         lng: 83.98515868908024,
  //         pickup_identifier: 76,
  //       },
  //       {
  //         lat: 28.2263613064192,
  //         lng: 83.98474210166849,
  //         pickup_identifier: 77,
  //       },
  //       {
  //         lat: 28.22842500461345,
  //         lng: 83.993484556165,
  //         pickup_identifier: 78,
  //       },
  //       {
  //         lat: 28.219988478803582,
  //         lng: 83.99283289483958,
  //         pickup_identifier: 79,
  //       },
  //     ],
  //     max_radius: 0.6619885455955218,
  //     density_ratio: 14.52710826512386,
  //   },
  //   {
  //     centroid: { location_name: "Shavagriha", lat: 28.21204, lng: 83.98125 },
  //     clients_location_points: [
  //       {
  //         lat: 28.20776729116873,
  //         lng: 83.97961781643352,
  //         pickup_identifier: 80,
  //       },
  //       {
  //         lat: 28.215483015737487,
  //         lng: 83.98329130431419,
  //         pickup_identifier: 81,
  //       },
  //       {
  //         lat: 28.210812601276015,
  //         lng: 83.9832380265229,
  //         pickup_identifier: 82,
  //       },
  //       {
  //         lat: 28.20903360963863,
  //         lng: 83.98378802364958,
  //         pickup_identifier: 83,
  //       },
  //       {
  //         lat: 28.20959660652953,
  //         lng: 83.98201889549506,
  //         pickup_identifier: 84,
  //       },
  //       {
  //         lat: 28.212634183028957,
  //         lng: 83.9785086345447,
  //         pickup_identifier: 85,
  //       },
  //       {
  //         lat: 28.209630158571994,
  //         lng: 83.98267604828439,
  //         pickup_identifier: 86,
  //       },
  //       {
  //         lat: 28.211813202820814,
  //         lng: 83.98494408832445,
  //         pickup_identifier: 87,
  //       },
  //       {
  //         lat: 28.21279487807885,
  //         lng: 83.98445034214141,
  //         pickup_identifier: 88,
  //       },
  //       {
  //         lat: 28.21328052641178,
  //         lng: 83.98357805905316,
  //         pickup_identifier: 89,
  //       },
  //       {
  //         lat: 28.21658009375373,
  //         lng: 83.98085451278217,
  //         pickup_identifier: 90,
  //       },
  //       {
  //         lat: 28.216757254851746,
  //         lng: 83.97924332502424,
  //         pickup_identifier: 91,
  //       },
  //       {
  //         lat: 28.20834170836397,
  //         lng: 83.98608352263469,
  //         pickup_identifier: 92,
  //       },
  //       {
  //         lat: 28.209643157533876,
  //         lng: 83.9783920766391,
  //         pickup_identifier: 93,
  //       },
  //       {
  //         lat: 28.216019233863125,
  //         lng: 83.97770578389718,
  //         pickup_identifier: 94,
  //       },
  //       {
  //         lat: 28.21112990665639,
  //         lng: 83.97710013079657,
  //         pickup_identifier: 95,
  //       },
  //       {
  //         lat: 28.212221899106694,
  //         lng: 83.9769396175644,
  //         pickup_identifier: 96,
  //       },
  //       {
  //         lat: 28.20913630457743,
  //         lng: 83.97852757797554,
  //         pickup_identifier: 97,
  //       },
  //       {
  //         lat: 28.207762105056158,
  //         lng: 83.98205486897876,
  //         pickup_identifier: 98,
  //       },
  //       {
  //         pickup_identifier: 99,
  //         lat: 28.21391076564885,
  //         lng: 83.97941513495962,
  //       },
  //     ],
  //     max_radius: 0.6272398978840389,
  //     density_ratio: 16.18127624163385,
  //   },
  // ];
  const { user } = useSelector((state: any) => state.user);

  console.log("response", clusterData);

  // console.log("clustering data", clusterData);
  return (
    <>
      <div className="p-4">
        <h1 className="text-xl font-bold">
          Welcome,{user?.fullname || "Dashboard"}{" "}
        </h1>
      </div>

      <div className="my-12 px-4 md:px-8 xl:px-12 py-4">
        <MapLayout>
          {clusterData &&
            clusterData.map((cluster: any, index: number) => (
              <>
                <Circle
                  key={index}
                  center={[cluster.centroid.lat, cluster.centroid.lng]}
                  pathOptions={{ color: colorFun() }}
                  radius={(cluster.max_radius + 0.00001) * 1000}
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
