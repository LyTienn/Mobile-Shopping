import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { handleLogin, getUserProfile } from '../../services/UserServices';
import { 
    loginUser, 
    loginUserSuccess, 
    loginUserFailed,
    fetchUserProfile,
    fetchUserProfileSuccess,
    fetchUserProfileFailed 
} from './UserSlice';

export const loginEpic = (action$) => action$.pipe(
    ofType(loginUser.type),
    switchMap(action => 
        from(handleLogin(action.payload.username, action.payload.password)).pipe(
            map(res => loginUserSuccess({ token: res.accessToken, user: res })),
            catchError(err => of(loginUserFailed(err.response?.data?.message || "Lỗi đăng nhập")))
        )
    )
);

export const fetchUserProfileEpic = (action$, state$) =>
  action$.pipe(
    ofType(fetchUserProfile.type),
    switchMap(() => {
      const token = state$.value.user.token;
      if (!token) {
        // Nếu chưa có token, trả về lỗi luôn
        return of(fetchUserProfileFailed("Không có token đăng nhập"));
      }
      return from(getUserProfile(token)).pipe(
        map((res) => fetchUserProfileSuccess(res)),
        catchError((err) =>
          of(fetchUserProfileFailed(err.response?.data?.message || "Không thể tải thông tin người dùng"))
        )
      );
    })
  );

