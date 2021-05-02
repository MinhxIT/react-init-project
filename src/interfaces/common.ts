import { i18n } from 'i18next';
import { AnyAction } from 'redux';
import { LANG } from '../global';

export interface Request<T> extends AnyAction {
    response?: ResponseType;
    payload?: T;
}

interface ResponseType {
    success?: {
        type: string;
        forwarder?: Request<Obj>;
    };
    failure?: {
        type: string;
    };
}


export interface Action<T> {
    type: string;
    payload: T;
    loading?: boolean;
    componentId?: string;
}

export interface Obj {
    // eslint-disable-next-line
    [key: string]: {} | undefined;
}

export interface Response<T> {
    data: T;
    status?: {
        code?: string;
    };
}

export interface Config {
    i18n: {
        data: Array<{
            namespaces: string[];
            lang: LANG;
            latestVersion: string;
        }>;
        namespaces: string[];
        publicPath?: string;
    };
    fetchCount: number;
    oneSignal?: {
        appId: string;
    }
}

export interface GlobalInterface {
    lang?: LANG;
    config?: Config;
    i18n?: i18n;
    isMobile?: boolean;
}

export interface LoaderState {
    loading: boolean;
    componentId?: string;
}