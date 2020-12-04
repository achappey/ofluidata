import * as React from "react";

import { DefaultButton, IPanelProps, PrimaryButton, Spinner } from "@fluentui/react";

import { OFluiColumn, OFluiFieldValidation, OFluiLookup } from "../../../types/oflui";
import { OFluiPanel } from "../Panel/Panel";
import { OFluiEditItemForm } from "../../Forms/EditItem/EditItem";
import { useLanguage } from "ofluidata-translations";
import { toFieldValidation } from "../../../utilities/oflui";
import { OFluiItemConfig } from "../../../types/config";

export interface OFluiEditItemPanelProps extends OFluiItemConfig, IPanelProps {
    item: any,
    onSave: (item: any) => Promise<void>,
    onLookupSearch?: (column: OFluiColumn, query: string) => Promise<OFluiLookup[]>,
}

interface Validation {
    column: OFluiColumn,
    validation?: OFluiFieldValidation
}

export const OFluiEditItemPanel: React.FunctionComponent<OFluiEditItemPanelProps> = (props) => {
    const { t } = useLanguage(props.lang);
    const [currentItem, setCurrentItem] = React.useState<any>(props.item);
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined);

    const columns = props.columns.filter(r => !r.computed);

    const [validations, setValidations] = React.useState<Validation[]>(columns
        .map(b => {
            return {
                column: b,
                validation: toFieldValidation(b, currentItem[b.name])
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

    const getItem = props.readItem && props.item ?
        (item: any) => props
            .readItem!(item)
        : async (item: any) => item

    React.useEffect(() => {
        let isSubscribed = true;

        if (props.isOpen) {
            getItem(props.item)
                .then(result => (isSubscribed ? setCurrentItem(result) : null))
                .catch(error => (isSubscribed ? setErrorMessage(error.toString()) : null));
        }
        else {
            setCurrentItem(undefined);
        }

        return () => { isSubscribed = false };
    }, [props.isOpen]);

    const saveItem = async () => {
        try {
            await props.onSave(currentItem);
        }
        catch (error) {
            setErrorMessage(error.toString());
        }
    }

    const onDismiss = props.onDismiss ? () => props.onDismiss!() : undefined;

    const renderFooter = () => <>

        {currentItem &&
            <PrimaryButton
                text={t('save')}
                style={{ marginRight: 8 }}
                disabled={!isValid}
                onClick={saveItem}
            />
        }

        {currentItem && onDismiss &&
            <DefaultButton
                text={t('cancel')}
                onClick={onDismiss}
            />
        }
    </>;


    return <>
        <OFluiPanel {...props}
            header={props.header}
            errorMessage={errorMessage}
            isFooterAtBottom={true}
            onRenderFooterContent={renderFooter}>

            {!currentItem && !errorMessage &&
                <Spinner />
            }

            {currentItem &&
                <OFluiEditItemForm {...props}
                    item={currentItem}
                    columns={columns}
                    onUpdated={onUpdated}
                    onValidation={onValidation}
                    onSearch={props.onLookupSearch}
                />
            }
        </OFluiPanel>
    </>;
}
