"use client";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Map() {
  const router = useRouter();
  const pathname = usePathname();

  const [position, setPosition] = useState([42.6977, 23.3219]); // Default center
  const zoom = 8; // Default zoom level

  const bounds = [
    [41.235, 22.357], // Southwest corner
    [44.216, 28.295], // Northeast corner
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const customIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png", // Example URL
    iconAnchor: [19, 38], // Anchor point
    popupAnchor: [0, -30], // Position of the popup relative to the icon
  });

  function MapEventHandler() {
    useMapEvents({
      click(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        if (lat >= 41.235 && lat <= 44.216 && lng >= 22.357 && lng <= 28.295) {
          setPosition([lat, lng]);
          router.replace(`${pathname}?lat=${lat}&lng=${lng}`);
        } else {
          console.log("Clicked outside Bulgaria's borders");
        }
      },
    });
  }
  return (
    <MapContainer
      center={position}
      zoom={zoom}
      minZoom={8}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      maxBounds={bounds} // Set map bounds to Bulgaria
      maxBoundsViscosity={1.0} // Prevent panning outside of the bounds
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEventHandler />
      <Marker position={position} icon={customIcon} draggable={true}>
        <Popup>You are here</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
