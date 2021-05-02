import { Action } from 'interfaces';
import { LANG } from 'global';

export const GLOBAL_LANG = 'GLOBAL_LANG';

export const Lang = (state: LANG = LANG.EN, action: Action<LANG>) => {
    switch (action.type) {
        case GLOBAL_LANG:
            return action.payload ? action.payload : state;
        default:
            return state;
    }
};
