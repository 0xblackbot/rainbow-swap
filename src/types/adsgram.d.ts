import type {DetailedHTMLProps, HTMLAttributes} from 'react';

type AdsGramTaskAttributes = DetailedHTMLProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement
> & {
    'data-block-id': `task-${number}`;
};

declare module 'react/jsx-runtime' {
    namespace JSX {
        interface IntrinsicElements {
            'adsgram-task': AdsGramTaskAttributes;
        }
    }
}
