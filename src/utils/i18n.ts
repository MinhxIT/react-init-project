import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-chained-backend';
import LocalStorageBackend from 'i18next-localstorage-backend'; // primary use cache
import XHR from 'i18next-xhr-backend'; // fallback xhr load
import { Obj } from 'interfaces';
import { LANG, Global } from 'global';

const EXPIRATION_TIME = 1; //365 * 24 * 60 * 60 * 1000, //365 days

export const createI18nInstance = (
    data: {
        namespaces: string[];
        lang: LANG;
        latestVersion: string;
    }[],
    namespaces: string[],
    publicPath?: string
): Promise<boolean> => {
    return new Promise((resolve: (value: boolean | PromiseLike<boolean>) => void) => {
        Global.i18n = i18next.createInstance();
        const versions: Obj = {};
        const defaultResources: Obj = {};

        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            versions[element.lang as LANG] = element.latestVersion;
        }

        const langs = [LANG.EN, LANG.KO, LANG.VI, LANG.ZH];

        for (let i = 0; i < langs.length; i++) {
            if (versions[langs[i]] == null) {
                versions[langs[i]] = '1.0';
            }
        }

        for (let i = 0; i < data.length; i++) {
            if (data[i].lang === Global.lang) {
                if (data[i].namespaces) {
                    for (let j = 0; j < data[i].namespaces.length; j++) {
                        const namespace = data[i].namespaces[j];
                        defaultResources[namespace] = `${publicPath ? publicPath : ''}/${data[i].lang}/${namespace}.json`;
                    }
                }
            }
        }

        Global.i18n.use(Backend).use(initReactI18next);

        Global.i18n.init(
            {
                lng: Global.lang,
                fallbackLng: Global.lang,
                interpolation: {
                    escapeValue: false,
                },
                debug: false,
                nsSeparator: false,
                keySeparator: false,

                ns: namespaces,
                defaultNS: namespaces[0],
                fallbackNS: namespaces.slice(1),
                initImmediate: false,

                react: {
                    wait: true,
                    useSuspense: false,
                },

                backend: {
                    backends: [
                        LocalStorageBackend, // primary
                        XHR, // fallback
                    ],
                    backendOptions: [
                        {
                            // prefix for stored languages
                            prefix: 'i18next_res_',

                            // expiration
                            expirationTime: EXPIRATION_TIME,

                            // language versions
                            versions,
                        },
                        {
                            loadPath: (lngs: string[], namespaces: string[]) => {
                                for (let i = 0; i < data.length; i++) {
                                    const element = data[i];
                                    if (element.lang === lngs[0]) {
                                        for (let j = 0; j < element.namespaces.length; j++) {
                                            const namespace = element.namespaces[j];
                                            if (namespace === namespaces[0]) {
                                                return `${publicPath ? publicPath : ''}/${data[i].lang}/${namespace}.json`;
                                            }
                                        }
                                    }
                                }

                                return defaultResources[namespaces[0]];
                            },
                            crossDomain: true,
                        },
                    ],
                },
            },
            () => {
                resolve(true);
            }
        );
    });
};

export const changeLanguage = (lang: LANG) => {
    return Global.i18n && Global.i18n.changeLanguage(lang);
};