import {
    Address,
    beginCell,
    Cell,
    Contract,
    contractAddress,
    Dictionary
} from '@ton/core';

import {bocToCell} from '../../utils/boc.utils';

const CODE_BOC =
    'te6ccgECDgEAApAAART/APSkE/S88sgLAQIBYgIDAgLOBAUCAVgMDQIBIAYHABlPhCyPhBzxb0AMntVIAvE7aLt+zIhxwCRW+DwAQHTH9M/IoIQ1TJ227qOHzBsEgHIyx/LP8lxgBjIywX4Qc8WcPoCy2rMyYBA+wDgIoQfuo4fMGwSAcjLH8s/yXGAGMjLBfhBzxZw+gLLaszJgED7AOAD0NMDMfpAMPhBAccF4w+CCAxXYPLwgCAkAHTtRND6QAH4YfQEAfhi0YAH+IYIIBpLQuo45MQH6QNT6QNQwgQFLyFADzxYVyz/J0ATQ+EJFAwX0Evhi8AJxgBjIywVYzxZw+gLLaszJgED7ANsx4CGCCAaS0bqOKzEB+gAwghDVMnbbyMsfEss/yXGAGMjLBfhBzxZQA/oCEstqzMmAQPsA2zHgAYIIBpLSugoB6AGCEHNi0Jy6jugB+gD6QPhBIscFjj1sIfQEMND6QNT6QNQwgQFLyFADzxYVyz/J0ATQ+EJFAwX0Evhi8AJxgBjIywVYzxZw+gLLaszJgED7ANsx4DCBAUvIWM8WUjDLP8nQ+EJUYTH0Cm+hkl8F4w3bMeBbCwCKjkEB+kD6ADBtbYIQD4p+pcjLHxXLP1j6AvhBzxb4Qc8WE/QAcPoCEvQAyXGAGMjLBVADzxZw+gISy2rMyYBA+wDbMeBbANb6QEBUAtMA1DDQIcAAjhQxghAPin6lyMsfEss/WPoCAc8WyY4kAcABjhOCEOoGGF3Iyx8Syz9Y+gIBzxbJ4F8DgggMV2Hy8MjJ4nGAGMjLBVAFzxZw+gIUy2oTzMmAQPsA+EJY9Fkw+GLwAgARul5PAB+EH4QoAC+7QT8AGBAUvIUAPPFss/ydD4Qlj0Cm+hg=';

export enum RainbowWalletOperation {
    MAKE_A_SWAP = 430800,
    WITHDRAW_TON = 430801,
    WITHDRAW_JETTON = 430802
}

interface Storage {
    ownerAddress: Address;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    effectsDict: Dictionary<any, any>;
}

const storageToCell = (storage: Storage) =>
    beginCell()
        .storeAddress(storage.ownerAddress)
        .storeDict(storage.effectsDict)
        .endCell();

export class RainbowWalletContract implements Contract {
    constructor(
        readonly address: Address,
        readonly init?: {code: Cell; data: Cell}
    ) {}

    static create = (args: {workchain: number; ownerAddress: Address}) => {
        const code = bocToCell(CODE_BOC);
        const data = storageToCell({
            ownerAddress: args.ownerAddress,
            effectsDict: Dictionary.empty()
        });

        const init = {code, data};

        return new RainbowWalletContract(
            contractAddress(args.workchain, init),
            init
        );
    };
}
