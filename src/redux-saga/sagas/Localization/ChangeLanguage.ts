import { takeLatest, put } from 'redux-saga/effects';
import { LOCALIZATION_CHANGE_LANGUAGE } from 'redux-saga/actions';
import { GLOBAL_LANG } from 'redux-saga/global-reducers';
import { LANG, Global } from 'global';
import { Request } from 'interfaces';
import { setKey } from 'utils/localStorage';
import { changeLanguage } from 'utils/i18n';

function* doChangeLanguage(request: Request<LANG>) {
    try {
        setKey('lang', request.payload);
        Global.lang = request.payload!;
        yield changeLanguage(request.payload!);

        yield put({
            type: GLOBAL_LANG,
            payload: Global.lang,
        });
    } catch (err) {
        return;
    }
}

export default function* watchChangeLanguage() {
    yield takeLatest(LOCALIZATION_CHANGE_LANGUAGE, doChangeLanguage);
}
