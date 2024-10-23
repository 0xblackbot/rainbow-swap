import Lottie from 'lottie-react';
import {FC} from 'react';

import duckMoneyAnimation from './duck-money.json';

interface Props {
    className?: string;
}

const DuckMoney: FC<Props> = ({className}) => (
    <Lottie
        loop={true}
        className={className}
        animationData={duckMoneyAnimation}
    />
);

export default DuckMoney;
