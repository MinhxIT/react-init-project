import * as dateFns from 'date-fns';

export const formatDateToString = (date: Date | null | undefined, formatOutput = 'yyyyMMdd') => {
    if (date == null) {
        return null;
    }
    return dateFns.format(date, formatOutput);
};

export const formatTimeToDisplay = (
    stringInput?: string,
    formatOutput = 'HH:mm:ss',
    formatInput = 'yyyyMMddHHmmss',
    ignoreTimeZone?: boolean
) => {
    try {
        if (!stringInput) {
            return '';
        }
        let time = dateFns.parse(stringInput, formatInput, new Date());
        if (ignoreTimeZone !== true) {
            time = dateFns.addHours(time, 7);
        }
        return dateFns.format(time, formatOutput);
    } catch (error) {
        return null;
    }
};

export const formatDateToDisplay = (stringInput?: string, formatOutput = 'dd/MM/yyyy', formatInput = 'yyyyMMdd') => {
    try {
        if (!stringInput) {
            return null;
        }
        let time = dateFns.parse(stringInput, formatInput, new Date());
        time = dateFns.addHours(time, 7);
        return dateFns.format(time, formatOutput);
    } catch (error) {
        return null;
    }
};

export const formatStringToDate = (stringInput: string | undefined, formatInput = 'yyyyMMdd') => {
    if (stringInput == null) {
        return new Date();
    }

    return dateFns.parse(stringInput, formatInput, new Date());
};

export const isDateValid = (date: Date) => {
    return dateFns.isValid(date);
};

export const formatTimeToUTC = (a: Date, offsetTimeZone = 0) => {
    const year = a.getFullYear();
    const month = a.getMonth();
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    return Date.UTC(year, month, date, hour + offsetTimeZone, min, sec);
};

export const getUTCTime = (a: Date) => {
    const year = a.getFullYear();
    const month = a.getMonth();
    const date = a.getDate();

    return Date.UTC(year, month, date, 0, 0, 0);
};