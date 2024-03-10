"use client";

import { Marker, Popup, useMapEvents } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

export default function LocationMarker() {
  const [position, setPosition] = useState<LatLngExpression>();
  const [loading, setLoading] = useState<boolean>(false);

  const map = useMapEvents({
    click() {
      map.locate({ enableHighAccuracy: true });
      setLoading(true);
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
    locationerror(e) {
      setLoading(false);
      alert("An error occurred, please try again!");
      console.log(e.message);
    },
    moveend(e) {
      setLoading(false);
    },
  });

  useEffect(() => {
    if (loading) {
      map.dragging.disable();
      map.doubleClickZoom.disable();
      map.keyboard.disable();
      map.scrollWheelZoom.disable();
      map.touchZoom.disable();
      const container = map.getContainer();
      container.classList.add("cursor-wait");
    } else {
      map.dragging.enable();
      map.doubleClickZoom.enable();
      map.keyboard.enable();
      map.scrollWheelZoom.enable();
      map.touchZoom.enable();
    }
  }, [loading]);

  return (
    <>
      {position ? (
        <Marker position={position}>
          <Popup>
            You are here!
            <br />
            Accuracy varies from 1-50 kilometers
          </Popup>
        </Marker>
      ) : (
        <></>
      )}
    </>
  );
}
