import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
    Form,
    Search
} from 'semantic-ui-react'

import LabelExt from 'workflow/components/label-ext'
import InfoIcon from 'workflow/components/redux-form/common/info-icon'

import request from 'workflow/utils/request'

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
        this.props.input.onChange(result.title);
    };

    handleSearchChange = async (e, { value }) => {
        const { ajaxSource, ajaxParams = {}, input } = this.props;
        this.setState({ isLoading: true, value });

        if (this.props.handleChange) {
            this.props.handleChange(value);
        }

        input.onChange(value);

        if (this.timerId) {
            clearTimeout(this.timerId);
        }

        this.timerId = setTimeout(async () => {
            let result = await request.get(ajaxSource, { term: value, ...ajaxParams });

            this.setState({
                isLoading: false,
                results: this._mapOptions(_.get(result, 'data.result.0.items'))
            })
        }, 1000);
    };

    render() {
        const { label, meta: { touched = false, error = '' }, readonly = false, showNoResults, minCharacters, input } = this.props;
        const { isLoading, results, value } = this.state;

        const hasError = touched && error !== '';

        let params = {};
        if (readonly) {
            params['readOnly'] = true;
        }

        return (
            <Form.Field error={hasError}>
                <LabelExt path={input.name} style={{ display: 'inline-block' }}>{label}</LabelExt>
                {touched && error && <InfoIcon item={error}/>}
                <Search
                    loading={isLoading}
                    results={results}
                    value={value}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={this.handleSearchChange}
                    showNoResults={showNoResults}
                    minCharacters={minCharacters}
                    {...params}
                />
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