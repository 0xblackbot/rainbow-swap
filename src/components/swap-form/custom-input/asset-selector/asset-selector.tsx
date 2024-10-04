import {Asset} from 'rainbow-swap-sdk';
import {FC, memo, useCallback, useState} from 'react';

import {AssetList} from './asset-list/asset-list';
import styles from './asset-selector.module.css';
import {ChevronDownIcon} from '../../../../assets/icons/ChevronDownIcon/ChevronDownIcon';
import {BottomSheet} from '../../../../shared/bottom-sheet/bottom-sheet';
import {FormButton} from '../../../../shared/form-button/form-button';

interface Props {
    value: Asset;
    headerTitle: string;
    onChange: (newValue: Asset) => void;
}

export const AssetSelector: FC<Props> = memo(
    ({value, headerTitle, onChange}) => {
        const [isOpen, setIsOpen] = useState(false);

        const handleOpen = () => setIsOpen(true);
        const handleDismiss = useCallback(() => setIsOpen(false), []);

        const handleChange = (newValue: Asset) => {
            setIsOpen(false);
            onChange(newValue);
        };

        return (
            <>
                <div
                    className={styles.selected_asset_button}
                    onClick={handleOpen}
                >
                    <img
                        className={styles.img}
                        src={value.image}
                        alt={value.symbol}
                    />
                    <p className={styles.p}>{value.symbol}</p>
                    <ChevronDownIcon />
                </div>

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
