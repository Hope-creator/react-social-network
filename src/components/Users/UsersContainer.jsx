import React from 'react';
import Users from './Users';
import { connect } from 'react-redux';
import { follow, setCurrentPage, setUsersCount, unfollow, toggleFollowingProgress, requestUsers, clearUsers, setSearchUsersName } from '../../redux/users-reducer';
import Preloader from '../common/preloader/Preloader';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers, getSearchUsersName } from '../../redux/users-selectors';

class UsersContainer extends React.Component {



    componentDidMount() {
        this.props.users.length == 0 &&
            this.props.requestUsers(this.props.currentPage, this.props.pageSize);

        this.getUsersOnScroll()
    }

    componentDidUpdate(prevState) {
        if (this.props.searchUsersName != prevState.searchUsersName) {
            this.props.clearUsers();
            this.props.requestUsers(1, this.props.pageSize, this.props.searchUsersName);
            window.onscroll = null;
            this.getUsersOnScroll();
        }
    }

    componentWillUnmount() {
        this.props.clearUsers();
        window.onscroll = null;
        this.props.setSearchUsersName('');
    }

    getUsersOnScroll = () => {

        let check = setInterval(
            () => {
                {
                    if (Math.ceil(this.props.currentPage * this.props.pageSize) > this.props.totalUsersCount) {
                        console.log("max users")
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
            console.log(currentScrollPos)
            console.log(maxScroll)
            if (currentScrollPos + 15 >= maxScroll) this.onPageChange(this.props.currentPage + 1);
            if (Math.ceil(this.props.currentPage * this.props.pageSize) > this.props.totalUsersCount) {
                window.onscroll = null;
            }
        }
    }



    onPageChange = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.requestUsers(pageNumber, this.props.pageSize, this.props.searchUsersName)
    }


    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                users={this.props.users}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                currentPage={this.props.currentPage}
                onPageChange={this.onPageChange}
                followingInProgress={this.props.followingInProgress}
                toggleFollowingProgress={this.props.toggleFollowingProgress}
                setSearchUsersName={this.props.setSearchUsersName}
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
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        searchUsersName: getSearchUsersName(state)
    }
}

let mapDispatchToProps = {
    follow, unfollow,
    setUsersCount, setCurrentPage,
    toggleFollowingProgress, requestUsers, clearUsers, setSearchUsersName
}

const UsersConainer = connect(mapStateToProps, mapDispatchToProps)(UsersContainer)



export default UsersConainer;