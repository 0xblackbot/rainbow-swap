import {compileFunc} from '@ton-community/func-js';
import fs from 'fs';

const buildContract = async (contractLocation: string) => {
    const result = await compileFunc({
        targets: [contractLocation],
        sources: path => fs.readFileSync(path).toString()
    });

    if (result.status === 'error') {
        throw result.message;
    }

    console.log('Contract code BOC:\n');
    console.log(result.codeBoc);
};

buildContract('contracts/rainbow-wallet/contract.fc');
