import {API} from '../globals';
import {
    ComplianceStatusResponse,
    TonProofPayloadResponse,
    TonProofVerificationRequest,
    TonProofVerificationResponse
} from './compliance.types';

const COMPLIANCE_REQUEST_TIMEOUT_MS = 15_000;

interface ComplianceCredentials {
    initData?: string;
    walletToken?: string;
}

export const getTonProofPayload = () =>
    API.get<TonProofPayloadResponse>('/compliance/ton-proof-payload', {
        timeout: COMPLIANCE_REQUEST_TIMEOUT_MS
    }).then(response => response.data);

export const verifyTonProof = (request: TonProofVerificationRequest) =>
    API.post<TonProofVerificationResponse>('/compliance/ton-proof', request, {
        timeout: COMPLIANCE_REQUEST_TIMEOUT_MS
    }).then(response => response.data);

export const getComplianceStatus = (credentials: ComplianceCredentials) =>
    API.post<ComplianceStatusResponse>('/compliance/status', credentials, {
        timeout: COMPLIANCE_REQUEST_TIMEOUT_MS
    }).then(response => response.data);

export const acceptCompliancePolicy = (
    credentials: ComplianceCredentials,
    policyVersion: string
) =>
    API.post<ComplianceStatusResponse>(
        '/compliance/accept',
        {
            ...credentials,
            policyVersion,
            confirmation: true
        },
        {timeout: COMPLIANCE_REQUEST_TIMEOUT_MS}
    ).then(response => response.data);
