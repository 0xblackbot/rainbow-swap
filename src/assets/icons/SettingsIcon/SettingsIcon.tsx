import {FC} from 'react';

interface Props {
    width?: string;
    height?: string;
    className?: string;
    onClick?: () => void;
}

export const SettingsIcon: FC<Props> = ({
    width = '16px',
    height = '16px',
    className = '',
    onClick
}): JSX.Element => (
    <svg
        data-v-7403b8bc=""
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        style={{width, height}}
        className={className}
        onClick={onClick}
    >
        <path
            fill="currentColor"
            d="M10.972 22.982h2.056c.836 0 1.49-.52 1.683-1.32l.412-1.793.27-.093 1.563.958c.706.44 1.533.33 2.127-.267l1.424-1.412c.597-.604.704-1.436.263-2.13l-.975-1.551.1-.251 1.788-.424A1.694 1.694 0 0 0 23 13.015v-1.998c0-.827-.516-1.49-1.317-1.684L19.911 8.9l-.108-.267.975-1.552c.443-.694.334-1.517-.263-2.13l-1.424-1.42c-.585-.589-1.412-.703-2.118-.267l-1.563.958-.287-.11-.412-1.792C14.519 1.518 13.865 1 13.029 1h-2.056c-.836 0-1.49.522-1.684 1.32l-.42 1.793-.286.11-1.555-.959c-.706-.432-1.541-.322-2.127.267l-1.415 1.42c-.597.613-.714 1.436-.263 2.13l.966 1.552-.1.267-1.771.433C1.513 9.529 1 10.19 1 11.017v1.998c0 .828.525 1.489 1.317 1.684l1.788.424.092.25-.967 1.552c-.45.694-.334 1.526.263 2.13l1.416 1.412c.593.598 1.429.708 2.134.267l1.556-.958.27.093.42 1.792c.193.8.847 1.32 1.683 1.32m.252-1.836c-.17 0-.258-.073-.287-.23l-.6-2.495a5.6 5.6 0 0 1-1.748-.718L6.396 19.05c-.12.089-.248.07-.366-.047l-1.08-1.079c-.112-.111-.117-.231-.04-.366l1.353-2.177a6.7 6.7 0 0 1-.704-1.733l-2.496-.59c-.157-.03-.23-.117-.23-.287v-1.519c0-.178.065-.256.23-.286l2.487-.599c.159-.673.457-1.303.696-1.742L4.902 6.448c-.085-.143-.082-.262.03-.382l1.09-1.062c.118-.118.229-.135.374-.047L8.57 6.278c.46-.274 1.128-.549 1.772-.72l.594-2.493c.029-.157.116-.23.287-.23h1.552c.17 0 .256.073.278.23l.611 2.51c.657.16 1.246.427 1.748.712L17.59 4.96c.154-.087.256-.072.384.047l1.08 1.062c.12.12.116.24.03.383l-1.34 2.173c.246.437.538 1.07.694 1.739l2.498.602c.157.03.23.108.23.286v1.519c0 .17-.084.258-.23.286l-2.506.594a6.5 6.5 0 0 1-.702 1.73l1.346 2.174c.08.134.083.254-.037.365L17.967 19c-.13.12-.247.135-.375.047l-2.185-1.343c-.5.314-1.08.566-1.741.718l-.61 2.496c-.023.156-.108.23-.279.23zm.775-5.304c2.108 0 3.841-1.733 3.841-3.851 0-2.1-1.733-3.831-3.84-3.831-2.109 0-3.852 1.731-3.852 3.83a3.87 3.87 0 0 0 3.851 3.852m0-1.738a2.115 2.115 0 0 1-2.103-2.113c0-1.146.95-2.093 2.103-2.093 1.136 0 2.083.95 2.083 2.093 0 1.156-.947 2.113-2.083 2.113"
        ></path>
    </svg>
);