export class BillingCycle {
    /*
    "In the API -
    where ""1"" is present 12 times, Billing Cycle = Monthly
    where ""1"" is present 4 times, Billing Cycle = Quarterly
    where ""1"" is present 1 time, Billing Cycle = Annual
    where ""1"" is present 2 times, Billing Cycle = Semi-Annual
    Where ""1"" is present any other number of times, Billing Cycle = Unknown"
    */
    mapDisplay(inputstr: string): string {
        if (!inputstr) { return ''; }
        const count = (inputstr.match(/1/g) || []).length;
        switch (count) {
            case 12:
                return 'Monthly';
            case 4:
                return 'Quarterly';
            case 1:
                return 'Annual';
            case 2:
                return 'Semi-Annual';
            case 0:
                return inputstr;
            default:
                return 'Unknown';
        }
    }
}
