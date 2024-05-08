import {AssetObject} from '../../interfaces/asset-object.interface';
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
    selectInputAsset: (asset: AssetObject) => void,
    assets: AssetObject[]
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
