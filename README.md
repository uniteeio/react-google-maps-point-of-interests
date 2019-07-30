# Presentation

react-google-maps-point-of-interests is a npm package which display a map and a list of checkbox to filter the nearest point of interests.

# Dependencies

It uses react-google-maps to display the map.

# Installation

npm install react-google-maps-point-of-interests

# Components

## GoogleMapsPoIComponent

### Props

| props                         |value                        |
|-------------------------------|-----------------------------|
|`location`            	 	|``` {lat: latitude, lng: longitude} ``` |
|`apiKey`                       |```the google maps apiKey```       |
|`loadingElement`               |```<div style={{ height: `100%` }} />```|
|`containerElement`             |```<div style={{ height: `400px` }} />```|
|`mapElement`                   |```<div style={{ height: `100%` }} />```|
|`filtersOptins`                |```{className: "row p-2", containerClassName: "form-check col", inputClassName: "form-check-input", labelClassName: "form-check-label"}```|
|`loadingOptions`                   |```{className: "w-100 text-center mt-3"}```|
|`loading`                      | ```the loading component```

### Filters

| name                         |google maps type| name displayed |
|-------------------------------|-----------------------------|---|
|`stores`            	 	|``` store ``` |`Boutiques`|
|`restaurant`                       |```bar,cafe,restaurant``` |`Restauration`|
|`school`               |```school```|`Ecoles`|
|`transportation`             |`airport,bus_station,gas_station,train_station,transit_station,subway_station,taxi_stand,parking`|`Transports`|
|`health`                   |`dentist,doctor,hospital,pharmacy,physiotherapist`|`Santé`|
|`culture`                   |`museum,movie_theater,art_gallery,library`|`Activités culturelles`|
|`outdoor`                   |`stadium,park,amusement_park,zoo`|`Activités plein air`|
