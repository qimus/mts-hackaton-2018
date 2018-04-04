import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'

//shape
import metaShape from 'workflow/constants/shapes/redux-form/meta'

import {
    Popup,
    Icon,
    Grid,
    Form,
    //Divider,
    Input,
    Dropdown,
    List,
    Segment
} from 'semantic-ui-react'

import axios from 'axios'
import qs from 'qs'

import { DEV_ENV } from 'workflow/constants/app'
import MaskedInput from 'react-text-mask'
//import LabelExt from 'workflow/components/label-ext'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import Yup from 'yup'

export default class KedrMap extends Component {
    defaultProps = {
        meta: { error: '', touched: false },
        readonly: false,
        zoom: 7
    };

    state = {
        latitude: null,
        longitude: null,
        coordinateSystem: 1,
        isFetching: false,
        data: null,
        errors: {
            lat: {},
            lng: {}
        }
    }

    getCoordinateSystems = () => {
        return [
            {
                key: 1,
                value: 1,
                text: 'WGS-84'
            },
            {
                key: 2,
                value: 2,
                text: 'СК-42'
            },
            {
                key: 3,
                value: 3,
                text: 'СК-95'
            },
            {
                key: 5,
                value: 5,
                text: 'ГСК-2011'
            }
        ];
    }

    componentWillMount() {
        const data = this.props.input.value;

        this.setState({
            data: {
                lng: data.lng,
                lat: data.lat
            },
            latitude: data.latitude,
            longitude: data.longitude
        });

        this.schema = this.getSchema();
    }

    getSchema = () => {
        return Yup.object().shape({
            lat: Yup.object().shape({
                deg: Yup.number().max(90, 'Значение градусов широты не может быть больше 90'),
                min: Yup.number().max(60, 'Значение минут широты не может быть больше 60'),
                sec: Yup.number().max(60, 'Значение секунд широты не может быть больше 60'),
            }),
            lng: Yup.object().shape({
                deg: Yup.number().max(180, 'Значение градусов долготы не может быть больше 180'),
                min: Yup.number().max(60, 'Значение минут долготы не может быть больше 60'),
                sec: Yup.number().max(60, 'Значение секунд долготы не может быть больше 60'),
            })
        })
    }

    setData = (field1, field2, value) => {
        let data = this.state.data;

        data[field1][field2] = value | 0;
        this.setState({ data });
        this.requestCoordinates();
    }

    setCoordinateSystem = (coordinateSystem) => {
        this.setState({ coordinateSystem });
        this.requestCoordinates();
    }

    getErrorMessage = (errors) => {
        let allErrors = [];

        Object.keys(errors).map((i) => {
            Object.keys(errors[i]).map((j) => {
                allErrors.push(errors[i][j]);
            })
        });

        return (
            <List ordered={allErrors.length > 1 ? true : false}>
                {allErrors.map((error, i) => {
                    return (
                        <List.Item key={i}>{error}</List.Item>
                    )
                })}
            </List>
        )
    }

    requestCoordinates = () => {
        this.setState({ isFetching: true });
        const { data } = this.state;

        if (this.t) {
            window.clearTimeout(this.t);
        }

        if (this.c) {
            this.c.cancel();
        }

        try {
            this.schema.validateSync(data);
        } catch (e) {
            let { errors } = this.state;
            const parts = e.path.split('.');
            errors[parts[0]][parts[1]] = e.message;
            this.setState({ errors, isFetching: false });

            return;
        }

        const url = '/basic/web/ajax/location/coord-convert-batch';
        let params = {
            data: { 0: { ...data, from: this.state.coordinateSystem, to: 1 } }
        };

        this.c = axios.CancelToken.source();
        this.t = window.setTimeout(() => {
            axios.get(url, {
                cancelToken: this.c.token,
                params: {
                    ...params
                },
                paramsSerializer: function (params) {
                    return qs.stringify(params, { indices: false })
                }
            }).then((response) => {
                this.setState({
                    latitude: response.data[0].lat.val,
                    longitude: response.data[0].lng.val,
                    isFetching: false
                });

                this.props.input.onChange({
                    latitude: response.data[0].lat.val,
                    longitude: response.data[0].lng.val,
                    lat: this.state.data.lat,
                    lng: this.state.data.lng
                });

                if (this.props.afterChangeHandle) {
                    this.props.afterChangeHandle(response.data[0]);
                }
            }).catch((error) => {
                this.setState({ isFetching: false });

                if (!axios.isCancel(error)) {
                    console.log(error)
                }
            });
        }, 1000);
    }

    getData = (field1, field2) => {
        return this.state.data[field1][field2];
    }

