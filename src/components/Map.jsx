import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

const MapView = ({ flowers }) => {
  const [userPosition, setUserPosition] = useState(null);
  const userFlower = JSON.parse(localStorage.getItem("userFlower"));
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const updatedFlowers = flowers.map((flower) => {
    const isWatered = userFlower.some(
      (userFlower) => userFlower.flower_id === flower.id
    );
    return {
      ...flower,
      status: isWatered ? "watered" : "thirsty",
    };
  });

  return (
    <MapContainer
      center={[13.677892, 100.438262]}
      zoom={20}
      className="h-full w-full m-auto z-10"
      zoomControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {userPosition && (
        <Marker position={[userPosition.lat, userPosition.lng]}>
          <Popup>คุณอยู่ที่นี่</Popup>
        </Marker>
      )}
      {updatedFlowers.map((flower) => {
        const flowerIcon = L.icon({
          iconUrl: flower.icon,
          iconSize: [40, 40], // กำหนดขนาด
          iconAnchor: [20, 40], // จุดยึดไอคอน
          popupAnchor: [0, -35], // จุดแสดง popup
          className: flower.status === "thirsty" ? "grayscale" : "",
        });
        return (
          <Marker
            key={flower.id}
            position={[flower.lat, flower.lng]}
            icon={flowerIcon}
          >
            <Popup>{flower.name}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapView;
