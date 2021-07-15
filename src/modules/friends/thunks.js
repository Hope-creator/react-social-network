import { usersApi } from "../../api/api";
import {
  toggleIsFetching,
  setFriends,
  setFriendsCount,
  toggleFollowingProgress,
  unfollowSuccess,
} from "./actionCreators";

const requestFriends =
  (currentPage, pageSize, nameFilter, userId) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    try {
      const response = await usersApi.getUsers(
        currentPage,
        pageSize,
        nameFilter,
        userId
      );
      if (response && response.data.success) {
        dispatch(setFriends(response.data.items));
        dispatch(setFriendsCount(response.data.totalCount));
      }
      dispatch(toggleIsFetching(false));
    } catch (e) {
      console.log(e);
    }
  };

const unfollowThunk = (id) => async (dispatch) => {
  try {
    dispatch(toggleFollowingProgress(true, id));
    let response = await usersApi.unfollow(id);
    if (response.data.success && response.data.unfollowed)
      dispatch(unfollowSuccess(id));
    dispatch(toggleFollowingProgress(false, id));
  } catch (e) {
    console.log(e);
  }
};

export { requestFriends, unfollowThunk };
