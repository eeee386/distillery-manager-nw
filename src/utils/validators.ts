export const Validators: {[key: string]: Function} = {
    required: (value: any) => value ? undefined : 'Ez a mező kötelező',
};