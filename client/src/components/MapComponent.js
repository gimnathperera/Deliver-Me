import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

const MapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 6.927079, lng: 79.861244 }}
    >
      {props.isMarkerShown && <Marker position={props.position} />}
    </GoogleMap>
  ))
);

export default MapComponent;
