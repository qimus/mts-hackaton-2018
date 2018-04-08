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
import { getUsers } from 'actions/users'

const loaderStyle = {height: 50};

class OrganizationsContainer extends Component {
    state = {
        typeId: this.props.typeId || 1,
        page: 1
    };

    componentDidMount() {
        this.props.getUsers(this.getFilter());
    }

    getFilter = () => {
        const { page, typeId } = this.state;

        return {
            page,
            typeId,
        }
    }

    handlePaginationChange = async (page) => {
        await this.setState({page});
        await this.props.getUsers(this.getFilter());
    }

    render() {
        const { isFetching, users, metadata } = this.props;
        const { pageCount, currentPage } = metadata;

        if (isFetching) {
            return (
                <Segment>
                    <Dimmer active>
                        <Loader indeterminate>Получение списка волонтеров...</Loader>
                    </Dimmer>

                    <div style={loaderStyle}></div>
                </Segment>
            );
        }

        return (
            <div>
                <OrganizationsList users={users} />

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
    getUsers: bindActionCreators(getUsers, dispatch)
});

const mapStateToProps = (state) => ({
    users: state.users.result,
    metadata: state.events.metadata,
    isFetching: state.events.isFetching,
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsContainer)