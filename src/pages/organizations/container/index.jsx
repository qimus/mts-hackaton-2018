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

import OrganizationsList from '../list';

// actions
import { getOrganizations } from "../../../actions/organizations";

const loaderStyle = {height: 50};

class OrganizationsContainer extends Component {
    state = {
        cityId: null,
        page: 1
    };

    componentDidMount() {
        this.props.getOrganizations(this.getFilter());
    }

    getFilter = () => {
        const { page, cityId } = this.state;

        return {
            page,
            cityId,
            isSponsor: this.props.isSponsor
        }
    }

    handlePaginationChange = async (page) => {
        await this.setState({page});
        await this.props.getOrganizations(this.getFilter());
    }

    render() {
        const { isFetching, organizations, metadata } = this.props;
        const { pageCount, currentPage } = metadata;

        if (isFetching) {
            return (
                <Segment>
                    <Dimmer active>
                        <Loader indeterminate>Получение организаций...</Loader>
                    </Dimmer>

                    <div style={loaderStyle}></div>
                </Segment>
            );
        }

        return (
            <div>
                <OrganizationsList organizations={organizations} />

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
    getOrganizations: bindActionCreators(getOrganizations, dispatch)
});

const mapStateToProps = (state) => ({
    organizations: state.organizations.result,
    metadata: state.events.metadata,
    isFetching: state.events.isFetching,
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsContainer)