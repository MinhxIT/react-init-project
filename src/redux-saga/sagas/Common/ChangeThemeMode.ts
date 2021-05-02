import { takeLatest, put } from 'redux-saga/effects';
import { THEME } from 'global';
import { Request } from 'interfaces';
import { COMMON_CHANGE_THEME_MODE } from 'redux-saga/actions';
import { GLOBAL_THEME_MODE } from 'redux-saga/global-reducers';

function* doChangeThemeMode(request: Request<THEME>) {
    try {
        yield put({
            type: GLOBAL_THEME_MODE,
            payload: request.payload,
        });
    } catch (err) {
        return;
    }
}

export default function* watchChangeThemeMode() {
    yield takeLatest(COMMON_CHANGE_THEME_MODE, doChangeThemeMode);
}
