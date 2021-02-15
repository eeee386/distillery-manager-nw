import * as React from 'react';
import {DateTime} from "luxon";
import {Distillation} from "../../../models/Distillation/Distillation";
import {SumByTypes} from "../../../models/Enums/SumByTypes";
import {ConnectedComponentProps} from "../../../models/ConnectTypes/ConnectTypes";
import {monthMap} from "./MonthMap";
import {Fragment} from 'react';
import "./MonthlySum.scss"

interface MonthlySumProps {
    table: Distillation[];
}

class MonthlySum extends React.Component<ConnectedComponentProps & MonthlySumProps> {

    state = {
        onlyThisYear: false
    }

    prepData = (table: Distillation[], prop: SumByTypes): { [key: string]: { [key: string]: number } } | null => {
        if (!table) {
            return null;
        }
        const getYear = (e: Distillation) => e.getLuxonDate().year.toString()
        const getMonth = (e: Distillation) => monthMap[e.getLuxonDate().month.toString()];

        if (this.state.onlyThisYear) {
            const thisYear = DateTime.local().year;
            table = table.filter(e => e.getLuxonDate().year === thisYear);
        }
        table = [...table].sort((a, b) => Distillation.compareDates(a, b))
        const mapYear: { [key: string]: Distillation[] } = {};
        table.forEach(e => {
            if (!mapYear[getYear(e)]) {
                mapYear[getYear(e)] = [];
            }
            mapYear[getYear(e)].push(e);
        })
        const mapNumber: { [key: string]: { [key: string]: number } } = {};
        Object.keys(mapYear).forEach(year => {
            if (!mapNumber[year]) {
                mapNumber[year] = {};
            }
            mapYear[year].forEach(dist => {
                if (!mapNumber[year][getMonth(dist)]) {
                    mapNumber[year][getMonth(dist)] = 0
                }
                mapNumber[year][getMonth(dist)] += prop === SumByTypes.WEIGHT ? parseFloat(dist.weightInKilograms.replace(",", ".")) : parseFloat(dist.HLF.replace(",", "."));
            })
        })
        return mapNumber;
    }

    onlyYearButtonText = () => {
        return this.state.onlyThisYear ? "Összes" : "Csak ezévi";
    }

    renderMap(map: { [key: string]: { [key: string]: number } } | null) {
        return <Fragment>{this.props.table && map && <div>{
            Object.keys(map).map(year => <div className={"map-data-wrapper"}>
                <div>{year}</div>
                <div className={"map-month-data-wrapper"}>{Object.keys(map[year]).map(month =>
                    <div>
                        <span>{month} : </span>
                        <span>{map[year][month]}</span>
                    </div>
                )}</div>
            </div>)}</div>}</Fragment>
    }

    renderMapWrapper(title: string, map: { [key: string]: { [key: string]: number } } | null) {
        return <div className={"box"}>
            <div className={"box-title"}>{title}</div>
            {this.renderMap(map)}
        </div>
    }

    render() {
        const mapWeight = this.prepData(this.props.table, SumByTypes.WEIGHT);
        const mapHLF = this.prepData(this.props.table, SumByTypes.HLF);
        return <div className={"monthlysum-wrapper"}>
            <button className={'button is-info'}
                    onClick={() => this.setState({onlyThisYear: !this.state.onlyThisYear})}>{this.onlyYearButtonText()}</button>
            {this.renderMapWrapper("Tömeg", mapWeight)}
            {this.renderMapWrapper("Hektoliterfok", mapHLF)}
        </div>;
    }
}

export default MonthlySum;