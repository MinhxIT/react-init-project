import { all } from 'redux-saga/effects';
import { changeThemeMode } from './sagas/Common';
import { changeLanguage, initI18n } from './sagas/Localization';

const sagas = function* () {
    yield all([
        //Localization
        initI18n(),
        changeLanguage(),

        //Common
        changeThemeMode(),
    ]);
}

export default sagas;