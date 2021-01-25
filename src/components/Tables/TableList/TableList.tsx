import * as React from 'react'
import {Distillation} from '../../../models/Distillation/Distillation';
import TableListItem from './TableListItem';
import {SortByTypes} from "../../../models/Enums/SortByTypes";
import {DateTime} from 'luxon';
import {SortDirections} from "../../../models/Enums/SortDirections";
import "./TableList.scss"


interface ITableListProps {
    table: Distillation[];
    updateDistillation: (data: { [key: string]: string }) => Promise<Distillation>,
    deleteDistillation: (data: { [key: string]: string }) => Promise<Distillation>,
}

export default class TableList extends React.Component<ITableListProps> {
    state = {
        sortBy: SortByTypes.DATE,
        onlyThisYear: false,
        sortDirections: SortDirections.ASC,
    }

    handleSortTable = (table: Distillation[], compareFn: (a: Distillation, b: Distillation) => number): Distillation[] => {
        const preSortedArray = [...table].sort(Distillation.compareCreation);
        const sortedArray = [...preSortedArray].sort(compareFn);
        return this.state.sortDirections === SortDirections.ASC ? sortedArray : sortedArray.reverse();
    }

    prepTable = (table: Distillation[]): Distillation[] => {
        const {sortBy, onlyThisYear} = this.state;
        if(onlyThisYear) {
            const thisYear = DateTime.local().year;
            console.log(table[0].getLuxonDate());
            table = table.filter(e => e.getLuxonDate().year === thisYear);
        }
        if(sortBy === SortByTypes.NAME){
            return this.handleSortTable(table, (a, b) => a.name.localeCompare(b.name))
        } else if (sortBy === SortByTypes.DATE) {
            return this.handleSortTable(table, (a, b) => Distillation.compareDates(a, b))
        } else {
            return table;
        }
    }

    handleSort = (sortByArg: SortByTypes): void => {
        const {sortBy, sortDirections} = this.state;
        if(sortBy === sortByArg) {
            if(sortDirections === SortDirections.ASC){
                this.setState({sortDirections: SortDirections.DESC})
            } else {
                this.setState({sortDirections: SortDirections.ASC})
            }
        } else {
            this.setState({sortBy: sortByArg})
            this.setState({sortDirections: SortDirections.ASC})
        }
    }

    getSortDirection = (sortByArg: SortByTypes): string => {
        const {sortDirections, sortBy} = this.state;
        if(sortBy !== sortByArg){
            return ''
        }
        return sortDirections === SortDirections.ASC ? "Növekvő" : "Csökkenő";
    }

    onlyYearButtonText = () => {
        return this.state.onlyThisYear ? "Összes" : "Csak ezévi";
    }

    render() {
        const {table, updateDistillation, deleteDistillation} = this.props;
        return (
            <div className={'tablelist-wrapper'}>
                <div className={'tablesort-buttons'}>
                    <button className={'button is-link'} onClick={() => this.handleSort(SortByTypes.DATE)}>Dátum szerint {this.getSortDirection(SortByTypes.DATE)}</button>
                    <button className={'button is-link'} onClick={() => this.handleSort(SortByTypes.NAME)}>Név szerint {this.getSortDirection(SortByTypes.NAME)}</button>
                </div>
                <div>
                    <button className={'button is-info'} onClick={() => this.setState({onlyThisYear : !this.state.onlyThisYear})}>{this.onlyYearButtonText()}</button>
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