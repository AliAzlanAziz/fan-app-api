export enum ExchangeStatus {
    PENDING = 1,
    APPROVED = 2,
    REJECTED = 3
}

export const isApproved = (status: ExchangeStatus): boolean => {
    return status == ExchangeStatus.APPROVED
}

export const isRejected = (status: ExchangeStatus): boolean => {
    return status == ExchangeStatus.REJECTED
}
