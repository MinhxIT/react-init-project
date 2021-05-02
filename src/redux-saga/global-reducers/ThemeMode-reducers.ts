import { THEME } from 'global';
import { Action } from 'interfaces';

export const GLOBAL_THEME_MODE = 'GLOBAL_THEME_MODE';

export const ThemeMode = (state: THEME = THEME.LIGHT, action: Action<THEME>) => {
    switch (action.type) {
        case GLOBAL_THEME_MODE:
            return action.payload ? action.payload : state;
        default:
            return state;
    }
};
