import { usersApi } from "../../api/api";
import {
  toggleIsFetching,
  setUsers,
  setUsersCount,
  toggleFollowingProgress,
  followSuccess,
  unfollowSuccess,
} from "./actionCreators";

const requestUsers =
  (currentPage, pageSize, nameFilter) => async (dispatch) => {
    try {
      dispatch(toggleIsFetching(true));
      let response = await usersApi.getUsers(
        currentPage,
        pageSize,
        nameFilter
      );
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(response.data.items));
      dispatch(setUsersCount(response.data.totalCount));
    } catch (e) {
      console.log(e);
    }
  };

const followUnfollowThunk = (id, ownerId, method) => async (dispatch) => {
  dispatch(toggleFollowingProgress(true, id));
  try {
    const response =
      method === "follow"
        ? await usersApi.follow(id, ownerId)
        : await usersApi.unfollow(id, ownerId);
    if (response.data.success && response.data.followed) {
      dispatch(followSuccess(id, ownerId));
    }
    if (response.data.success && response.data.unfollowed) {
      dispatch(unfollowSuccess(id, ownerId));
    }
    dispatch(toggleFollowingProgress(false, id));
  } catch (e) {
    console.log(e);
  }
};

export { requestUsers, followUnfollowThunk };
