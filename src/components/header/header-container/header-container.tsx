import {FC, PropsWithChildren} from 'react';

import styles from './header-container.module.css';
import {ContentContainer} from '../../../shared/content-container/content-container';

export const HeaderContainer: FC<PropsWithChildren> = ({children}) => (
    <>
        <div className={styles.replacement} />
        <div className={styles.container}>
            <ContentContainer>
                <div className={styles.inner_container}>{children}</div>
            </ContentContainer>
        </div>
    </>
);
