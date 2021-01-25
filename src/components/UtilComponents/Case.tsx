import * as React from "react";
import { Fragment } from "react";

interface CaseProps {
    value: any,
    data: any,
    children: any
}

export const Case = ({value, data, children}: CaseProps): JSX.Element => {
    return <Fragment>{value === data && children}</Fragment>
}