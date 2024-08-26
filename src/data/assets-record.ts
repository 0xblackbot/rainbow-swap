import {AssetsRecord} from 'rainbow-swap-sdk';

import {TON, USDT} from '../globals';

export const DEFAULT_ASSETS_RECORD: AssetsRecord = {
    [TON]: {
        name: 'Toncoin',
        symbol: 'TON',
        address: TON,
        image: 'https://assets.dedust.io/images/ton.webp',
        decimals: 9,
        verification: 'whitelist',
        exchangeRate: '0'
    },
    [USDT]: {
        name: 'Tether USD',
        symbol: 'USD₮',
        address: USDT,
        image: 'https://cache.tonapi.io/imgproxy/T3PB4s7oprNVaJkwqbGg54nexKE0zzKhcrPv8jcWYzU/rs:fill:200:200:1/g:no/aHR0cHM6Ly90ZXRoZXIudG8vaW1hZ2VzL2xvZ29DaXJjbGUucG5n.webp',
        decimals: 6,
        verification: 'whitelist',
        exchangeRate: '0'
    },
    EQAvlWFDxGF2lXm67y4yzC17wYKD9A0guwPkMs1gOsM__NOT: {
        symbol: 'NOT',
        name: 'Notcoin',
        address: 'EQAvlWFDxGF2lXm67y4yzC17wYKD9A0guwPkMs1gOsM__NOT',
        image: 'https://cache.tonapi.io/imgproxy/4KCMNm34jZLXt0rqeFm4rH-BK4FoK76EVX9r0cCIGDg/rs:fill:200:200:1/g:no/aHR0cHM6Ly9jZG4uam9pbmNvbW11bml0eS54eXovY2xpY2tlci9ub3RfbG9nby5wbmc.webp',
        decimals: 9,
        verification: 'whitelist',
        exchangeRate: '0'
    },
    EQCvxJy4eG8hyHBFsZ7eePxrRsUQSFE_jpptRAYBmcG_DOGS: {
        symbol: 'DOGS',
        name: 'Dogs',
        address: 'EQCvxJy4eG8hyHBFsZ7eePxrRsUQSFE_jpptRAYBmcG_DOGS',
        image: 'https://cache.tonapi.io/imgproxy/6Pb0sBFy_AzW6l39EIHGs-Iz4eLbbZUh8AYY_Xq-rcg/rs:fill:200:200:1/g:no/aHR0cHM6Ly9jZG4uZG9ncy5kZXYvZG9ncy5wbmc.webp',
        decimals: 9,
        verification: 'whitelist',
        exchangeRate: '0'
    },
    EQDgGuB15VUI7wkJ9c5_tjQswWuePEtqTDXSHIYKMMSxx_2U: {
        symbol: 'PLD',
        name: 'Palladium',
        address: 'EQDgGuB15VUI7wkJ9c5_tjQswWuePEtqTDXSHIYKMMSxx_2U',
        image: 'https://cache.tonapi.io/imgproxy/czZMuWIzvADPXGkGJ1GoUYKxCI7EC4h0OfnwDYp3Dps/rs:fill:200:200:1/g:no/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1BhbGxhZGl1bS1mb3VuZGF0aW9uL3dlYnNpdGUvbWFpbi9sb2dvLnBuZw.webp',
        decimals: 9,
        verification: 'whitelist',
        exchangeRate: '0'
    },
    EQAQXlWJvGbbFfE8F3oS8s87lIgdovS455IsWFaRdmJetTon: {
        symbol: 'JETTON',
        name: 'JetTon',
        address: 'EQAQXlWJvGbbFfE8F3oS8s87lIgdovS455IsWFaRdmJetTon',
        image: 'https://cache.tonapi.io/imgproxy/VF6OeC8JlQ19hW2ecTD4t-mm5K9kmU8PvlFvqmwOj3s/rs:fill:200:200:1/g:no/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0pldFRvbi1Cb3QvSmV0VG9uL21haW4vamV0dG9uLTI1Ni5wbmc.webp',
        decimals: 9,
        verification: 'whitelist',
        exchangeRate: '0'
    },
    'EQBlqsm144Dq6SjbPI4jjZvA1hqTIP3CvHovbIfW_t-SCALE': {
        symbol: 'SCALE',
        name: 'Scaleton',
        address: 'EQBlqsm144Dq6SjbPI4jjZvA1hqTIP3CvHovbIfW_t-SCALE',
        image: 'https://cache.tonapi.io/imgproxy/5NPQb4dU02LiwsCpR9kW4hesLuqZwd5VRQXNC-K80bw/rs:fill:200:200:1/g:no/aXBmczovL1FtU01pWHNaWU1lZndyVFEzUDZIbkRRYUNwZWNTNEVXTHBnS0s1RVgxRzhpQTg.webp',
        decimals: 9,
        verification: 'whitelist',
        exchangeRate: '0'
    },
    EQA2kCVNwVsil2EM2mB0SkXytxCqQjS4mttjDpnXmwG9T6bO: {
        symbol: 'STON',
        name: 'STON',
        address: 'EQA2kCVNwVsil2EM2mB0SkXytxCqQjS4mttjDpnXmwG9T6bO',
        image: 'https://cache.tonapi.io/imgproxy/u6g-Eo01CQbP5ugIlzQUZEzM3DsU6ixZ7Z8wwJ2r_4g/rs:fill:200:200:1/g:no/aHR0cHM6Ly9zdGF0aWMuc3Rvbi5maS9sb2dvL3N0b25fc3ltYm9sLnBuZw.webp',
        decimals: 9,
        verification: 'whitelist',
        exchangeRate: '0'
    },
    EQAmQGimKRrSHDLllvdUdeDsX1CszGy_SPgNNN8wE2ihIwnP: {
        symbol: 'TPET',
        name: 'TON PET MEMECOIN',
        address: 'EQAmQGimKRrSHDLllvdUdeDsX1CszGy_SPgNNN8wE2ihIwnP',
        image: 'https://cache.tonapi.io/imgproxy/JOixKjeOYVStjB-SKTHDK9n-VI06hwTNBw3fl1PRJEs/rs:fill:200:200:1/g:no/aHR0cHM6Ly93d3cudG9uZmlzaC5pby9pbWFnZXMvQkxVRV9UX0NPSU4yLnBuZw.webp',
        decimals: 9,
        verification: 'whitelist',
        exchangeRate: '0'
    },
    'EQBadq9p12uC1KfSiPCAaoEvhpXPHj7hBWq-mqGntuwE2C1C': {
        symbol: 'CATS',
        name: 'TON Cats Jetton',
        address: 'EQBadq9p12uC1KfSiPCAaoEvhpXPHj7hBWq-mqGntuwE2C1C',
        image: 'https://cache.tonapi.io/imgproxy/QVwU-lMwfhaiXzyNU-oQ9H6cFizvHaIkg38hS3sojsc/rs:fill:200:200:1/g:no/aHR0cHM6Ly90b25jYXRzLnB3L2ZpbGVzLyRDQVRTL2xvZ28ucG5n.webp',
        decimals: 9,
        verification: 'whitelist',
        exchangeRate: '0'
    },
    'EQAWpz2_G0NKxlG2VvgFbgZGPt8Y1qe0cGj-4Yw5BfmYR5iF': {
        symbol: 'MEM',
        name: 'Not Meme',
        address: 'EQAWpz2_G0NKxlG2VvgFbgZGPt8Y1qe0cGj-4Yw5BfmYR5iF',
        image: 'https://cache.tonapi.io/imgproxy/0U6sEl4GYHgQlBl-NMx9WI5nhBAVehpsGtq5dOHo8lo/rs:fill:200:200:1/g:no/aHR0cHM6Ly9ub3RtZW1lLm9yZy9jb2luL3BpY3R1cmVzL25vdG1lbWVfbG9nby5wbmc.webp',
        decimals: 9,
        verification: 'whitelist',
        exchangeRate: '0'
    },
    EQBZ_cafPyDr5KUTs0aNxh0ZTDhkpEZONmLJA2SNGlLm4Cko: {
        symbol: 'REDO',
        name: 'Resistance Dog',
        address: 'EQBZ_cafPyDr5KUTs0aNxh0ZTDhkpEZONmLJA2SNGlLm4Cko',
        image: 'https://cache.tonapi.io/imgproxy/R-9iv8csp1jZ9ymWn4dvcnYC_z3seU2dCrDdU2whQn4/rs:fill:200:200:1/g:no/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1Jlc2lzdGFuY2UtRG9nL3Jlc2lzdGFuY2UtZG9nL21haW4vcmVzaXN0YW5jZS1kb2cud2VicA.webp',
        decimals: 9,
        verification: 'whitelist',
        exchangeRate: '0'
    }
};
