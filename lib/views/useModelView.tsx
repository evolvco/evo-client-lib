import { useEffect, useState } from 'react';
import { resolve } from './services';
import { ViewProps } from '../types';

export const useModelView = ({ view, params }: ViewProps) => {
    const [_view, setView] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(false);
        resolve({ view, params }).then((response) => {
            //console.log('----response', response);
            setView(response);
            setLoading(false);
        }).catch((error) => {
            console.error('----error', error);
            setLoading(false);
        });
    }, []);

    return [_view, loading];
};