import { Action } from 'interfaces';

export const GLOBAL_I18N = 'GLOBAL_I18N';

export const I18n = (state = false, action: Action<null>) => {
    switch (action.type) {
        case GLOBAL_I18N:
            return true;
        default:
            return state;
    }
};
