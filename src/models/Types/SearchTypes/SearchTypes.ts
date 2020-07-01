import {SagaType} from '../TypeModels/SagaType';
import {ReduxType} from '../TypeModels/ReduxType';
import {AsyncTypes} from '../TypeModels/AsyncTypes';

export enum payloadNames {
    SEARCH_LOADING = 'searchLoading',
    SEARCH_EXCEPTION = 'searchException',
    SEARCH_RESULT = 'searchResult',
}

export const searchSagaTypes: {[key: string]: SagaType} = {
    SEARCH_BY_NAME: new SagaType('SEARCH_BY_NAME', 'name'),
    SEARCH_BY_TAXID: new SagaType('SEARCH_BY_TAXID', 'taxID'),
};

export const searchTypes: {[key: string]: ReduxType} = {
    START_SEARCH_BY_TAXID: new ReduxType('START_SEARCH_BY_TAXID', AsyncTypes.startType, payloadNames.SEARCH_LOADING),
    SEARCH_BY_TAXID_FAILED: new ReduxType('SEARCH_BY_TAXID_FAILED', AsyncTypes.failType, payloadNames.SEARCH_EXCEPTION),
    SEARCH_BY_TAXID_COMPLETED: new ReduxType('SEARCH_BY_TAXID_COMPLETED', AsyncTypes.completeType, payloadNames.SEARCH_RESULT),
    START_SEARCH_BY_NAME: new ReduxType('START_SEARCH_BY_NAME', AsyncTypes.startType, payloadNames.SEARCH_LOADING),
    SEARCH_BY_NAME_FAILED: new ReduxType('SEARCH_BY_NAME_FAILED', AsyncTypes.failType, payloadNames.SEARCH_EXCEPTION),
    SEARCH_BY_NAME_COMPLETED: new ReduxType('SEARCH_BY_NAME_COMPLETED', AsyncTypes.completeType, payloadNames.SEARCH_RESULT),
};