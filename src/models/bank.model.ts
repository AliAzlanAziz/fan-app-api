export class BankModel {
    fullName: string;
    idNumber: string;
    bankAccount: string;
    accountOwnerName: string;
    fileUrl: string|undefined;

    constructor(fullName: string, idNumber: string, bankAccount: string, accountOwnerName: string, fileUrl: string|undefined){
        this.fullName = fullName;
        this.idNumber = idNumber;
        this.bankAccount = bankAccount;
        this.accountOwnerName = accountOwnerName;
        this.fileUrl = fileUrl;
    }
}