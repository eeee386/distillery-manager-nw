//all the async types.
import {Type} from './Type';

export class SagaType implements Type {
    typeName: string;
    payloadName?: string;

    constructor(typeName: string, payloadName?: string) {
        this.typeName = typeName;
        this.payloadName = payloadName;
    }
}