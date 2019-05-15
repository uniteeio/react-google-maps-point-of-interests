
import storeIcon from "../assets/images/shopping.png";
import restaurantIcon from "../assets/images/restaurant.png";
import schoolIcon from "../assets/images/school.png";
import transportIcon from "../assets/images/transport.png";
import healthIcon from "../assets/images/doctor.png";
import cultureIcon from "../assets/images/culture.png";
import outdoorIcon from "../assets/images/outdoor.png";

export const TYPES = [
        {id: 'stores', name: 'Boutiques', values: ['store']},
        {id: 'restaurant', name: 'Restauration', values: ['bar','cafe','restaurant']},
        {id: 'school', name: 'Ecoles', values: ['school']},
        {id: 'transportation', name: 'Transports', values: ['airport','bus_station','gas_station','train_station','transit_station','subway_station','taxi_stand','parking']},
        {id: 'health', name: 'Santé', values: ['dentist','doctor','hospital','pharmacy']},
        {id: 'culture', name: 'Activités culturelles', values: ['museum','movie_theater','art_gallery','library']},
        {id: 'outdoor', name: 'Activités plein air', values: ['park','amusement_park','zoo']}
];

export const ICONS = {
        stores: storeIcon,
        restaurant: restaurantIcon,
        school: schoolIcon,
        transportation: transportIcon,
        health: healthIcon,
        culture: cultureIcon,
        outdoor: outdoorIcon
};

export const GOOGLE_MAPS_MAP = "https://maps.googleapis.com/maps/api/js?key=$TO_REPLACE_API_KEY$&libraries=geometry,drawing,places";
