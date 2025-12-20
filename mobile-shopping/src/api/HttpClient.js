//Sử dụng cấu hình chung để gọi API HTTP sử dụng Ajax của RxJS

import { ajax } from 'rxjs/ajax';
import { map, catchError, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HTTP_CONFIG } from './httpConfig';

class HttpClient {
    constructor() {
        this.BASE_URL = HTTP_CONFIG.BASE_URL;
        this.defaultHeaders = HTTP_CONFIG.HEADERS;
        this.timeout = HTTP_CONFIG.TIMEOUT;
    }

    _getToken() {
        try {
            const rootStorage = localStorage.getItem("persist:root");
            if(!rootStorage) return null;

            const rootParsed = JSON.parse(rootStorage);

            if(rootParsed.user) {
                const userParsed = JSON.parse(rootParsed.user);
                return userParsed.token || null;
            }
            return null;
        } catch (error) {
            console.error("Lỗi lấy token từ localStorage:", error);
            return null;
        }
    }

    _getHeaders(customHeaders = {}) {
        const token = this._getToken();
        return {
        ...this.defaultHeaders,
        ...(token && { 'Authorization': `Bearer ${token}` }), 
        ...customHeaders,
        };
    }

    /**
     * PRIVATE METHOD: Xử lý dữ liệu trả về từ AJAX
     */
    _handleResponse(ajaxResponse) {
        return ajaxResponse.response;
    }

    _handleError(error) {
        console.error("HTTP Error:", error);
        return throwError(() => error);
    }

    /**
     * CORE REQUEST METHOD
     */
    _request(config) {
        const fullUrl = `${this.BASE_URL}${config.url}`;
        return ajax({
            url: fullUrl,
            method: config.method || 'GET',
            headers: this._getHeaders(config.headers),
            body: config.body,
            crossDomain: true,
        }).pipe(
            timeout(this.timeout),
            map(this._handleResponse), // Lọc dữ liệu trả về
            catchError(this._handleError) // Bắt lỗi
        );
    }

    // PUBLIC METHODS (Service sẽ sử dụng các phương thức này)
    /**
     * GET request
     * @param {string} url - Endpoint URL
     * @param {object} params - Query params (Ví dụ: { search: 'phone', limit: 10 }) 
     */
    get(url, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const finalUrl = queryString ? `${url}?${queryString}` : url;
        return this._request({
            url: finalUrl,
            method: 'GET',
        })
    }

    /**
     * POST request
     * @param {string} url - Endpoint URL
     * @param {object} body
     */
    post(url, body = {}) {
        return this._request({
            url,
            method: 'POST',
            body,
        });
    }

    /**
     * PUT request
     */
    put(url, body = {}) {
        return this._request({
            url,
            method: 'PUT',
            body,
        });
    }

    /**
     * DELETE request
     */
    delete(url) {
        return this._request({
            url,
            method: 'DELETE',
        });
    }
}

export default new HttpClient();