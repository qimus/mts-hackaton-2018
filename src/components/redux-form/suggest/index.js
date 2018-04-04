/* eslint-disable */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classnames from 'classnames'
import {
    Dropdown,
    Form
} from 'semantic-ui-react'

import LabelExt from 'workflow/components/label-ext'
import InfoIcon from 'workflow/components/redux-form/common/info-icon'

import {
    FORM_BUILDER_CHANGE_VALUE,
    FORM_BUILDER_SUGGEST_SET_TITLE_MAP
} from 'workflow/constants/actions'

import { registerMiddlewareFunctions } from 'workflow/middlewares/redux'
import { getFormValue } from 'workflow/components/form-builder/utils'
import { prepareExpression } from 'form-builder/lib/evaluate'
import request from 'workflow/utils/request'

import './style.scss'

export default class Suggest extends Component {

    unregisterMiddlewareFunctions = [];

    state = {
        titleMap: null,
        isFetching: false
    };

    _mapOptions(options = []) {
        return options.map(item => {
            return {
                ...item,
                key: item.value,
                text: item.name,
                ...(item.extra || {})
            }
        });
    }

    componentWillUnmount() {
        this.unregisterMiddlewareFunctions.forEach(cb => {cb()});
    }

    componentDidMount() {
        if (this.props.depend) {
            const { namePrefix } = this.props;
            const { on, path, field } = this.props.depend;

            let dependFieldValue = getFormValue(prepareExpression(on, { namePrefix }), this.props.schema);

            if (dependFieldValue !== undefined && dependFieldValue !== null && field) {
                let uiFieldSchema = this.props.getFieldPropertiesFromUiSchema(field);

                if (uiFieldSchema && uiFieldSchema.titleMap) {
                    let titleMap = _.get(_.find(uiFieldSchema.titleMap, { value: dependFieldValue }), path);
                    this.setState({ titleMap });
                }
            }

            this.unregisterMiddlewareFunctions.push(
                registerMiddlewareFunctions(({ meta, payload, type }, dispatch) => {
                    const field = prepareExpression(on, { namePrefix });

                    switch (type) {
                        case FORM_BUILDER_CHANGE_VALUE: {
                            if (field === meta.field) {
                                if (path) {
                                    let titleMap = _.get(payload, path);
                                    if (titleMap !== undefined) {
                                        this.setState({ titleMap: titleMap });
                                    }
                                }
                                // something else...
                            }
                            break;
                        }
                    }
                })
            )
        }

        const { input } = this.props;

        this.unregisterMiddlewareFunctions.push(
            registerMiddlewareFunctions(({ meta, payload, type }, dispatch) => {

                switch (type) {
                    case FORM_BUILDER_SUGGEST_SET_TITLE_MAP: {
                        if (input.name === meta.field) {
                            if (payload !== undefined) {
                                this.setState({ titleMap: payload });
                            }
                            // something else...
                        }
                        break;
                    }
                }
            })
        )
    }

    render() {

        let {
            label,
            titleMap,
            help,
            meta: {touched, error, warning} = {},
            input,
            prompt = 'Выберите значение...',
            multi = false,
            ajaxSource,
            readonly,
            isEdited = false,
            noResultsMessage = 'По вашему запросу ничего не найдено'
        } = this.props;

        let { isFetching } = this.state;

        let labelWrapped = (<LabelExt path={input.name}>{label}</LabelExt>);

        if (this.state.titleMap) {
            titleMap = this.state.titleMap;
        }

        const handleChange = (e, { value }) => {
            input.onChange(value);
        };

        const handleBlur = (e, { value }) => {
            input.onBlur(value);
        };

        const handleSearchChange = async (value, { searchQuery }) => {

            if (searchQuery.length >= 2 && ajaxSource) {
                this.setState({isFetching: true});
                let response = await request.get(ajaxSource, { term: searchQuery });

                if (response.statusText === 'OK') {
                    this.setState({
                        titleMap: response.data.result[0]['items'],
                        isFetching: false
                    })
                }
            }
        };

        return (
            <Form.Field error={touched && error} className={classnames({'edited-field': isEdited})}>
                <div style={{display: 'inline-block'}}>{labelWrapped}</div>
                {touched && error && <InfoIcon item={error}/>}
                <Dropdown placeholder={prompt}
                          fluid
                          search
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
    isEdited: PropTypes.bool
};