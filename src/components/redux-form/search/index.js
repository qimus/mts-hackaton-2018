import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
    Form,
    Search
} from 'semantic-ui-react'

import InfoIcon from 'components/redux-form/common/info-icon'

import request from 'utils/request'

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

export default class SearchControl extends Component {

    static defaultProps = {
        minCharacters: 2,
        showNoResults: false,
        noResultsMessage: 'По Вашему запросу ничего не найдено'
    };

    state = {
        isLoading: false,
        results: [],
        value: this.props.input.value || '',
        item: {}
    };

    timerId = null;

    _mapOptions = (items = []) => {
        if (this.props.mapper) {
            return this.props.mapper(items);
        }

        return items.map(item => {
            return {
                ...item,
                value: item.value,
                title: item.name,
                ...(item.extra || {})
            }
        });
    };

    handleResultSelect = (e, { result }) => {
        this.setState({ value: result.title, item: result });

        if (this.props.handleResultSelect) {
            this.props.handleResultSelect(result);
        }
        this.props.input.onChange(result);
    };

    handleSearchChange = async (e, { value }) => {
        const { ajaxSource, ajaxParams = {}, input } = this.props;
        this.setState({ isLoading: true, value });

        if (this.props.handleChange) {
            this.props.handleChange(value);
        }

        input.onChange({title: value});

        if (this.timerId) {
            clearTimeout(this.timerId);
        }

        this.timerId = setTimeout(async () => {
            let result = await request.get(ajaxSource, { term: value, ...ajaxParams });

            this.setState({
                isLoading: false,
                results: this._mapOptions(_.get(result, 'data.result'))
            })
        }, 1000);
    };

    render() {
        const { meta: { touched = false, error = '' }, readonly = false, showNoResults, minCharacters } = this.props;
        const { isLoading, results, value } = this.state;

        const hasError = touched && error !== '';

        let params = {};
        if (readonly) {
            params['readOnly'] = true;
        }

        const handleBlur = (e, data) => {
            if (this.props.handleBlur) {
                this.props.handleBlur(data);
            }
        };

        return (
            <Form.Field error={hasError} style={style.field}>
                <Search
                    loading={isLoading}
                    results={results}
                    value={value}
                    onBlur={handleBlur}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={this.handleSearchChange}
                    showNoResults={showNoResults}
                    minCharacters={minCharacters}
                    {...params}
                />
                {touched && error && <InfoIcon item={error} style={style.icon}/>}
            </Form.Field>
        )
    }
}

SearchControl.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object,
    readonly: PropTypes.bool,
    ajaxSource: PropTypes.string,
    minCharacters: PropTypes.number,
    ajaxParams: PropTypes.object,
    showNoResults: PropTypes.bool,
    size: PropTypes.string,
    noResultsMessage: PropTypes.string,
    handleResultSelect: PropTypes.func,
    handleChange: PropTypes.func,
    mapper: PropTypes.func
};