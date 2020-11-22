import React from "react";

import { IPanelProps, Spinner } from "@fluentui/react";
import { useAsync } from "react-async-hook";

import { OFluiDisplayItemForm } from "../../Forms/DisplayItem/DisplayItemForm";
import { OFluiColumnGroup } from "../../../types/oflui";
import { OFluiPanel } from "../Panel/Panel";

export interface OFluiDisplayItemPanelProps extends IPanelProps {
    item: any,
    groups: OFluiColumnGroup[],
    header?: any,
    getItem?: (item: any) => Promise<any>,
    onEdit?: (group: OFluiColumnGroup) => void,
}

export const OFluiDisplayItemPanel: React.FunctionComponent<OFluiDisplayItemPanelProps> = (props) => {
    const getItem = props.getItem ?
        (item: any) => props
            .getItem!(item)
        : async (item: any) => item

    const loadPage = useAsync(getItem, [props.item]);

    return <>
        <OFluiPanel {...props}
            header={props.header}
            errorMessage={loadPage.error?.message}>

            {loadPage.loading &&
                <Spinner />
            }

            {loadPage.result &&
                <OFluiDisplayItemForm {...props}
                    item={loadPage.result}
                    onEdit={props.onEdit}
                />
            }
        </OFluiPanel>
    </>;
}
