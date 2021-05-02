import { call, put, takeLatest, takeEvery, throttle, debounce, fork, take } from 'redux-saga/effects';
import { Request, Obj } from 'interfaces';
import { METHOD } from 'global';
import { query as queryRest } from './restApi';

const query = (
    uri: string,
    method: METHOD,
    params?: Obj,
    usingRest?: boolean,
    extraHeader?: Record<string, unknown>,
) => {
    if (usingRest) {
        return queryRest(uri, method, params, extraHeader);
    }
};

function* doQuery(
    uri: string,
    method: METHOD,
    usingRest: boolean,
    extraHeader: Record<string, unknown>,
    request: Request<Obj>,
) {
    try {
        const response: Obj = yield call(query, uri, method, request.payload, usingRest, extraHeader);

        if (request.response && request.response.success) {
            yield put({
                type: request.response.success.type,
                payload: {
                    response: !usingRest ? response.data : response,
                    request: request.payload,
                    componentId: request.componentId,
                },
            });

            if (request.response.success.forwarder) {
                yield put({
                    type: request.response.success.forwarder.type,
                    payload: request.response.success.forwarder.payload
                        ? request.response.success.forwarder.payload
                        : !usingRest ? response.data : response,
                });
            }
        }
    } catch (error) {
        if (request.response && request.response.failure) {
            yield put({
                type: request.response.failure.type,
                payload: {
                    request: request.payload,
                    componentId: request.componentId,
                    error
                },
            });
        }
    }
}

export function* watchQuery(
    pattern: string,
    uri: string,
    method: METHOD,
    usingRest?: boolean,
    extraHeader?: Record<string, unknown>,
    mode?: 'latest' | 'every' | 'throttle' | 'debounce',
    ms?: number,
): Generator {
    if (mode == null) {
        if (method !== METHOD.GET) {
            mode = 'latest';
        } else {
            mode = 'every';
        }
    }

    switch (mode) {
        case 'latest':
            yield takeLatest(
                pattern,
                doQuery,
                uri,
                method,
                usingRest!,
                extraHeader!
            );
            break;
        case 'every':
            yield takeEvery(
                pattern,
                doQuery,
                uri,
                method,
                usingRest!,
                extraHeader!
            );
            break;
        case 'throttle':
            yield throttle(
                ms!,
                pattern,
                doQuery,
                uri,
                method,
                usingRest!,
                extraHeader!
            );
            break;
        case 'debounce':
            yield debounce(
                ms!,
                pattern,
                doQuery,
                uri,
                method,
                usingRest!,
                extraHeader!
            );
            break;
        default:
            break;
    }
}