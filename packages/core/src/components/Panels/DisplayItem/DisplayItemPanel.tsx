import * as React from 'react'

import { IPanelProps, Spinner } from '@fluentui/react'

import { OFluiDisplayItemForm } from '../../Forms/DisplayItem/DisplayItemForm'
import { OFluiPanel } from '../Panel/Panel'
import { OFluiItemConfig } from '../../../types/config'
import { OFluiColumn, OFluiColumnGroup } from '../../../types/oflui'
import { actionToButton } from '../../../utilities/oflui'
import { useLanguage } from 'ofluidata-translations'

export interface OFluiDisplayItemPanelProps extends OFluiItemConfig, IPanelProps {
    item: any
    onEdit?: (group: OFluiColumnGroup) => void
}

export const OFluiDisplayItemPanel: React.FunctionComponent<OFluiDisplayItemPanelProps> = (props: OFluiDisplayItemPanelProps) => {
    const [item, setItem] = React.useState<any | undefined>(undefined)
    const [errorMessage, setErrorMessage] = React.useState<any | undefined>(undefined)
    const [deleting, setDeleting] = React.useState<boolean>(false)

    const [lookupItem, setLookupItem] = React.useState<any | undefined>(undefined)
    const [lookupItemForm, setLookupItemForm] = React.useState<any | undefined>(undefined)
    const getItem = props.readItem
        ? (item: any) => props
            .readItem!(item)
        : async (item: any) => item

    const { t } = useLanguage(props.lang)

    React.useEffect(() => {
        let isSubscribed = true

        if (props.isOpen) {
            getItem(props.item)
                .then(result => (isSubscribed ? setItem(result) : null))
                .catch(error => (isSubscribed ? setErrorMessage(error.toString()) : null))
        } else {
            setItem(undefined)
        }

        return () => { isSubscribed = false }
    }, [props.isOpen])

    const onDismissLookupForm = () => {
        setLookupItem(undefined)
        setLookupItemForm(undefined)
    }

    const onLookupItemClick = (val: any, column: OFluiColumn) => {
        setLookupItem(val)
        setLookupItemForm(column.getForm!(val))
    }

    const buttons = props.actions
        ? props.actions.map(actionToButton)
            .map(b => {
                return {
                    ...b,
                    onClick: () => {
                        props.onAction!(props.actions!.find(a => a.name === b.text)!, item)
                    }
                }
            })
        : []

    if (props.deleteItem) {
        buttons.push({
            key: 'delete',
            icon: 'Delete',
            onClick: () => {
                setDeleting(true)

                props.deleteItem!(item)
                    .catch(f => setErrorMessage(f.toString()))
                    .finally(() => setDeleting(false))
            }
        })
    }

    return <>
        <OFluiPanel {...props}
            header={props.header}
            isOpen={props.isOpen && !lookupItem}
            buttons={item !== undefined ? buttons : undefined}
            errorMessage={errorMessage}>

            {item === undefined && !errorMessage &&
                <Spinner />
            }

            {deleting &&
                <Spinner label={t('deleting')} />
            }

            {!deleting && item !== undefined &&

                <OFluiDisplayItemForm {...props}
                    groups={props.groups}
                    item={item}
                    onEdit={props.onEdit}
                    onColumnClick={onLookupItemClick}
                />
            }
        </OFluiPanel>

        {
            lookupItem &&
            <OFluiDisplayItemPanel {...lookupItemForm}
                isOpen={true}
                onDismiss={onDismissLookupForm}
            />
        }
    </>
}
