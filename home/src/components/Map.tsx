'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icon path in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

export default function LocationMap() {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  if (!position) {
    return <p className="text-gray-500">Localisation en cours...</p>;
  }

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      className="h-[400px] rounded-xl shadow"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>Vous êtes ici 👋</Popup>
      </Marker>
    </MapContainer>
  );
}
