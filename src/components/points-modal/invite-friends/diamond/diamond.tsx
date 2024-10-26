import Lottie from 'lottie-react';
import {FC} from 'react';

import diamondAnimation from './diamond.json';

interface Props {
    className?: string;
}

const Diamond: FC<Props> = ({className}) => (
    <Lottie
        loop={true}
        className={className}
        animationData={diamondAnimation}
    />
);

export default Diamond;
