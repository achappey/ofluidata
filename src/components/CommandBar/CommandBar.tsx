
import * as React from 'react';

import {
    CommandBar, ICommandBarItemProps,
    SearchBox, Image
} from '@fluentui/react';

import useCommandBar from './use-CommandBar';
import { View } from '../../types/OFlui';

export type OFluiCommandBarProps = {
    items: ICommandBarItemProps[],
    views?: View[],
    defaultView?: string,
    language?: string,
    image?: string,
    onSearch?: (query: string) => void,
    onViewChange?: (view: View | undefined) => void,
}

export const OFluiCommandBar = (props: OFluiCommandBarProps) => {
    const { farItems,
        onSearchCleared,
        onSearch } = useCommandBar(props.views,
            props.defaultView,
            props.language,
            props.onSearch,
            props.onViewChange);

    const withSearch = props.onSearch != undefined ?
        [
            {
                key: "search",
                onRender: () => <>
                    <style>
                        {`.ofluiCommandBar .ms-SearchBox { height: auto }
                          .ofluiCommandBar .ms-Image { margin-right: 4px }`}
                    </style>
                    <SearchBox
                        onSearch={onSearch}
                        onClear={onSearchCleared}
                    />
                </>
            },
            ...props.items
        ] : props.items;

    const withImage = props.image != undefined ?
        [
            {
                key: "image",
                onRender: () => <Image
                    src={props.image!}
                    width={44} />

            },
            ...withSearch
        ] : withSearch;

    return (
        <CommandBar
            items={withImage}
            farItems={farItems}
            className={"ofluiCommandBar"}
        />
    );
};
