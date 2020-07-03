export const Validators: {[key: string]: Function} = {
    required: (value: any) => value ? undefined : 'Ez a mező kötelező',
    TaxIDLength: (value: any) => value ? undefined : 'Ennek a mezőnek 10 hosszúnak kell lennie',
};