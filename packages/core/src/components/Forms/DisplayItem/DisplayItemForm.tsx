import * as React from 'react';
import { IStackItemStyles, Label, Link, Stack } from '@fluentui/react';

import { OFluiDisplayField } from '../../Fields/DisplayField';
import { useLanguage } from 'ofluidata-translations';
import { OFluiColumnGroup } from '../../../types/oflui';


export type OFluiDisplayItemFormProps = {
    item: any;
    groups: OFluiColumnGroup[],
    onEdit?: (group: OFluiColumnGroup) => void,
    lang?: string
}

const stackItemLabelStyles: IStackItemStyles = {
    root: {
        width: "25%",
    },
};

const stackItemValueStyles: IStackItemStyles = {
    root: {
        width: "60%",
    },
};

const stackItemEditStyles: IStackItemStyles = {
    root: {
        width: "15%",
        textAlign: "end"
    },
};


const valueStyles = {
    paddingTop: 5,
    paddingBottom: 5
};

export const OFluiDisplayItemForm = (props: OFluiDisplayItemFormProps) => {
    const { t } = useLanguage(props.lang);

    const content = props.item != undefined ? props.groups.map(g => {
        const onEdit = props.onEdit ? () => props.onEdit!(g) : undefined;

        return <Stack.Item key={g.name}>
            <Stack>
                {g.columns.map((h, i) => {
                    return <Stack.Item key={h.name}>
                        <Stack horizontal>
                            <Stack.Item styles={stackItemLabelStyles}>
                                <Label>
                                    {h.name}
                                </Label>
                            </Stack.Item>
                            <Stack.Item styles={stackItemValueStyles}>
                                <div style={valueStyles}>

                                    <OFluiDisplayField
                                        value={props.item[h.name]}
                                        property={h} />

                                </div>
                            </Stack.Item>
                            <Stack.Item styles={stackItemEditStyles}>
                                {i == 0 && onEdit &&
                                    <div style={valueStyles}>
                                        <Link onClick={onEdit}>
                                            {t('edit')}
                                        </Link>
                                    </div>
                                }
                            </Stack.Item>
                        </Stack>
                    </Stack.Item>;
                })}
            </Stack>
        </Stack.Item>
    }) : <></>;

    return (
        <Stack>
            {content}
        </Stack>
    );
};
