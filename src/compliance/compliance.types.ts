export interface ComplianceStatusResponse {
    accepted: boolean;
    acceptedAt?: string;
    policyVersion: string;
}

export interface TonProofPayloadResponse {
    payload: string;
    policyVersion: string;
}

export interface TonProofVerificationRequest {
    initData?: string;
    account: {
        address: string;
        chain: string;
        walletStateInit: string;
    };
    proof: {
        timestamp: number;
        domain: {
            lengthBytes: number;
            value: string;
        };
        payload: string;
        signature: string;
    };
}

export interface TonProofVerificationResponse extends ComplianceStatusResponse {
    walletAddress: string;
    walletToken: string;
}

export interface WalletSession {
    walletAddress: string;
    walletToken: string;
}
