import {Asset} from '../../interfaces/asset.interface';
import {SelectListItem} from '../SelectListItem/SelectListItem';

export function rowRenderer(
    {
        key,
        index,
        style
    }: {
        key: string;
        index: number;
        style: React.CSSProperties;
    },
    selectInputAsset: (asset: Asset) => void,
    assets: Asset[]
) {
    return (
        <div key={key} style={style}>
            <SelectListItem
                key={index}
                asset={assets[index]}
                onClick={selectInputAsset}
            />
        </div>
    );
}
