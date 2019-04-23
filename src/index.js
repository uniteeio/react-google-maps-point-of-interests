import React from "react";
import MapComponent from "./MapComponent";
import {GOOGLE_MAPS_MAP} from "./activities";

export default class GoogleMapsPoIComponent extends React.Component {

        constructor (props) {
                super (props);
        }

        render() {
                if (!this.props.apiKey)
                        return ('');
                return (
                        <div>
                        <MapComponent googleMapURL={GOOGLE_MAPS_MAP.replace("$TO_REPLACE_API_KEY$", this.props.apiKey)} {...this.props}/>
                </div>
                        )
        }
}q