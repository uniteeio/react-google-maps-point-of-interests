import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

import {ICONS, TYPES} from "./activities";



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
      styleFilters: props.styleFilters,
      loading: false
    };

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
    this.onEndGoogleMapsLoading = this.onEndGoogleMapsLoading.bind(this);
  }

  componentDidMount() {
    this.setState({filters: this.buildFilters()})
  }

  onClickCheck(idChecked) {
    this.state.checks[idChecked] = !this.state.checks[idChecked];
  }

  onAddFilter(filter) {
    const types = filter.values;

    this.setState({loading: true});

    for (var i = 0; i < types.length; i++) {
      this.fetchPlaces(types[i], filter.id, i < types.length - 1);
    }
  }

  onEndGoogleMapsLoading(id) {
    for (var j = 0; j < this.state.placesMarkers.length; j++) {
      if (this.state.placesMarkers[j].name === id) {
        this.state.placesMarkers[j].ids = this.createMarkersAndGetItsIds(this.state.placesMarkers[j].places, id);
      }
    }
    this.setState({loading: false});
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
        if (toKeep.ids === undefined)
          continue;
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
  createMarkersAndGetItsIds(places, id) {
    const ids = [];

    for (var i = 0; i < places.length; i++) {
      if (!this.existKey(places[i].id)) {
        let iconMarker = new window.google.maps.MarkerImage(
          ICONS[id],
          null,
          null,
          null,
          new window.google.maps.Size(40, 40)
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
        this.state.placesMarkers[i].places = [...this.state.placesMarkers[i].places, ...places];
        return;
      }
    }
    const object = {name: nameFilter, places: places};
    this.state.placesMarkers.push(object);
  }

  /**
   * Use the google maps api
   * @param type
   * @param filterId
   */
  fetchPlaces(type, filterId, isNotEnd) {
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
      if (!isNotEnd && status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        this.setState({loading: false});
      }
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.updatePlaces(results, filterId);
        if (pageToken.hasNextPage) {
          pageToken.nextPage();
        }
        else if (!isNotEnd) {
          this.onEndGoogleMapsLoading(filterId);
        }
      }
    });
  }

  buildFilters(prevChecks = this.state.checks) {
    const filters = [];
    var {filtersOptions} = this.props;

    if (!filtersOptions) {
      filtersOptions = {};
    }
    if (!filtersOptions.containerClassName) {
      filtersOptions.containerClassName = "form-check col";
    }
    if (!filtersOptions.inputClassName) {
      filtersOptions.inputClassName = "form-check-input";
    }
    if (!filtersOptions.labelClassName) {
      filtersOptions.labelClassName = "form-check-label";
    }

    for (var i = 0; i < TYPES.length; i++) {
      const cp = i;
      filters.push(
        <div key={"filter" + i} className={filtersOptions.containerClassName}>
          <input className={filtersOptions.inputClassName} id={TYPES[i].id} type="checkbox" value={TYPES[i].id} checked={prevChecks[cp]}
                 onChange={ () => {
                   var checks = this.state.checks;
                   checks[cp] = !checks[cp];
                   this.setState({checks: checks});
                   (checks[cp]) ? this.onAddFilter(TYPES[cp]) : this.onRemoveFilter(TYPES[cp].id);
                   this.setState({filters: this.buildFilters(checks)});
                 }
                 }/>
          <label htmlFor={TYPES[i].id} className={filtersOptions.labelClassName}>{TYPES[i].name}</label>
        </div>
      )
    }

    return (filters);
  }

  render() {
    var {filtersOptions, loadingOptions} = this.props;

    if (!filtersOptions)
      filtersOptions = {};
    if (!filtersOptions.className)
      filtersOptions.className = "row pt-1";
    if (!filtersOptions.id)
      filtersOptions.id = "filters";
    if (!loadingOptions)
      loadingOptions = {};
    if (!loadingOptions.className)
      loadingOptions.className = "text-center";
    if (!loadingOptions.id)
      loadingOptions.id = "loading";
    return (
      <div>
        <GoogleMap defaultZoom={15} defaultCenter={this.props.location} ref={this.onMapMounted}>
          {this.state.location}
          {this.state.markers}
        </GoogleMap>
        {!this.state.loading &&
        <div id={filtersOptions.id} className={filtersOptions.className}>
          {this.state.filters}
        </div>}
        {this.state.loading &&
        <div id={loadingOptions.id} className={loadingOptions.className}>{this.props.loading}</div>}
      </div>
    )
  }
}

const MapComponent = withScriptjs(withGoogleMap(props => <MapContainer {...props} />));

export default MapComponent;