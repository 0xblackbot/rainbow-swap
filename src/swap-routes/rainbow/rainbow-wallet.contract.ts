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
    'te6ccgECEAEAAvsAART/APSkE/S88sgLAQIBYgIDAgLOBAUCAVgODwIBIAYHABlPhCyPhBzxb0AMntVIAu07aLt+zIhxwCRW+DwAQHTH9M/IoIQ1TJ227qOHzBsEgHIyx/LP8lxgBjIywX4Qc8WcPoCy2rMyYBA+wDgIoQfuo4fMGwSAcjLH8s/yXGAGMjLBfhBzxZw+gLLaszJgED7AOAD0NMDMfpAMPhBIccF4w+BImDy8IAgJAB07UTQ+kAB+GH0BAH4YtGAB/jAhgggGktC6jjkxAfpA1PpA1DCBAUvIUAPPFhXLP8nQBND4QkUDBfQS+GLwAnGAGMjLBVjPFnD6AstqzMmAQPsA2zHgIYIIBpLRuo4rMQH6ADCCENUydtvIyx8Syz/JcYAYyMsF+EHPFlAD+gISy2rMyYBA+wDbMeABgggGktIKAsgighBzYtCcuo7MMgL6APpA+EEixwWOPWwx9AQw0PpA1PpA1DCBAUvIUAPPFhXLP8nQBND4QkUDBfQS+GLwAnGAGMjLBVjPFnD6AstqzMmAQPsA2zHgMOAwMiCCEEdPhs+64wJbCwwAjLqOQQH6QPoAMG1tghAPin6lyMsfFcs/WPoC+EHPFvhBzxYT9ABw+gIS9ADJcYAYyMsFUAPPFnD6AhLLaszJgED7ANsx4FsBroEBS8hYzxZSQMs/ydD4QlRhMfQKb6GOO18DbW2CEA+KfqXIyx8Vyz9Y+gL4Qc8W+EHPFhP0AHD6AhL0AMlxgBjIywVQA88WcPoCEstqzMmAQPsA4w3bMQ0APgEByMsfyz/JcYAYyMsF+EHPFnD6AstqzMmAQPsA2zEA1jQD+kBAUwLTANQw0CHAAI4UMYIQD4p+pcjLHxLLP1j6AgHPFsmOIgHAAY4TghDqBhhdyMsfEss/WPoCAc8WyeBfA4EiYfLwyMnicYAYyMsFUAXPFnD6AhTLahPMyYBA+wD4Qlj0WTD4YvACABG6Xk8AH4QfhCgAL7tBPwAYEBS8hQA88Wyz/J0PhCWPQKb6GA==';

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
