import * as React from "react";
import {ICONS} from "./activities";
import {Marker, InfoWindow} from "react-google-maps";

export default class InfoMarker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {open: false, poi: props.poi, id: props.id};

    this.onClick = this.onClick.bind(this);
    this.buildIconMarker = this.buildIconMarker.bind(this);
  }

  onClick() {
    this.setState({open: !this.state.open});
  }

  buildIconMarker() {
    return new window.google.maps.MarkerImage(
      ICONS[this.state.id],
      null,
      null,
      null,
      new window.google.maps.Size(40, 40)
    );

  }

  render() {
    return (
      <Marker
        icon={this.buildIconMarker()}
        key={this.state.poi.id}
        position={{lat: this.state.poi.geometry.location.lat(), lng: this.state.poi.geometry.location.lng()}}
        onClick={this.onClick}
      >

        {
          this.state.open &&
          <InfoWindow onCloseClick={this.onClick}>
            <span>{this.state.poi.name}</span>
          </InfoWindow>
        }
      </Marker>
    );
  }
}