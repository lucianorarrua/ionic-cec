export class PayMethod {
    payMethod: string;
    enabled: boolean;
    constructor(payMethod: string, enabled: boolean) {
        this.payMethod = payMethod;
        this.enabled = enabled;
    }
}
