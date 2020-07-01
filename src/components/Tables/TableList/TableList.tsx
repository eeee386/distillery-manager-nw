import * as React from 'react'
import {Distillation} from '../../../models/Distillation/Distillation';
import TableListItem from './TableListItem';
import {SortByTypes} from "../../../models/Enums/SortByTypes";
import {DateTime} from 'luxon';


interface ITableListProps {
    table: Distillation[];
    updateDistillation: (data: { [key: string]: string }) => Promise<Distillation>,
    deleteDistillation: (data: { [key: string]: string }) => Promise<Distillation>,
}

export default class TableList extends React.Component<ITableListProps> {
    state = {
        sortBy: SortByTypes.NONE
    }

    prepTable = (table: Distillation[]): Distillation[] => {
        const {sortBy} = this.state;
        if(sortBy === SortByTypes.NAME){
            return [...table].sort((a, b) => a.name.localeCompare(b.name))
        } else if (sortBy === SortByTypes.DATE) {
            return [...table].sort((a, b) => {
                const aDate = DateTime.fromISO(a.date).startOf("day");
                const bDate = DateTime.fromISO(b.date).startOf("day");
                if(aDate < bDate) {
                    return -1;
                } else if (bDate < aDate) {
                    return 1;
                } else {
                    return 0;
                }
            })
        } else {
            return table;
        }
    }

    render() {
        const {table, updateDistillation, deleteDistillation} = this.props;
        return (
            <div className={'tablelist-wrapper'}>
                <div className={'tablesort-buttons'}>
                    <button className={'button is-link'} onClick={() => this.setState({sortBy: SortByTypes.DATE})}>Rendezés dátum szerint</button>
                    <button className={'button is-link'} onClick={() => this.setState({sortBy: SortByTypes.NAME})}>Rendezés név szerint</button>
                    <button className={'button is-link'} onClick={() => this.setState({sortBy: SortByTypes.NONE})}>Nincs rendezés</button>
                </div>
                {this.prepTable(table).map((data: Distillation) => (
                    <div key={data._id}>
                        <TableListItem updateDistillation={updateDistillation} data={data}
                                       deleteDistillation={deleteDistillation}/>
                    </div>))}
            </div>
        )
    }
}