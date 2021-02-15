export const truncFloat = (num:number): number => parseFloat(num.toFixed(1));

export const stringToFloat = (e:string): number => parseFloat(e.replace(",","."));