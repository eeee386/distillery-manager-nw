import {Distillation} from '../models/Distillation/Distillation'
import PouchDB from 'pouchdb-browser';
import find from 'pouchdb-find';
import _ from 'lodash'
const fs = require('fs');
const nw = require('nw.gui')


export class SQLService {

    db: any;

    constructor(){
        PouchDB.plugin(find);
        this.db = new PouchDB('Distillation');
    }


    createIndex = async () => {
        return await this.db.createIndex({
            index: {fields: ['name', 'taxID']}
        });
    };

    findAll = async () => {
        const res = await this.db.find({selector: {}});
        return Distillation.fromObjects(res.docs);
    };

    findAllByName = async (nameToFind: string): Promise<Distillation[]> => {
        const {docs} = await this.db.find({selector: { name: nameToFind}});
        return Distillation.fromObjects(docs);
    };
    findAllByTaxID = async (taxIDToFind: string): Promise<Distillation[]> => {
        const {docs} = await this.db.find({selector: { taxID: taxIDToFind}});
        return Distillation.fromObjects(docs);
    };

    sumAllHLFByName = async (nameToFind: string): Promise<{[key: string]: number}> => {
        const res = await this.db.find({selector: { name: nameToFind}});
        return Distillation.sumHLF(res.docs);
    };

    sumAllHLFByTaxID = async (taxIDToFind: string): Promise<{[key: string]: number}> => {
        const res = await this.db.find({selector: { taxID: taxIDToFind }});
        return Distillation.sumHLF(res.docs);
    };

    sumAllWeightByName = async (nameToFind: string): Promise<{[key: string]: number}> => {
        const res = await this.db.find({selector: { name: nameToFind}});
        return Distillation.sumWeight(res.docs);
    };

    sumAllWeightByTaxID = async (taxIDToFind: string): Promise<{[key: string]: number}> => {
        const res = await this.db.find({selector: { taxID: taxIDToFind }});
        return Distillation.sumWeight(res.docs);
    };

    createNewDistillation = async (modelObject: {[key: string]: any}): Promise<Distillation> => {
        const result = await this.db.post(modelObject);
        const found = await this.db.get(result.id);
        return Distillation.fromObject(found);
    };

    updateDistillation = async (modelObject: {[key: string]: any}): Promise<Distillation> => {
        const result = await this.db.put(modelObject);
        const found = await this.db.get(result.id);
        return Distillation.fromObject(found);
    };

    deleteDistillation = async (modelObject: Distillation): Promise<any> => {
        const doc = await this.db.get(modelObject._id);
        return await this.db.remove(doc);
    };

    restoreDB = async (): Promise<any> => {
        const data = _.omit(SQLService.restoreData(), ["_id", "rev"]);
        return await this.db.bulkDocs(data);
    }

    destroyDataBase = async (): Promise<any> => {
        await this.db.destroy('Distillation')
    }

    static restoreData(): any[] | undefined {
        return JSON.parse(fs.readFileSync(`${nw.App.dataPath}/data.json`));
    }

    static saveDataToFile(distillations: Distillation[] | undefined): void {
        fs.writeFileSync(`${nw.App.dataPath}/data.json`, JSON.stringify(distillations));
    }
}