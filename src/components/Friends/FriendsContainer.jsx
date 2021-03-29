import React from 'react';
import { connect } from 'react-redux';
import { setCurrentPage, setFriendsCount, unfollowThunk, toggleFollowingProgress, requestFriends, clearFriends, setSearchFriendsName } from '../../redux/friends-reducer';
import Preloader from '../common/preloader/Preloader';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getFriends, getTotalFriendsCount, getSearchFriendsName } from '../../redux/friends-selectors';
import Friends from './Friends';
import { withGetOnScroll } from '../../hoc/withGetOnScroll';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

class FriendsContainer extends React.Component {

    componentDidMount() {
        this.props.request(1, this.props.pageSize, '' ,this.props.ownerId);
        this.props.getOnScroll()
    }

    componentDidUpdate(prevState) {
        if (this.props.searchName !== prevState.searchName) {
            this.props.clearFriends();
            this.props.request(1, this.props.pageSize, this.props.searchName, this.props.ownerId);
            window.onscroll = null;
            this.props.getOnScroll();
        }
    }

    componentWillUnmount() {
        this.props.clearFriends();
        window.onscroll = null;
        this.props.setSearchFriendsName('');
        this.props.setCurrentPage(1)
    }


    onPageChange = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.request(pageNumber, this.props.pageSize, this.props.searchName, this.props.ownerId)
    }

    unFollow = (id) => {
        this.props.unfollowThunk(id);
    }


    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Friends totalUsersCount={this.props.totalFriendsCount}
                pageSize={this.props.pageSize}
                friends={this.props.friends}
                unFollow={this.unFollow}
                currentPage={this.props.currentPage}
                followingInProgress={this.props.followingInProgress}
                toggleFollowingProgress={this.props.toggleFollowingProgress}
                setSearchFriendsName={this.props.setSearchFriendsName}
                isFetchingFriends={this.props.isFetchingFriends}
            />
        </>
    }
}

const FriendsContainerWithGetOnScroll = withGetOnScroll(FriendsContainer)

let mapStateToProps = (state) => {
    return {
        friends: getFriends(state),
        pageSize: getPageSize(state),
        totalCount: getTotalFriendsCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        searchName: getSearchFriendsName(state),
        ownerId: state.auth.id,
        isFetchingFriends: state.friendsPage.isFetchingFriends
    }
}

let mapDispatchToProps = {
    unfollowThunk, setFriendsCount, setCurrentPage,
    toggleFollowingProgress, request: requestFriends, clearFriends,
    setSearchFriendsName
}





export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(FriendsContainerWithGetOnScroll)