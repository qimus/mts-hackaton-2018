import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'


export default class SearchExampleStandard extends Component {
    state = {
        isLoading: false,
        results: [],
        value: ''
    };

    componentWillMount() {
        this.resetComponent()
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

    handleResultSelect = (e, { result }) => {
        this.props.handleResultSelect(result.title);
        this.setState({ value: result.title });
    };

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value });

        if (this.timerId) {
            clearTimeout(this.timerId);
        }

        this.timerId = setTimeout(async () => {
            this.props.handleSearch(value);

            this.setState({
                isLoading: false,
            })
        }, 500);
    };

    render() {
        const { isLoading, value } = this.state;
        const { results } = this.props;

        return (
            <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={results || []}
                value={value}
                {...this.props}
            />
        )
    }
}