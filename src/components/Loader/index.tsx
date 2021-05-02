import React, { memo, useEffect, useState } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { useSelector } from 'react-redux';
import { LoaderState } from 'interfaces';
import { State } from 'redux-saga/reducers';

interface LoaderProps {
    componentId?: string;
    className?: string;
}

const Loader: React.FC<LoaderProps> = ({ className, componentId, children }) => {
    const loader = useSelector((state: State) => state.loader as LoaderState, (left: LoaderState) => {
        if (left.componentId === componentId) {
            return false;
        }
        return true;
    });

    const [active, setActive] = useState(false);

    useEffect(() => {
        if (loader.componentId === componentId) {
            setActive(loader.loading);
        }
    }, [loader]);

    return (
        <LoadingOverlay
            className={className}
            spinner
            active={active}
        >
            {children}
        </LoadingOverlay>
    )
}

export default memo<React.FC<LoaderProps>>(Loader);