import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

const flowers = [
  { id: 1, name: "ดอกไม้ A", lat: 13.7563, lng: 100.5018 },
  { id: 2, name: "ดอกไม้ B", lat: 13.7575, lng: 100.5029 },
];

const MapView = () => {
  const [userPosition, setUserPosition] = useState(null);

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

  return (
    <MapContainer
      center={[13.7563, 100.5018]}
      zoom={20}
      style={{ height: "75vh", width: "93%", marginTop: "2vh", zIndex: "100" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* แสดงตำแหน่งผู้ใช้ */}
      {userPosition && (
        <Marker position={[userPosition.lat, userPosition.lng]}>
          <Popup>คุณอยู่ที่นี่</Popup>
        </Marker>
      )}

      {/* แสดงตำแหน่งดอกไม้ */}
      {flowers.map((flower) => (
        <Marker key={flower.id} position={[flower.lat, flower.lng]}>
          <Popup>{flower.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
