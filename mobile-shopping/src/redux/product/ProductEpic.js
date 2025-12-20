import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
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
    {
        console.log("Epic fetchAllProductEpic is triggered");
        return fetchAllProduct().pipe(
            map(res => {
                console.log("Fetched products:", res);
                return fetchAllProductSuccess(res.products);
            }),
            catchError(err => of(fetchAllProductFailed(err.response?.data || "Lỗi fetchAll")))
        );
    }
        
    )
);

export const fetchDetailProductEpic = (action$) => action$.pipe(
    ofType(fetchDetailProductStart.type),
    switchMap(action =>
        fetchDetailProduct(action.payload).pipe(
            map(product => fetchDetailProductSuccess(product)),
            catchError(err => of(fetchDetailProductFailed(err.response?.data || "Lỗi fetchDetail")))
        )
    )
);