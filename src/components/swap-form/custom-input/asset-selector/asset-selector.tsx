import {Asset} from 'rainbow-swap-sdk';
import {FC, memo, useCallback, useEffect, useState} from 'react';

import {AssetList} from './asset-list/asset-list';
import styles from './asset-selector.module.css';
import {ChevronDownIcon} from '../../../../assets/icons/ChevronDownIcon/ChevronDownIcon';
import {BottomSheet} from '../../../../shared/bottom-sheet/bottom-sheet';
import {FormButton} from '../../../../shared/form-button/form-button';
import {useDispatch} from '../../../../store';
import {setAssetsSearchValue} from '../../../../store/initialized/runtime-actions';
import {Button} from '../../../button/button';

interface Props {
    value: Asset;
    headerTitle: string;
    onChange: (newValue: Asset) => void;
}

export const AssetSelector: FC<Props> = memo(
    ({value, headerTitle, onChange}) => {
        const dispatch = useDispatch();
        const [isOpen, setIsOpen] = useState(false);

        useEffect(() => {
            if (!isOpen) {
                dispatch(setAssetsSearchValue(''));
            }
        }, [dispatch, isOpen]);

        const handleOpen = () => setIsOpen(true);
        const handleDismiss = useCallback(() => setIsOpen(false), []);

        const handleChange = (newValue: Asset) => {
            setIsOpen(false);
            onChange(newValue);
        };

        return (
            <>
                <Button
                    size="m"
                    mode="bezeled"
                    className={styles.selected_asset_button}
                    onClick={handleOpen}
                >
                    <img
                        className={styles.img}
                        src={value.image}
                        alt={value.symbol}
                    />
                    <span>{value.symbol}</span>
                    <ChevronDownIcon />
                </Button>

                <BottomSheet
                    isOpen={isOpen}
                    headerTitle={headerTitle}
                    onClose={handleDismiss}
                >
                    <AssetList
                        isOpen={isOpen}
                        value={value}
                        onChange={handleChange}
                    />
                    <FormButton
                        text="Close"
                        containerClassName={styles.footer_container}
                        onClick={handleDismiss}
                    ></FormButton>
                </BottomSheet>
            </>
        );
    }
);
