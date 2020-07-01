import * as React from "react";
import {Dispatch} from "redux";
import {ActionFactory} from "../../ReduxStoreHandlers/actionFactory";
import {restoreSagaTypes} from "../../models/Types/RestoreTypes/RestoreTypes";
import {connect} from "react-redux";
import {FunctionComponent} from "react";

interface RestoreProps {
    restore: () => void;
}

const Restore: FunctionComponent<RestoreProps> = ({restore}) => {
    return (
        <div>
            <div>Biztonsági visszaállítás (csak akkor ha elveszik az adat)</div>
            <button className={"button is-primary"} onClick={restore}>Visszaállítás</button>
        </div>
    );
}

const matchDispatchToProps = (dispatch: Dispatch) => ({
    restore: () => dispatch(ActionFactory(restoreSagaTypes.RESTORE)),
});

export default connect(null, matchDispatchToProps)(Restore);