import axios from 'axios';
import {useContext} from 'react';

import {InputOutputContext} from '../../context/input-output.context';

export const useAssetsHook = () => {
    const {setAssets} = useContext(InputOutputContext);
    const getAssets = async () => {
        const response = await axios.get('http://localhost:3000/api/assets');
        const data = response.data;
        setAssets(data);
    };

    return {getAssets};
};
