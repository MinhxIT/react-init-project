import { Action, LoaderState } from 'interfaces';

export const LoaderReducer = (state: LoaderState = { loading: false }, action: Action<null>) => {
    if (action.loading != null) {
        return {
            loading: action.loading,
            componentId: action.componentId,
        };
    }
    return state;
};
