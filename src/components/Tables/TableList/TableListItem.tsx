import React, {Fragment} from 'react';
import {Distillation} from '../../../models/Distillation/Distillation';
import TableForm from '../TableForm/TableForm';
import {nameMap} from './NameMap';
import _ from 'lodash';
import Modal from 'react-modal';
import './TableListItem.scss';

interface ITableListItemProps {
    data: Distillation,
    updateDistillation: (data: { [key: string]: string }) => Promise<Distillation>,
    deleteDistillation: (data: { [key: string]: string }) => Promise<Distillation>,
}

Modal.setAppElement('#root');

export default class TableListItem extends React.Component<ITableListItemProps> {
    state = {
        isEdit: false,
        isDeleteModalOpen: false,
        isShow: false,
    };

    renderDistillation = (data: Distillation) => {
        let dataObject = data.toObject();
        dataObject = _.omit(dataObject, ['_id', '_rev', 'createdAt']);
        return Object.keys(dataObject).map((key: string) => <div className={"item-data"} key={`${key}-${data._id}`}>
            <span>{nameMap[key]}:</span><span>{dataObject[key]}</span></div>)
    };

    editModeToggle = (): void => {
        this.setState({isEdit: !this.state.isEdit});
    };

    showModeToggle = (): void => {
        this.setState({isShow: !this.state.isShow});
    }

    deleteModalOpen = (): void => {
        this.setState({isDeleteModalOpen: true});
    };

    deleteModalClose = (): void => {
        this.setState({isDeleteModalOpen: false})
    };

    deleteHandler = (): void => {
        this.props.deleteDistillation(this.props.data.toObject());
        this.deleteModalClose();
    };

    onSubmitHandler = (data: { [key: string]: string }): void => {
        this.props.updateDistillation(data);
        this.editModeToggle();
    };

    render(): JSX.Element {
        const {data} = this.props;
        const {isEdit, isDeleteModalOpen, isShow} = this.state;
        return (
            <div className={'tablelistitem-wrapper'}>
                <button className={'button is-warning show-button'} onClick={this.showModeToggle}><span>{data.name}:</span><span>{data.date}</span></button>
                {isShow && <Fragment>
                    {isEdit ? <TableForm onSubmit={this.onSubmitHandler}
                                         form={`EditTableForm_${data._id}`} initialValues={data} /> : this.renderDistillation(data)
                    }
                    <div className={"data-button-wrapper"}>
                        <button className={'button is-primary'}
                                onClick={() => this.editModeToggle()}>{isEdit ? 'Mégse' : 'Szerkesztés'}</button>
                        <button className={'button is-danger'} onClick={() => this.deleteModalOpen()}>Törlés</button>
                    </div>
                    <Modal
                        isOpen={isDeleteModalOpen}
                        onRequestClose={this.deleteModalClose}
                        contentLabel="Example Modal"
                    >
                        <div>
                            <div>Biztosan törölni akarod?</div>
                            <button className={'button is-danger'} onClick={this.deleteHandler}>Törlés</button>
                            <button className={'button'} onClick={this.deleteModalClose}>Mégse</button>
                        </div>
                    </Modal></Fragment>
                }
            </div>
        )
    }
}