import {DateTime} from "luxon";
import {SumByTypes} from "../Enums/SumByTypes";

export class Distillation {
    _id: string;
    date: string;
    name: string;
    address: string;
    taxID: string;
    originID: string;
    HLF: string;
    weightInKilograms: string;
    _rev: string;


	constructor(
        date: string,
        name: string,
        address: string,
        taxID: string,
        originID: string,
        HLF: string,
        weightInKilograms: string,
        _id: string,
        _rev: string,
        ) {
            this._id = _id;
            this.date = date;
            this.name = name;
            this.address = address;
            this.taxID = taxID;
            this.originID = originID;
            this.HLF = HLF;
            this.weightInKilograms = weightInKilograms;
            this._rev = _rev;
    }
    
    toObject(): {[key: string]: any} {
        return Object.assign({}, this);
    }

    static fromObject(modelObject: {[key: string]: any}): Distillation {
        const {_id, date, address, name, taxID, originID, HLF, weightInKilograms, _rev} = modelObject;
        return new Distillation(date, name, address, taxID, originID, HLF, weightInKilograms, _id, _rev)
    }

    static fromObjects(modelObjects: {[key: string]: any}[]): Distillation[] {

        const models: any[] = modelObjects
        return models.map((item: any) => {
            const {_id, date, address, name, taxID, originID, HLF, weightInKilograms, _rev} = item;
            return new Distillation(date, name, address, taxID, originID, HLF, weightInKilograms, _id, _rev)
        })
    }

    getLuxonDate(): DateTime {
	    return DateTime.fromISO(this.date);
    }

    static divideDistillationByYear(modelObjects: {[key: string]: any}[]): {[key: string]: Distillation[]} {
        const map: {[key: string]: Distillation[]} = {};

	    modelObjects.forEach((e) => {
            const dist = Distillation.fromObject(e);
            const distDate = DateTime.fromISO(dist.date);
            if(!map[distDate.year.toString()]) {
                map[distDate.year] = [];
            }
            map[distDate.year].push(dist);
        })
        return map;
    }

    private static sum(resultDocs: {[key: string]: any}[], propToSum: SumByTypes): {[key: string]: number} {
        const data = Distillation.divideDistillationByYear(resultDocs);
        const resultMap: {[key: string]: number} = {}
        Object.keys(data).forEach(year => {
            if(propToSum === SumByTypes.HLF){
                resultMap[year] = data[year].reduce((acc: number, curr: Distillation) => acc + parseInt(curr.HLF), 0)
            } else {
                resultMap[year] = data[year].reduce((acc: number, curr: Distillation) => acc + parseInt(curr.weightInKilograms), 0)
            }
        })
        return resultMap;
    }

    static sumHLF(resultDocs: {[key: string]: any}[]): {[key: string]: number}  {
        return Distillation.sum(resultDocs, SumByTypes.HLF);
    }

    static sumWeight(resultDocs: {[key: string]: any}[]): {[key: string]: number}  {
        return Distillation.sum(resultDocs, SumByTypes.WEIGHT);
    }

    static compareDates(a: Distillation, b: Distillation): number {
        const aDate = a.getLuxonDate().startOf("day");
        const bDate = b.getLuxonDate().startOf("day");
        if(aDate < bDate) {
            return -1;
        } else if (bDate < aDate) {
            return 1;
        } else {
            return 0;
        }
    }

    equals(dist: Distillation): boolean {
	    return Object.keys(this).map(key => this.toObject()[key] === dist.toObject()[key]).reduce((acc, curr) => acc && curr, true);
    }
}