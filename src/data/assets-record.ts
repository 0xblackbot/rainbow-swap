import {TON, USDT} from '../globals';
import {AssetsRecord} from '../types/assets-record.type';

export const DEFAULT_ASSETS_RECORD: AssetsRecord = {
    [TON]: {
        name: 'Toncoin',
        symbol: 'TON',
        address: TON,
        image: 'https://assets.dedust.io/images/ton.webp',
        decimals: 9,
        exchangeRate: '0'
    },
    [USDT]: {
        name: 'Tether USD',
        symbol: 'USD₮',
        address: USDT,
        image: 'https://cache.tonapi.io/imgproxy/T3PB4s7oprNVaJkwqbGg54nexKE0zzKhcrPv8jcWYzU/rs:fill:200:200:1/g:no/aHR0cHM6Ly90ZXRoZXIudG8vaW1hZ2VzL2xvZ29DaXJjbGUucG5n.webp',
        decimals: 6,
        exchangeRate: '0'
    },
    ['EQDv2J75-X4v27dkDugwqnZ0cZ26UePE7xCUzbJE2U7wEdZM']: {
        name: 'NOOTYA',
        symbol: 'NOOTYA',
        address: 'EQDv2J75-X4v27dkDugwqnZ0cZ26UePE7xCUzbJE2U7wEdZM',
        image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1713714837122-199a71c241006f6699431eb4caa3c15e.png',
        decimals: 9,
        exchangeRate: '0'
    },
    ['EQDBtjG2bs3AN5X54ApnK3_WwN8Vl71vHw0VLq7IfbjMpZEe']: {
        name: 'Cheems on Ton',
        symbol: 'CHEEMS',
        address: 'EQDBtjG2bs3AN5X54ApnK3_WwN8Vl71vHw0VLq7IfbjMpZEe',
        image: 'https://scontent.fceb1-4.fna.fbcdn.net/v/t1.15752-9/437927714_451900830826350_546696055500294394_n.png?stp=dst-png_p403x403&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFN8bnMKBMGr-Gpyo0XClDdMMLudXuSWjUwwu51e5JaNQ4-zXQ_eEd8WCpooynyAbvRQb8MEjt_tT_gzglDGy_b&_nc_ohc=_rX7xzAImz8Ab73hLsF&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fceb1-4.fna&oh=03_Q7cD1QERxgxR1N04C0rAaAjf9XeigKTf-ISGFfIQ5o_NvqzHhg&oe=66496182',
        decimals: 9,
        exchangeRate: '0'
    },
    ['EQBkIljrz3igilxQ99PJnoN6DewESvS56WL4rurUQmxy_j6r']: {
        name: 'POODLE',
        symbol: 'poodle',
        address: 'EQBkIljrz3igilxQ99PJnoN6DewESvS56WL4rurUQmxy_j6r',
        image: 'https://bafkreidlg2qaxs4xitbpm6jyw4admvgbz7k5ut4by4pwxtjni7i3i3jr5i.ipfs.nftstorage.link/',
        decimals: 9,
        exchangeRate: '0'
    },
    ['EQDPh92YWAHF_u9VsY3xJSCL5hf5IrMRyLvMn1mrYvb72Xqx']: {
        name: 'KAITO',
        symbol: 'KAITO',
        address: 'EQDPh92YWAHF_u9VsY3xJSCL5hf5IrMRyLvMn1mrYvb72Xqx',
        image: 'https://bafybeidbyntpfwjbixaxpzmidpjrtjz7ahnzokcuuog46gtzxhmw6m55m4.ipfs.nftstorage.link/pobrane%20(15).jfif',
        decimals: 9,
        exchangeRate: '0'
    },
    ['EQC8hLCXW6Z4f679By0gEC6-Y_ot9okFBz1uE9d4tWd0Biuo']: {
        name: 'Prince Harry',
        symbol: 'PH',
        address: 'EQC8hLCXW6Z4f679By0gEC6-Y_ot9okFBz1uE9d4tWd0Biuo',
        image: 'https://i1.wampi.ru/2024/02/10/8c89e0c06e8a0a2cf.png',
        decimals: 9,
        exchangeRate: '0'
    },
    ['EQDeRMjfWOwnjT9GOJn-jDjs_-6r76hCGwQh9am9QZ9Hc264']: {
        name: 'SATURN',
        symbol: 'STR',
        address: 'EQDeRMjfWOwnjT9GOJn-jDjs_-6r76hCGwQh9am9QZ9Hc264',
        image: 'https://i.postimg.cc/FsVKVj3z/IMG-20240305-231646-571.jpg',
        decimals: 9,
        exchangeRate: '0'
    },
    ['EQD-nfgEYaZnOuXFumzGUZ4uzvuKGDAz2QxL6_UL1HDYJUGr']: {
        name: 'PONZI JETTON',
        symbol: 'PONZI',
        address: 'EQD-nfgEYaZnOuXFumzGUZ4uzvuKGDAz2QxL6_UL1HDYJUGr',
        image: 'https://i.ibb.co/Hxmk6Hf/IMG-0504.jpg',
        decimals: 9,
        exchangeRate: '0'
    },
    ['EQBM5V1DBhDF034ngG-GAG-qnM4SiE25L3jH8kI5YqtWXmUo']: {
        name: 'Peng Ricky',
        symbol: 'RICKY',
        address: 'EQBM5V1DBhDF034ngG-GAG-qnM4SiE25L3jH8kI5YqtWXmUo',
        image: 'https://i.postimg.cc/dtFq0fTM/logo.png',
        decimals: 6,
        exchangeRate: '0'
    },
    ['EQAfCYJwb7vtTFLZk0fllREQ3xhGh1Ok6Pck2nn_JZAzTdZ_']: {
        name: 'Ton Kitty',
        symbol: 'KITTY',
        address: 'EQAfCYJwb7vtTFLZk0fllREQ3xhGh1Ok6Pck2nn_JZAzTdZ_',
        image: 'https://i.postimg.cc/Hk2z1Fb1/Ton-Kitty.png',
        decimals: 9,
        exchangeRate: '0'
    },
    ['EQDkIE6xAEPErswuOJoPZhlIjNkJ79tKN0-xiHfICaxRmUR7']: {
        name: 'TON MINT',
        symbol: 'TON MINT',
        address: 'EQDkIE6xAEPErswuOJoPZhlIjNkJ79tKN0-xiHfICaxRmUR7',
        image: 'https://play-lh.googleusercontent.com/Tca5wM5m-0Y4pM7v350ucRWWhSTiXacjfIsl_50ThsQnib61QK60jLUQXdthwgTTzw',
        decimals: 9,
        exchangeRate: '0'
    }
};
