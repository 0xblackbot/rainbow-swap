import sharedStyles from '../settings-button.module.css';
import {ThemeButton} from './theme-button';
import {Theme} from '../../../../enums/theme.enum';

export const ThemeSetting = () => (
    <div className={sharedStyles.title_container}>
        <p className={sharedStyles.title}>Theme</p>
        <div className={sharedStyles.selector_container}>
            <ThemeButton title="Dark" value={Theme.Dark} />
            <div className={sharedStyles.selector_divider} />
            <ThemeButton title="Light" value={Theme.Light} />
        </div>
    </div>
);
