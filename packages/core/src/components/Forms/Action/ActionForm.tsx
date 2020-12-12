import * as React from 'react'
import { useState } from 'react'
import { Spinner } from '@fluentui/react'

import { OFluiAction, OFluiColumn, OFluiLookup } from '../../../types/oflui'
import { OFluiEditItemForm } from '../EditItem/EditItem'
import { OFluiDisplayItemForm } from '../DisplayItem/DisplayItemForm'

export type OFluiActionFormProps = {
    sourceItem: any,
    paramsItem?: any;
    action: OFluiAction,
    lang?: string
    onLookupSearch?: (column: OFluiColumn, query: string) => Promise<OFluiLookup[]>,
}

export const OFluiActionForm = (props: OFluiActionFormProps) => {
    const [item, setItem] = useState<any>(props.paramsItem ? props.paramsItem : {})
    const [resultItem, setResultItem] = useState<any | undefined>(undefined)
    const [loadingResult, setLoadingResult] = useState<boolean>(false)

    const onChange = (item: any) => {
        setItem(item)
        setLoadingResult(true)

        props.action
            .onExecute(props.sourceItem, item)
            .then(setResultItem)
            .finally(() => setLoadingResult(false))
    }

    const onValidation = () => {

    }

    return (
        <>
            {props.action.parameters &&
                <OFluiEditItemForm
                    item={item}
                    columns={props.action.parameters.columns}
                    onUpdated={onChange}
                    onSearch={props.onLookupSearch}
                    onValidation={onValidation}
                />
            }

            {loadingResult &&
                <Spinner />
            }

            {!loadingResult && props.action.returnType && resultItem &&
                <OFluiDisplayItemForm
                    item={resultItem}
                    columns={props.action.returnType.columns}
                />
            }

        </>
    )
}
