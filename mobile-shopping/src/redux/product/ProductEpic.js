import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { fetchAllProduct, fetchDetailProduct } from '../../services/ProductServices';
import {
    fetchAllProductStart,
    fetchAllProductSuccess,
    fetchAllProductFailed,
    fetchDetailProductStart,
    fetchDetailProductSuccess,
    fetchDetailProductFailed,
} from './ProductSlice';

export const fetchAllProductEpic = (action$) => action$.pipe(
    ofType(fetchAllProductStart.type),
    switchMap(() => 
        from(fetchAllProduct()).pipe(
            map(res => fetchAllProductSuccess(res.data.products)),
            catchError(err => of(fetchAllProductFailed(err.response?.data || "Lỗi fetchAll")))
        )
    )
);

export const fetchDetailProductEpic = (action$) => action$.pipe(
    ofType(fetchDetailProductStart.type),
    switchMap(action =>
        from(fetchDetailProduct(action.payload)).pipe(
            map(res => fetchDetailProductSuccess(res)),
            catchError(err => of(fetchDetailProductFailed(err.response?.data || "Lỗi fetchDetail")))
        )
    )
);
