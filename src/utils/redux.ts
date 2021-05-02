import { Action, Obj } from 'interfaces';

export const COMMON_TOGGLE_LOADING = 'COMMON_TOGGLE_LOADING';

export const createReducer = (success: string, failure: string, clear?: string) => {
    return (state: {
        success: boolean;
        response?: Obj;
        request?: Obj;
        componentId?: string;
    } | null = null, action: Action<Obj>) => {
        switch (action.type) {
            case success:
                return { ...action.payload, success: true };
            case failure:
                return { ...action.payload, success: false };
            case clear:
                return null;
            default:
                return state;
        }
    };
};