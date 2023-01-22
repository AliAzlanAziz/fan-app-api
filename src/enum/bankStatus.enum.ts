export enum BankStatus {
    PENDING = 1,
    APPROVED = 2,
    REJECTED = 3
}

export const isApproved = (status: BankStatus): boolean => {
    return status == BankStatus.APPROVED
}

export const isRejected = (status: BankStatus): boolean => {
    return status == BankStatus.REJECTED
}
