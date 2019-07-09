import * as React from "react";
import {ICONS} from "./activities";
import {Marker, InfoWindow} from "react-google-maps";

export default class InfoMarker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {poi: props.poi, id: props.id, open: false, urlImg: undefined};

    this.buildIconMarker = this.buildIconMarker.bind(this);
    this.onClick = this.onClick.bind(this);
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

  onClick() {
    if (!this.state.open && this.props.poi.photos && this.props.poi.photos.length && !this.state.urlImg) {
      this.setState({urlImg: this.props.poi.photos[0].getUrl()});
    }
    this.setState({open: !this.state.open});
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
            <div className={"row text-center"} style={{maxWidth: '200px'}}>
              { this.state.urlImg &&
               <div className={"text-center col m-0 p-0"}>
                <img src={this.state.urlImg} className={"img-fluid"} style={{width: '180px'}}/>
               </div>
              }
              <span className={"col"}>{this.state.poi.name}</span>
            </div>
          </InfoWindow>
        }
      </Marker>
    );
  }
}