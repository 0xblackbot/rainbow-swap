import {FC, PropsWithChildren} from 'react';

import styles from './header-container.module.css';
import {useDivHeight} from '../../hooks/use-div-height.hook.tsx';
import {ContentContainer} from '../content-container/content-container.tsx';

export const HeaderContainer: FC<PropsWithChildren> = ({children}) => {
    const divHeight = useDivHeight();

    return (
        <>
            <div style={{height: divHeight.height}}></div>
            <div ref={divHeight.ref} className={styles.container}>
                <ContentContainer>
                    <div className={styles.inner_container}>{children}</div>
                </ContentContainer>
            </div>
        </>
    );
};
