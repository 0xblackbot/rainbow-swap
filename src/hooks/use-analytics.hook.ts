import {useEffect} from 'react';
import ReactGA from 'react-ga4';

export const useTrackPageView = (name: string, isOpen = true) =>
    useEffect(() => {
        if (isOpen) {
            ReactGA.send({
                hitType: 'pageview',
                page: '/' + name.toLowerCase().replace(/\s+/g, '-'),
                title: name
            });
        }
    }, [name, isOpen]);

export const trackButtonClick = (name: string) =>
    ReactGA.event({
        category: 'General',
        action: 'Clicked ' + name,
        label: name
    });
