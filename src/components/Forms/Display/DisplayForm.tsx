import * as React from 'react';
import { IStackItemStyles, Label, Link, Stack } from '@fluentui/react';

import { OFluiPropertyGroup } from '../../../types/OFlui';
import { OFluiDisplayField } from '../../Fields/DisplayField';
import { useLanguage } from '../../../hooks/use-language';


export type OFluiDisplayFormProps = {
    item: any;
    groups: OFluiPropertyGroup[],
    onEdit: (group: OFluiPropertyGroup) => void,
    language?: string
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

export const OFluiDisplayForm = (props: OFluiDisplayFormProps) => {
    const { t } = useLanguage(props.language);

    const content = props.item != undefined ? props.groups.map(g => {
        const onEdit = () => props.onEdit(g);

        return <Stack.Item>
            <Stack>
                {g.properties.map((h, i) => {
                    return <Stack.Item>
                        <Stack horizontal>
                            <Stack.Item styles={stackItemLabelStyles}>
                                <Label>
                                    {h.name}
                                </Label>

                            </Stack.Item>
                            <Stack.Item styles={stackItemValueStyles}>
                                <OFluiDisplayField
                                    value={props.item[h.name]}
                                    property={h} />
                            </Stack.Item>
                            <Stack.Item styles={stackItemEditStyles}>
                                {i == 0 &&
                                    <Link onClick={onEdit}>
                                        {t('edit')}
                                    </Link>}
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
