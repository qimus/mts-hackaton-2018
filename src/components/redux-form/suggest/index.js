import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Dropdown,
    Form
} from 'semantic-ui-react'

import InfoIcon from 'components/redux-form/common/info-icon'

import request from 'utils/request'

import './style.scss'

const style = {
    field: {
        position: 'relative',
        paddingRight: 10
    },
    icon: {
        position: 'absolute',
        top: '25%'
    }
};

export default class Suggest extends Component {

    static defaultProps = {
        eager: false,
        search: true
    };

    state = {
        titleMap: null,
        isFetching: false
    };

    _mapOptions(options = []) {
        return options.map(item => {
            return {
                ...item,
                value: item.id,
                text: item.name,
                ...(item.extra || {})
            }
        });
    }

    async componentDidMount() {
        const { ajaxSource, eager } = this.props;

        if (ajaxSource && eager) {
            this.setState({isFetching: true});
            let response = await request.get(ajaxSource);

            if (response.statusText === 'OK') {
                this.setState({
                    titleMap: response.data.result,
                    isFetching: false
                })
            }
        }
    }

    render() {

        let {
            titleMap,
            meta: { touched, error } = {},
            input,
            prompt = 'Выберите значение...',
            multi = false,
            ajaxSource,
            readonly,
            search,
            noResultsMessage = 'По вашему запросу ничего не найдено'
        } = this.props;

        let { isFetching } = this.state;

        if (this.state.titleMap) {
            titleMap = this.state.titleMap;
        }

        const handleChange = (e, params) => {
            input.onChange(params.value);
            if (this.props.handleChange) {
                this.props.handleChange(params);
            }
        };

        const handleBlur = (e, { value }) => {
            //input.onBlur(value);
        };

        const handleSearchChange = async (value, { searchQuery }) => {

            if (searchQuery.length >= 2 && ajaxSource) {
                this.setState({isFetching: true});
                let response = await request.get(ajaxSource, { term: searchQuery });

                if (response.statusText === 'OK') {
                    this.setState({
                        titleMap: response.data.result,
                        isFetching: false
                    })
                }
            }
        };

        return (
            <Form.Field error={touched && error} style={style.field}>
                <Dropdown placeholder={prompt}
                          fluid
                          search={search}
                          selection
                          disabled={readonly || isFetching}
                          loading={isFetching}
                          {...input}
                          onChange={handleChange}
                          onSearchChange={handleSearchChange}
                          onBlur={handleBlur}
                          multiple={multi}
                          style={{ borderColor: '#999' }}
                          noResultsMessage={noResultsMessage}
                          options={this._mapOptions(titleMap)}/>
                {touched && error && <InfoIcon item={error} style={style.icon}/>}
            </Form.Field>
        )
    }
}

Suggest.propTypes = {
    label: PropTypes.string,
    titleMap: PropTypes.array,
    readonly: PropTypes.bool,
    help: PropTypes.string,
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
    ajaxSource: PropTypes.string,
    prompt: PropTypes.string,
    multi: PropTypes.bool,
    noResultsMessage: PropTypes.string,
    isEdited: PropTypes.bool,
    eager: PropTypes.bool,
    search: PropTypes.bool
};