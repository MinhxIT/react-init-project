import { combineReducers } from 'redux';
import { I18n, Lang, LoaderReducer, ThemeMode } from './global-reducers';

export const state = combineReducers({
    //Global
    lang: Lang,
    i18n: I18n,
    themeMode: ThemeMode,
    loader: LoaderReducer,
});

export type State = ReturnType<typeof state>;