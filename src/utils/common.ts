import { DEVICE_TYPE } from "../global";

export const handleError = (error: Error) => {
    console.log(error);
};

export const parseJSON = (response: Response) => {
    return response.json();
};

export const isBlank = (str?: string) => {
    return str == null || /^\s*$/.test(str);
};

export const formatNumber = (
    value?: number,
    digit?: number,
    offsetRate?: number,
    toFixed?: boolean,
    failoverValue = '0'
) => {
    if (value == null || isNaN(value)) {
        return failoverValue;
    }

    if (offsetRate != null) {
        value = value / offsetRate;
    }

    let tempValueString = value.toString();
    let prefix = '';

    if (tempValueString[0] === '-') {
        prefix = '-';
        tempValueString = tempValueString.substring(1, tempValueString.length);
    }

    try {
        const tempValue = Number(tempValueString);
        let fractionDigit = 0;
        if (digit != null) {
            fractionDigit = digit;
        }
        if (fractionDigit > 0) {
            const temp = +`${Math.round(Number(`${Number(tempValue.toString())}e+${fractionDigit}`))}e-${fractionDigit}`;
            let fractionString = '';
            let i = '';
            if (toFixed === true) {
                i = temp.toFixed(fractionDigit);
                fractionString = i.substring(i.indexOf('.'), i.length);
                i = i.substring(0, i.indexOf('.'));
            } else {
                i = temp.toString();
                if (temp.toString().indexOf('.') > 1) {
                    fractionString = temp.toString().substring(temp.toString().indexOf('.'), temp.toString().length);
                    i = temp.toString().substring(0, temp.toString().indexOf('.'));
                }
            }
            return prefix + i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + fractionString;
        } else {
            const temp = +`${Math.round(Number(`${Number(tempValue.toString())}e+${fractionDigit}`))}e-${fractionDigit}`;
            const i = temp.toString();
            return prefix + i.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    } catch {
        return '';
    }
};

export const uuid = (a?: number): string => {
    if (a != null) {
        return (a ^ ((Math.random() * 16) >> (a / 4))).toString(16);
    } else {
        // eslint-disable-next-line
        //@ts-ignore
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
    }
};

export const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return DEVICE_TYPE.TABLET;
    }
    if (
        /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)
    ) {
        return DEVICE_TYPE.MOBILE;
    }
    return DEVICE_TYPE.DESKTOP;
};
