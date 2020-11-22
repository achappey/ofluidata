import React, { useState } from "react";

import { DefaultButton, IPanelProps, PrimaryButton, Spinner } from "@fluentui/react";
import { useAsync, useAsyncCallback } from "react-async-hook";

import { OFluiColumn, OFluiFieldValidation } from "../../../types/oflui";
import { OFluiPanel } from "../Panel/Panel";
import { OFluiEditItemForm } from "../../Forms/EditItem/EditItem";
import { useLanguage } from "ofluidata-translations";
import { useFieldValidation } from "../../../hooks/use-FieldValidation";

export interface OFluiEditItemPanelProps extends IPanelProps {
    item: any,
    columns: OFluiColumn[],
    onSave: (item: any) => Promise<void>,

    header?: any,

    getItem?: (item: any) => Promise<any>,
}

interface Validation {
    column: OFluiColumn,
    validation?: OFluiFieldValidation
}

export const OFluiEditItemPanel: React.FunctionComponent<OFluiEditItemPanelProps> = (props) => {
    const { t } = useLanguage(props.lang);
    const [currentItem, setCurrentItem] = useState<any>(props.item);

    const [validations, setValidations] = useState<Validation[]>(props.columns
        .map(b => {
            return {
                column: b,
                validation: useFieldValidation(b, currentItem[b.name])
            }
        }));

    const onValidation = (column: OFluiColumn, validation?: OFluiFieldValidation) => {
       
        setValidations([
            ...validations.filter(a => a.column.name != column.name),
            {
                column: column,
                validation: validation
            }
        ]);
    }

    const isValid = validations
        .filter(g => g.validation != undefined).length == 0;

    const onUpdated = (item: any) => setCurrentItem(item);

    const getItem = props.getItem && props.item ?
        (item: any) => props
            .getItem!(item)
        : async (item: any) => item

    const loadPage = useAsync(getItem, [props.item]);

    const save = useAsyncCallback(props.onSave);
    const saveItem = () => save.execute(currentItem);

    const onDismiss = props.onDismiss ? () => props.onDismiss!() : undefined;

    const renderFooter = () => <>

        {!loadPage.loading &&
            <PrimaryButton
                text={t('save')}
                style={{ marginRight: 8 }}
                disabled={!isValid || save.loading}
                onClick={saveItem}
            />
        }

        {!loadPage.loading && onDismiss &&
            <DefaultButton
                text={t('cancel')}
                disabled={save.loading}
                onClick={onDismiss}
            />
        }
    </>;

    return <>
        <OFluiPanel {...props}
            header={props.header}
            errorMessage={loadPage.error?.message}
            onRenderFooterContent={renderFooter}>

            {loadPage.loading &&
                <Spinner />
            }

            {loadPage.result &&
                <OFluiEditItemForm {...props}
                    item={loadPage.result}
                    columns={props.columns}
                    onUpdated={onUpdated}
                    onValidation={onValidation}

                />
            }
        </OFluiPanel>
    </>;
}
