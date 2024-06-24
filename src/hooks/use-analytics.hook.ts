import {useEffect} from 'react';
import ReactGA from 'react-ga4';

import {isProd} from '../globals';

export const useTrackPageView = (name: string, isOpen = true) =>
    useEffect(() => {
        if (isProd && isOpen) {
            ReactGA.send({
                hitType: 'pageview',
                page: '/' + name.toLowerCase().replace(/\s+/g, '-'),
                title: name
            });
        }
    }, [name, isOpen]);

export const trackButtonClick = (
    name: string,
    data?: Record<string, string>
) => {
    if (isProd) {
        const eventParams = {
            category: 'General',
            label: name,
            ...data
        };

        ReactGA.event(`Clicked ${name}`, eventParams);
    }
};