    renderInput = (field1, field2) => {
        const coordinateMask = createNumberMask({
            prefix: '',
            allowDecimal: true,
            decimalSymbol: '.',
            decimalLimit: 2,
            integerLimit: field1 === 'lat' ? 2 : 3,
            requireDecimal: false,
            allowNegative: false,
            allowLeadingZeroes: false
        })

        const { errors } = this.state;
        let label = {};

        if (errors[field1][field2]) {
            label.error = true;
        }

        return (
            <Input
                {...label}
                children={
                    <MaskedInput
                        value={this.getData(field1, field2) || ''}
                        onChange={(event) => {
                            let { errors } = this.state;
                            errors[field1][field2] = null;
                            this.setState({ errors });

                            this.setData(field1, field2, event.target.value);
                        }}
                        placeholder={'0.00'}
                        mask={coordinateMask}
                        guide={false}
                    />
                }
            />
        );
    };

    createMapOptions = (maps) => {
        // console.log('55555555555555555555', maps);
        // next props are exposed at maps
        // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
        // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
        // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
        // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
        // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
        return {
            zoomControlOptions: {
                position: maps.ControlPosition.RIGHT_CENTER,
                style: maps.ZoomControlStyle.SMALL
            },
            mapTypeControlOptions: {
                position: maps.ControlPosition.TOP_RIGHT
            },
            //  mapTypeId: maps.MapTypeId.SATELLITE,
            mapTypeControl: true,
        };
    };

    render() {
        let { zoom } = this.props;
        let { isFetching, latitude, longitude } = this.state;
        const { errors } = this.state;

        const text = `${latitude}, ${longitude}`;
        const marker = (<Icon name={'marker'} size={'huge'} color={'red'}/>);
        const errorIcon = (<Icon name={'attention'} size={'large'} color={'red'}/>)

        const errorInLat = (errors.lat.deg || errors.lat.min || errors.lat.sec);
        const errorInLng = (errors.lng.deg || errors.lng.min || errors.lng.sec);

        return (
            <div>
                <Segment style={{ height: 500 }}>
                    <GoogleMapReact
                        center={{ lat: latitude, lng: longitude }}
                        defaultZoom={zoom}
                        options={this.createMapOptions}>

                        <Popup
                            on={'click'}
                            lat={latitude}
                            lng={longitude}
                            trigger={marker}
                            content={text}
                        />

                    </GoogleMapReact>
                </Segment>

                <Segment>
                    <Grid columns={12}>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                Система координат:
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <span style={{ color: errorInLat ? 'red' : 'black' }}>Широта:</span>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <span style={{ color: errorInLng ? 'red' : 'black' }}>Долгота:</span>
                            </Grid.Column>
                            <Grid.Column width={1}>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{ marginTop: -20 }}>
                            <Grid.Column width={3}>
                                <Dropdown
                                    placeholder='Выберите' fluid selection
                                    options={this.getCoordinateSystems()}
                                    value={this.state.coordinateSystem}
                                    onChange={(event, data) => {
                                        this.setCoordinateSystem(data.value);
                                    }}/>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Form>
                                    <Form.Group>
                                        <Form.Input width={4}>
                                            {this.renderInput('lat', 'deg')}
                                            <label>°</label>

                                        </Form.Input>
                                        <Form.Input width={4}>
                                            {this.renderInput('lat', 'min')}
                                            <label>′</label>

                                        </Form.Input>
                                        <Form.Input width={4}>
                                            {this.renderInput('lat', 'sec')}
                                            <label>″</label>

                                        </Form.Input>
                                    </Form.Group>
                                </Form>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Form>
                                    <Form.Group>
                                        <Form.Input width={4}>
                                            {this.renderInput('lng', 'deg')}
                                            <label>°</label>

                                        </Form.Input>
                                        <Form.Input width={4}>
                                            {this.renderInput('lng', 'min')}
                                            <label>′</label>

                                        </Form.Input>
                                        <Form.Input width={4}>
                                            {this.renderInput('lng', 'sec')}
                                            <label>″</label>

                                        </Form.Input>
                                    </Form.Group>
                                </Form>
                            </Grid.Column>
                            <Grid.Column width={1}>
                                {isFetching && <Icon loading={true} name={'spinner'} size={'large'}/>}
                                {!isFetching && (errorInLat || errorInLng) && (
                                    <Popup
                                        content={this.getErrorMessage(errors)}
                                        trigger={errorIcon}/>
                                )}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>

            </div>

        )
    }
}

if (process.env.NODE_ENV === DEV_ENV) {
    KedrMap.propTypes = {
        meta: PropTypes.shape(metaShape),
        afterChangeHandle: PropTypes.func,
        labelClass: PropTypes.string,
        inputClass: PropTypes.string,
        containerStyle: PropTypes.string,
        readonly: PropTypes.bool,
        input: PropTypes.object,
        zoom: PropTypes.number
    };
}

