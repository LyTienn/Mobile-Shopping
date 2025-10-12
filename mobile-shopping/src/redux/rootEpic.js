import { combineEpics } from "redux-observable";
import { loginEpic, fetchUserProfileEpic } from './user/UserEpic';

const rootEpic = combineEpics(
    loginEpic,
    fetchUserProfileEpic,
);

export default rootEpic;