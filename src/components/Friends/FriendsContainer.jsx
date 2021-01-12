import React from 'react';
import { connect } from 'react-redux';
import { setCurrentPage, setFriendsCount, unfollow, toggleFollowingProgress, requestFriends, clearFriends, setSearchFriendsName } from '../../redux/friends-reducer';
import Preloader from '../common/preloader/Preloader';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getFriends, getTotalFriendsCount, getSearchFriendsName } from '../../redux/friends-selectors';
import Friends from './Friends';

class FriendsContainer extends React.Component {



    componentDidMount() {
        this.props.friends.length == 0 &&
            this.props.requestFriends(this.props.currentPage, this.props.pageSize);
        this.getFriendsOnScroll()
    }

    componentDidUpdate(prevState) {
        if (this.props.searchFriendsName != prevState.searchFriendsName) {
            this.props.clearFriends();
            this.props.requestFriends(1, this.props.pageSize, this.props.searchFriendsName);
            window.onscroll = null;
            this.getFriendsOnScroll();
        }
    }

    componentWillUnmount() {
        this.props.clearFriends();
        window.onscroll = null;
        this.props.setSearchFriendsName('');
    }

    getFriendsOnScroll = () => {

        let check = setInterval(
            () => {
                {
                    if (Math.ceil(this.props.currentPage * this.props.pageSize) > this.props.totalFriendsCount) {
                        console.log("max friends")
                        clearInterval(check);
                        window.onscroll = null;
                    }
                    if (window.pageYOffset + 15 >= document.body.scrollHeight - window.innerHeight) this.onPageChange(this.props.currentPage + 1);
                    else clearInterval(check);
                }
            }, 1000)

        return window.onscroll = () => {
            let currentScrollPos = window.pageYOffset;
            let maxScroll = document.body.scrollHeight - window.innerHeight;
            console.log(this.props.currentPage)
            console.log("scroll")
            if (currentScrollPos + 15 >= maxScroll) this.onPageChange(this.props.currentPage + 1);
            if (Math.ceil(this.props.currentPage * this.props.pageSize) > this.props.totalFriendsCount) { console.log("max friends onscroll"); window.onscroll = null; }
        }
    }

    onPageChange = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.requestFriends(pageNumber, this.props.pageSize, this.props.searchFriendsName)
    }

    unFollow = (id) => {
        this.props.unfollow(id);
    }


    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Friends totalUsersCount={this.props.totalFriendsCount}
                pageSize={this.props.pageSize}
                friends={this.props.friends}
                unFollow={this.unFollow}
                currentPage={this.props.currentPage}
                onPageChange={this.onPageChange}
                followingInProgress={this.props.followingInProgress}
                toggleFollowingProgress={this.props.toggleFollowingProgress}
                setSearchFriendsName={this.props.setSearchFriendsName}
            />
        </>
    }
}

/*let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}*/

let mapStateToProps = (state) => {
    return {
        friends: getFriends(state),
        pageSize: getPageSize(state),
        totalFriendsCount: getTotalFriendsCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        searchFriendsName: getSearchFriendsName(state)
    }
}

let mapDispatchToProps = {
    unfollow, setFriendsCount, setCurrentPage,
    toggleFollowingProgress, requestFriends, clearFriends,
    setSearchFriendsName
}





export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer)