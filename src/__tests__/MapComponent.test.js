import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { GOOGLE_MAPS_MAP } from "../activities";
import {MapContainer} from "../MapComponent"

// Enzyme config
Enzyme.configure({adapter: new Adapter()});

describe ('Map Component', () => {
        it('renders', () => {
                const wrapper = shallow(<MapContainer
                        googleMapURL={GOOGLE_MAPS_MAP}
                        location={{lat: 0, lng: 0}}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                />);

                expect(wrapper).to.have.lengthOf(1);
        });

        it('renders buildFilters', () => {

                const wrapper = shallow(<MapContainer
                        googleMapURL={GOOGLE_MAPS_MAP}
                        location={{lat: 0, lng: 0}}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                />);

                expect(wrapper.find('.row').children()).to.have.lengthOf(7);
        });

        it('test function onClickCheck', () => {

                const wrapper = shallow(<MapContainer
                        googleMapURL={GOOGLE_MAPS_MAP}
                        location={{lat: 0, lng: 0}}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                />);

                const instance = wrapper.instance();

                expect(wrapper.state('checks')).to.be.an('array').that.does.not.include(true);
                instance.onClickCheck(0);
                expect(wrapper.state('checks')).to.be.an('array').that.does.include(true);
        });

        it('test function existskey', () => {

                const wrapper = shallow(<MapContainer
                        googleMapURL={GOOGLE_MAPS_MAP}
                        location={{lat: 0, lng: 0}}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                />);

                const instance = wrapper.instance();
                wrapper.setState({markers: [ {key: 0}]});
                expect(instance.existKey(0)).to.equal(true);
        });

        it('test function onRemoveFilter', () => {

                const wrapper = shallow(<MapContainer
                        googleMapURL={GOOGLE_MAPS_MAP}
                        location={{lat: 0, lng: 0}}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                />);

                const instance = wrapper.instance();

                wrapper.setState({placesMarkers: [{name: 'stores', ids: [0]}]});
                instance.onRemoveFilter('stores');
                expect(wrapper.state('placesMarkers')).to.be.an('array').and.to.have.lengthOf(0);
        });

});