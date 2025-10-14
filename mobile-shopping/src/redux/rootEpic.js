import { combineEpics } from "redux-observable";
import { loginEpic, fetchUserProfileEpic } from './user/UserEpic';
import { fetchAllProductEpic, fetchDetailProductEpic } from './product/ProductEpic';

const rootEpic = combineEpics(
    loginEpic,
    fetchUserProfileEpic,
    fetchAllProductEpic,
    fetchDetailProductEpic,
);

export default rootEpic;