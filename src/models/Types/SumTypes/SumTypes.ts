import {SagaType} from "../TypeModels/SagaType";
import {ReduxType} from "../TypeModels/ReduxType";
import {AsyncTypes} from "../TypeModels/AsyncTypes";

export enum payloadNames {
    SUM_LOADING = 'sumLoading',
    SUM_EXCEPTION = 'sumException',
    SUM_RESULT = 'sumResult',
}

export const sumSagaTypes: {[key: string]: SagaType} = {
    SUM_HLF_BY_NAME: new SagaType('SUM_HLF_BY_NAME', 'name'),
    SUM_WEIGHT_BY_NAME: new SagaType('SUM_WEIGHT_BY_NAME', 'name'),
    SUM_HLF_BY_TAXID: new SagaType('SUM_HLF_BY_TAXID', 'taxID'),
    SUM_WEIGHT_BY_TAXID: new SagaType('SUM_WEIGHT_BY_TAXID', 'taxID'),
};

export const sumTypes: {[key: string]: ReduxType} = {
    START_SUM_HLF_BY_TAXID: new ReduxType('START_SUM_HLF_BY_TAXID', AsyncTypes.startType, payloadNames.SUM_LOADING),
    SUM_HLF_BY_TAXID_FAILED: new ReduxType('SUM_HLF_BY_TAXID_FAILED', AsyncTypes.failType, payloadNames.SUM_EXCEPTION),
    SUM_HLF_BY_TAXID_COMPLETED: new ReduxType('SUM_HLF_BY_TAXID_COMPLETED', AsyncTypes.completeType, payloadNames.SUM_RESULT),
    START_SUM_HLF_BY_NAME: new ReduxType('START_SUM_HLF_BY_NAME', AsyncTypes.startType, payloadNames.SUM_LOADING),
    SUM_HLF_BY_NAME_FAILED: new ReduxType('SUM_HLF_BY_NAME_FAILED', AsyncTypes.failType, payloadNames.SUM_EXCEPTION),
    SUM_HLF_BY_NAME_COMPLETED: new ReduxType('SUM_HLF_BY_NAME_COMPLETED', AsyncTypes.completeType, payloadNames.SUM_RESULT),
    START_SUM_WEIGHT_BY_TAXID: new ReduxType('START_SUM_WEIGHT_BY_TAXID', AsyncTypes.startType, payloadNames.SUM_LOADING),
    SUM_WEIGHT_BY_TAXID_FAILED: new ReduxType('SUM_WEIGHT_BY_TAXID_FAILED', AsyncTypes.failType, payloadNames.SUM_EXCEPTION),
    SUM_WEIGHT_BY_TAXID_COMPLETED: new ReduxType('SUM_WEIGHT_BY_TAXID_COMPLETED', AsyncTypes.completeType, payloadNames.SUM_RESULT),
    START_SUM_WEIGHT_BY_NAME: new ReduxType('START_SUM_WEIGHT_BY_NAME', AsyncTypes.startType, payloadNames.SUM_LOADING),
    SUM_WEIGHT_BY_NAME_FAILED: new ReduxType('SUM_WEIGHT_BY_NAME_FAILED', AsyncTypes.failType, payloadNames.SUM_EXCEPTION),
    SUM_WEIGHT_BY_NAME_COMPLETED: new ReduxType('SUM_WEIGHT_BY_NAME_COMPLETED', AsyncTypes.completeType, payloadNames.SUM_RESULT),
};