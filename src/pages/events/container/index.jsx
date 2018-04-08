import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ui
import {
    Segment,
    Dimmer,
    Loader,
    Pagination,
    Divider
} from 'semantic-ui-react';

import EventsList from '../list';

// actions
import { getActivities } from "../../../actions/events";

const loaderStyle = {height: 50};

class EventsContainer extends Component {
    state = {
        cityId: null,
        page: 1
    };

    componentDidMount() {
        this.props.getActivities(this.getFilter());
    }

    getFilter = () => {
        const { page, cityId } = this.state;

        return {
            page,
            cityId,
        }
    }

    handlePaginationChange = async (page) => {
        await this.setState({page});
        await this.props.getActivities(this.getFilter());
    }

    render() {
        const { isFetching, events, metadata } = this.props;
        const { pageCount, currentPage } = metadata;

        if (isFetching) {
            return (
                <Segment>
                    <Dimmer active>
                        <Loader indeterminate>Получение событий...</Loader>
                    </Dimmer>

                    <div style={loaderStyle}></div>
                </Segment>
            );
        }

        return (
            <div>
                <EventsList events={events} />

                {pageCount > 1 && (
                    <div>
                        <Divider/>
                        <Pagination activePage={currentPage} onPageChange={this.handlePaginationChange} totalPages={pageCount} />
                    </div>
                )}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    getActivities: bindActionCreators(getActivities, dispatch)
});

const mapStateToProps = (state) => ({
    events: state.events.result,
    metadata: state.events.metadata,
    isFetching: state.events.isFetching,
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer)