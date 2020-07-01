import {SagaType} from "../TypeModels/SagaType";
import {ReduxType} from "../TypeModels/ReduxType";
import {AsyncTypes} from "../TypeModels/AsyncTypes";

export enum payloadNames {
    RESTORE_LOADING = 'restoreLoading',
    RESTORE_EXCEPTION = 'restoreException',
    RESTORE_RESULT = 'restoreResult',
}

export const restoreSagaTypes: {[key: string]: SagaType} = {
    RESTORE: new SagaType('RESTORE', 'name'),
};

export const restoreTypes: {[key: string]: ReduxType} = {
    START_RESTORE: new ReduxType('START_RESTORE', AsyncTypes.startType, payloadNames.RESTORE_LOADING),
    RESTORE_FAILED: new ReduxType('RESTORE_FAILED', AsyncTypes.failType, payloadNames.RESTORE_EXCEPTION),
    RESTORE_COMPLETED: new ReduxType('RESTORE_COMPLETED', AsyncTypes.completeType, payloadNames.RESTORE_RESULT),
};