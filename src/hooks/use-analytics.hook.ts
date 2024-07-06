import {useTWAEvent} from '@tonsolutions/telemetree-react';
import {useEffect} from 'react';
import ReactGA from 'react-ga4';

import {isProd} from '../globals';

export const useAnalytics = () => {
    const eventBuilder = useTWAEvent();

    const useTrackPageView = (name: string, isOpen = true) =>
        useEffect(() => {
            const filteredName = name.toLowerCase().replace(/\s+/g, '-');
            if (isProd && isOpen) {
                ReactGA.send({
                    hitType: 'pageview',
                    page: '/' + filteredName,
                    title: name
                });
                eventBuilder.track(`Pageview ${name}`, {
                    label: name
                });
            }
        }, [name, isOpen]);

    const trackButtonClick = (name: string, data?: Record<string, string>) => {
        if (isProd) {
            console.log(`Clicked ${name}`);
            eventBuilder.track(`${name} Clicked`, {
                label: name,
                ...data
            });
            const eventParams = {
                category: 'General',
                label: name,
                ...data
            };

            ReactGA.event(`Clicked ${name}`, eventParams);
        }
    };

    return {useTrackPageView, trackButtonClick};
};
