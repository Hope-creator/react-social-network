import React from 'react';
import Users from './Users';
import { connect } from 'react-redux';
import { followUnfollowThunk, setCurrentPage, setUsersCount, toggleFollowingProgress, requestUsers, clearUsers, setSearchUsersName } from '../../redux/users-reducer';
import Preloader from '../common/preloader/Preloader';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers, getSearchUsersName } from '../../redux/users-selectors';
import {withGetOnScroll} from '../../hoc/withGetOnScroll'

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.users.length === 0 &&
            this.props.request(1, this.props.pageSize, this.props.searchName);
        this.props.getOnScroll()
    }

    componentDidUpdate(prevState) {
        if (this.props.searchName !== prevState.searchName) {
            this.props.clearUsers();
            this.props.request(1, this.props.pageSize, this.props.searchName);
            window.onscroll = null;
            this.props.getOnScroll();
        }
    }

    componentWillUnmount() {
        this.props.clearUsers();
        window.onscroll = null;
        this.props.setSearchUsersName('');
        this.props.setCurrentPage(1)
    }

    follow = (id) => {
        this.props.followUnfollowThunk(id, this.props.ownerId, "follow")
    }

    unfollow = (id) => {
        this.props.followUnfollowThunk(id, this.props.ownerId, "unfollow")
    }


    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalCount}
                pageSize={this.props.pageSize}
                users={this.props.users}
                unfollow={this.unfollow}
                follow={this.follow}
                currentPage={this.props.currentPage}
                onPageChange={this.onPageChange}
                followingInProgress={this.props.followingInProgress}
                toggleFollowingProgress={this.props.toggleFollowingProgress}
                setSearchUsersName={this.props.setSearchUsersName}
                ownerId={this.props.ownerId}
                searchName={this.props.searchName}
            />
        </>
    }
}

const UsersContainerWithScroll = withGetOnScroll(UsersContainer)

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        searchName: getSearchUsersName(state),
        ownerId: state.auth.id
    }
}

let mapDispatchToProps = {
    followUnfollowThunk, setUsersCount,
    setCurrentPage,toggleFollowingProgress,
    request: requestUsers, clearUsers, setSearchUsersName
}

const UsersConainer = connect(mapStateToProps, mapDispatchToProps)(UsersContainerWithScroll)



export default UsersConainer;