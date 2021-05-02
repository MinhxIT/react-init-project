import { METHOD } from 'global';
import { Obj } from 'interfaces';

const handleRESTError = async (response: Response) => {
    if (response.status !== 200) {
        throw {
            code: response.status,
            message: response.statusText,
        };
    }
    return response;
};

const parseJSONFromREST = async (response: Response) => {
    return await response.json();
};

const replacePlaceholder = (s: string, data: Obj) => {
    const parts = s.split(/{(.*?)}/g).map((v) => {
        const replaced = v.replace(/{/g, '');
        if (data instanceof FormData) {
            return data.get(replaced) || replaced;
        }
        return data[replaced] || replaced;
    });

    return parts.join('');
};

export const query = async (uri: string, method: METHOD, params: Record<string, unknown> = {}, extraHeader?: Record<string, unknown>) => {
    let parsedUri = `${uri}${method === METHOD.GET ? `?${new URLSearchParams(params as Record<string, string>)}` : ''
        }`;

    parsedUri = replacePlaceholder(parsedUri, params as Obj);

    return fetch(parsedUri, {
        method,
        headers: {
            ...(!(params instanceof FormData) && { 'Content-Type': 'application/json; charset=UTF-8' }),
            ...extraHeader,
        },
        ...(method !== METHOD.GET && { body: !(params instanceof FormData) ? JSON.stringify(params) : params }),
    })
        .then(handleRESTError)
        .then(parseJSONFromREST);
}