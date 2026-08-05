import {FC} from 'react';

import styles from './compliance-modal.module.css';
import {PRIVACY_LINK, TERMS_LINK} from './compliance.constants';
import {Divider} from '../components/points-modal/social-tasks/divider/divider';
import {BottomSheet} from '../shared/bottom-sheet/bottom-sheet';
import {FormButton} from '../shared/form-button/form-button';

interface Props {
    errorMessage: string;
    isChecked: boolean;
    isOpen: boolean;
    isSaving: boolean;
    validationError: string;
    onCheckedChange: (isChecked: boolean) => void;
    onClose: () => void;
    onConfirm: () => void;
}

export const ComplianceModal: FC<Props> = ({
    errorMessage,
    isChecked,
    isOpen,
    isSaving,
    validationError,
    onCheckedChange,
    onClose,
    onConfirm
}) => (
    <BottomSheet
        isOpen={isOpen}
        headerTitle="Required confirmation"
        onClose={onClose}
    >
        <div className={styles.content_container}>
            <section>
                <p className={styles.title}>Eligibility</p>
                <p className={styles.description}>
                    To use Rainbow Swap, confirm that you are eligible under our
                    Terms. Rainbow Swap is not available in restricted
                    jurisdictions or to sanctioned persons.
                </p>
            </section>

            <label className={styles.confirmation}>
                <input
                    className={styles.checkbox}
                    type="checkbox"
                    checked={isChecked}
                    disabled={isSaving}
                    aria-invalid={Boolean(validationError)}
                    aria-describedby={
                        validationError
                            ? 'compliance-validation-error'
                            : undefined
                    }
                    onChange={event =>
                        onCheckedChange(event.currentTarget.checked)
                    }
                />
                <span className={styles.confirmation_content}>
                    <span className={styles.title}>Terms and eligibility</span>
                    <span className={styles.description}>
                        I agree to the{' '}
                        <a href={TERMS_LINK} target="_blank" rel="noreferrer">
                            Terms
                        </a>{' '}
                        and confirm that I am not in a restricted jurisdiction,
                        subject to sanctions, or acting for a sanctioned person.
                    </span>
                </span>
            </label>

            {validationError && (
                <p
                    id="compliance-validation-error"
                    className={styles.error}
                    role="alert"
                >
                    {validationError}
                </p>
            )}

            <Divider />

            <section>
                <p className={styles.title}>Acceptance record</p>
                <p className={styles.privacy_note}>
                    We record the policy version and confirmation time so you
                    are not asked again. See the{' '}
                    <a href={PRIVACY_LINK} target="_blank" rel="noreferrer">
                        Privacy Policy
                    </a>
                    {'.'}
                </p>
            </section>

            {errorMessage && (
                <p className={styles.error} role="alert">
                    {errorMessage}
                </p>
            )}
        </div>
        <FormButton
            text={
                isSaving
                    ? 'Saving confirmation…'
                    : 'Agree and confirm eligibility'
            }
            containerClassName={styles.footer_container}
            disabled={isSaving}
            onClick={onConfirm}
        />
    </BottomSheet>
);
