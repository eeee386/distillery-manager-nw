import * as React from 'react'
import {connect} from 'react-redux';
import {tableSagaTypes} from '../../models/Types/TableTypes/TableTypes';
import './TableManager.scss';
import {isEmpty} from 'lodash';
import TableList from './TableList/TableList';
import TableForm from './TableForm/TableForm';
import {ConnectedComponentProps} from '../../models/ConnectTypes/ConnectTypes';
import {Distillation} from '../../models/Distillation/Distillation';
import {ActionFactory, Action} from '../../ReduxStoreHandlers/actionFactory';

interface TableManagerProps {
    table: Distillation[];
}

class TableManager extends React.Component<ConnectedComponentProps & TableManagerProps> {
    render() {
        const {table, addNewDistillation, updateDistillation, deleteDistillation} = this.props;
        return (
            <div className={'tableWrapper'}>
                <TableForm onSubmit={addNewDistillation} form={'addNew'}/>
                {isEmpty(table) ? "Nincsenek főzetések" :
                    <TableList table={table} updateDistillation={updateDistillation}
                               deleteDistillation={deleteDistillation}/>}
            </div>
        )
    }
}

const matchDispatchToProps = (dispatch: React.Dispatch<Action>) => ({
    addNewDistillation: (newDist: Distillation) => dispatch(ActionFactory(tableSagaTypes.ADD_NEW, newDist)),
    updateDistillation: (updatedDist: Distillation) => dispatch(ActionFactory(tableSagaTypes.UPDATE_ONE, updatedDist)),
    deleteDistillation: (deletedDist: Distillation) => dispatch(ActionFactory(tableSagaTypes.DELETE_ONE, deletedDist)),
});

export default connect(null, matchDispatchToProps)(TableManager);