import Lottie from 'lottie-react';
import {FC} from 'react';

import duckAirdropAnimation from './duck-airdrop.json';

interface Props {
    className?: string;
}

const DuckAirdrop: FC<Props> = ({className}) => (
    <Lottie
        loop={true}
        className={className}
        animationData={duckAirdropAnimation}
    />
);

export default DuckAirdrop;
