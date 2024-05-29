import {FC, useState} from 'react';

import {AssetList} from './asset-list/asset-list.tsx';
import styles from './asset-selector.module.css';
import {ChevronRightIcon} from '../../assets/icons/ChevronRightIcon/ChevronRightIcon.tsx';
import {BottomSheet} from '../../components/bottom-sheet/bottom-sheet.tsx';
import {Asset} from '../../interfaces/asset.interface';
import {FormButton} from '../FormButton/FormButton.tsx';

interface Props {
    value: Asset;
    headerTitle: string;
    onChange: (newValueAddress: string) => void;
}

export const AssetSelector: FC<Props> = ({value, headerTitle, onChange}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleDismiss = () => setIsOpen(false);

    const handleChange = (newValueAddress: string) => {
        setIsOpen(false);
        onChange(newValueAddress);
    };

    return (
        <>
            <div className={styles.selected_asset_button} onClick={handleOpen}>
                <img className={styles.img} src={value.image} />
                <p className={styles.p}>{value.symbol}</p>
                <ChevronRightIcon />
            </div>

            <BottomSheet
                isOpen={isOpen}
                headerTitle={headerTitle}
                onClose={handleDismiss}
            >
                <AssetList value={value} onChange={handleChange} />
                <FormButton
                    text="Close"
                    containerClassName={styles.footer_container}
                    onClick={handleDismiss}
                ></FormButton>
            </BottomSheet>
        </>
    );
};
