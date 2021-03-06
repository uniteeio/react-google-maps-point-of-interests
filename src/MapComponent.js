import React from "react";
import {
        withScriptjs,
        withGoogleMap,
        GoogleMap,
        Marker
} from "react-google-maps";

import {TYPES} from "./activities";

/**
 * Container
 */
export class MapContainer extends React.Component {

        constructor(props) {
                super(props);

                this.state = {
                        map: null,
                        location: <Marker position={this.props.location}/>,
                        markers: [],
                        checks: [],
                        filters: null,
                        placesMarkers: [],
                        styleFilter: props.styleFilter,
                        styleFilters: props.styleFilters
                };

                console.log(this.state.styleFilter);

                for (var i = 0; i < TYPES.length; i++) {
                        this.state.checks.push(false);
                }

                this.onMapMounted = this.onMapMounted.bind(this);
                this.fetchPlaces = this.fetchPlaces.bind(this);
                this.updatePlaces = this.updatePlaces.bind(this);
                this.onAddFilter = this.onAddFilter.bind(this);
                this.existKey = this.existKey.bind(this);
                this.onRemoveFilter = this.onRemoveFilter.bind(this);
                this.onClickCheck = this.onClickCheck.bind(this);
                this.buildFilters = this.buildFilters.bind(this);
        }

        componentDidMount() {
                this.setState({filters: this.buildFilters()})
        }

        onClickCheck(idChecked) {
                this.state.checks[idChecked] = !this.state.checks[idChecked];
        }

        onAddFilter(filter) {
                const types = filter.values;

                for (var i = 0; i < types.length; i++) {
                        this.fetchPlaces(types[i], filter.id);
                }
        }

        /**
         * If the marker is on the map or not
         * @param key of the marker
         * @returns {boolean}
         */
        existKey(key) {
                for (var i = 0; i < this.state.markers.length; i++) {
                        if (key === this.state.markers[i].key)
                                return (true);
                }
                return (false);
        }

        onRemoveFilter(filter) {
                var newMarkers = [];

                for (var i = 0; i < this.state.placesMarkers.length; i++) {
                        if (this.state.placesMarkers[i].name !== filter) {
                                var toKeep = this.state.placesMarkers[i];
                                for (var j = 0; j < toKeep.ids.length; j++) {
                                        for (var k = 0; k < this.state.markers.length; k++) {
                                                if (toKeep.ids[j] === this.state.markers[k].key) {
                                                        newMarkers.push(this.state.markers[k]);
                                                        break;
                                                }
                                        }
                                }
                        }
                        else {
                                this.state.placesMarkers.splice(i, 1);
                                i--;
                        }
                }
                this.setState({markers: newMarkers});
        }

        onMapMounted(map) {
                this.setState({map: map});
        }

        /**
         * From place object, create a marker with icon, key and position
         * @param places returned by the google api
         * @returns {Array} of the marker keys
         */
        createMarkersAndGetItsIds(places) {
                const ids = [];

                for (var i = 0; i < places.length; i++) {
                        if (!this.existKey(places[i].id)) {
                                let iconMarker = new window.google.maps.MarkerImage(
                                        places[i].icon,
                                        null,
                                        null,
                                        null,
                                        new window.google.maps.Size(20, 20)
                                );

                                ids.push(places[i].id);
                                this.setState({markers: this.state.markers.concat([<Marker
                                                icon={iconMarker}
                                                key={places[i].id}
                                                position={{lat: places[i].geometry.location.lat(), lng: places[i].geometry.location.lng()}}
                                                />])});
                                }

                }
                return (ids);
        }

        updatePlaces(places, nameFilter) {
                for (var i = 0; i < this.state.placesMarkers.length; i++) {
                        if (this.state.placesMarkers[i].name === nameFilter) {
                                this.state.placesMarkers[i].ids = this.state.placesMarkers[i].ids.concat(this.createMarkersAndGetItsIds(places));
                                return;
                        }
                }
                const object = {name: nameFilter, ids: this.createMarkersAndGetItsIds(places)};
                this.state.placesMarkers.push(object);
        }

        /**
         * Use the google maps api
         * @param type
         * @param filterId
         */
        fetchPlaces(type, filterId) {
                if (this.state.map === null || !this.props.location)
                        return;

                const service = new google.maps.places.PlacesService(this.state.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
                const request = {
                        location: new google.maps.LatLng(this.props.location.lat, this.props.location.lng),
                        radius: '500'
                };
                if (type) {
                        request.type = type;
                }
                service.nearbySearch(request, (results, status, pageToken) => {
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                                this.updatePlaces(results, filterId);
                                if (pageToken.hasNextPage) {
                                        pageToken.nextPage();
                                }
                        }
                });
        }

        buildFilters() {
                const filters = [];

                for (var i = 0; i < TYPES.length; i++) {
                        const cp = i;
                        filters.push(
                                <div key={"filter" + i} className={"form-check form-check-inline"} style={this.state.styleFilter}>
                                        <input className="form-check-input" type="checkbox" id={TYPES[i].id} value={TYPES[i].id} onChange={ () => {
                                                this.state.checks[cp] = !this.state.checks[cp];
                                                (this.state.checks[cp]) ? this.onAddFilter(TYPES[cp]) : this.onRemoveFilter(TYPES[cp].id);
                                        } }/>
                                        <label className="form-check-label" htmlFor={TYPES[i].id}>{TYPES[i].name}</label>
                                </div>
                        )
                }

                return (filters);
        }

        render() {
                return (
                        <div>
                                <GoogleMap defaultZoom={15} defaultCenter={this.props.location} ref={this.onMapMounted}>
                                        {this.state.location}
                                        {this.state.markers}
                                </GoogleMap>
                                <div id="filter" className="row pt-1" style={this.state.styleFilters}>
                                        {this.state.filters}
                                </div>
                        </div>
                )
        }
}

const MapComponent = withScriptjs(withGoogleMap(props => <MapContainer {...props} />));

export default MapComponent;