import { put, takeLatest } from 'redux-saga/effects';
import { LOCALIZATION_INIT_I18N } from 'redux-saga/actions';
import { GLOBAL_I18N, GLOBAL_LANG } from 'redux-saga/global-reducers';
import { LANG, Global } from 'global';
import { getKey } from 'utils/localStorage';
import { createI18nInstance } from 'utils/i18n';

function* doInitI18n() {
    try {
        const lang = getKey<LANG>('lang');

        if (lang != null) {
            Global.lang = lang;
        }

        if (Global.lang == null) {
            Global.lang = LANG.EN;
        }

        yield createI18nInstance(Global.config!.i18n.data, Global.config!.i18n.namespaces, Global.config!.i18n.publicPath);
        yield put({ type: GLOBAL_I18N });
        yield put({
            type: GLOBAL_LANG,
            payload: Global.lang,
        });
    } catch (err) {
        console.log(err);
    }
}

export default function* watchInitI18n() {
    yield takeLatest(LOCALIZATION_INIT_I18N, doInitI18n);
}
