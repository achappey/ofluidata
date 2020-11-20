import React from 'react'

import {
  CommandBar,
  Image,
  ICommandBarProps,
  SearchBox
} from '@fluentui/react'

import {
  commandBarImageKey,
  commandBarSearchBoxKey,
  useCommandBar
} from './use-CommandBar'

import { OFluiButton, OFluiView } from '../../types/oflui'

export interface OFluiCommandBarProps extends ICommandBarProps {
  views?: OFluiView[],
  defaultView?: string,
  image?: string,
  filterButton?: OFluiButton,
  onSearch?: (query: string) => void,
  onViewChange?: (view?: OFluiView) => void,
  onOffsetChange?: (offset: number) => void,
}

export const OFluiCommandBar = (props: OFluiCommandBarProps) => {
  const {
    items,
    farItems,
    onSearch,
    onSearchCleared
  } = useCommandBar(props)

  const commandBarItems = items.map(g => {
    return {
      ...g,
      onRender: g.key === commandBarSearchBoxKey
        ? () => <>
          <style>
            {`.ofluiCommandBar .ms-SearchBox { height: auto }
              .ofluiCommandBar .ms-Image { margin-right: 4px }`}
          </style>

          <SearchBox
            onSearch={onSearch}
            onClear={onSearchCleared}
          />
        </>
        : g.key === commandBarImageKey
          ? () =>
            <Image
              src={props.image!}
              height={44}
            />
          : g.onRender
    }
  })

  return <CommandBar {...props}
    className={'ofluiCommandBar'}
    items={commandBarItems}
    farItems={farItems}
  />
}
