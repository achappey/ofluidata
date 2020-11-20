import { useState } from 'react'

import dayjs from 'dayjs'

import { ICommandBarItemProps, IIconProps } from '@fluentui/react'

import { useLanguage } from '@ofluidata/translations'
import { OFluiButton, OFluiView } from '../../types/oflui'
import { OFluiCommandBarProps } from './CommandBar'

export const commandBarSearchBoxKey = 'oflui_searchbox'
export const commandBarImageKey = 'oflui_image'

const toIconProps = (icon?: string): IIconProps | undefined => {
  return icon ? {
    iconName: icon
  } : undefined;
}


const toCommandBarButton = (button: OFluiButton): ICommandBarItemProps => {
  return {
    ...button,
    iconOnly: button.text == undefined,
    iconProps: toIconProps(button.icon)
  }
}

const addSearch = (items: ICommandBarItemProps[]) => {
  return [
    {
      key: commandBarSearchBoxKey
    },
    ...items]
}

const addImage = (items: ICommandBarItemProps[]) => {
  return [
    {
      key: commandBarImageKey
    },
    ...items]
}

export const getDefaultView = (views?: OFluiView[], defaultView?: string) => {
  const hasViews = views !== undefined && views.length > 0

  return defaultView !== undefined && hasViews
    ? views!.find(f => f.id === defaultView)
    : hasViews ? views![0] : undefined
}

export const useCommandBar = (props: OFluiCommandBarProps) => {
  const { t } = useLanguage(props.lang)
  const defaultView = getDefaultView(props.views, props.defaultView)

  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
  const [currentView, setCurrentView] = useState<string | undefined>(
    defaultView != null
      ? defaultView.key
      : undefined)

  const [offset, setOffset] = useState<number | undefined>(defaultView?.dynamicDate?.offset)

  const withSearch = props.onSearch ? addSearch(props.items) : props.items
  const items = props.image ? addImage(withSearch) : withSearch

  const findView = (key: string) => props.views?.find(f => f.key === key)

  const changeView = (key: string) => {
    if (currentView !== key) {
      setCurrentView(key)

      setOffset(findView(key)?.dynamicDate?.offset)

      if (props.onViewChange !== undefined) {
        props.onViewChange(
          findView(key)
        )
      }
    }
  }

  const changeOffset = (offset: number) => {
    setOffset(offset)

    if (props.onOffsetChange !== undefined) {
      props.onOffsetChange(offset)
    }
  }

  const farItemViews: ICommandBarItemProps[] = props.views !== undefined
    ? props.views.map(v => {
      return {
        ...v,
        iconProps: currentView === v.key
          ? {
            iconName: 'CheckMark'
          }
          : v.iconProps,
        onClick: () => changeView!(v.key)
      }
    })
    : []

  const viewItems: ICommandBarItemProps[] | undefined =
    searchQuery !== undefined
      ? [{
        key: 'search',
        iconProps:
        {
          iconName: 'Search'
        },
        text: t('searching',
          {
            query: searchQuery
          })
      }]
      : currentView !== undefined
        ? [{
          key: currentView,
          iconProps: {
            iconName: 'List'
          },
          text: findView(currentView)?.dynamicDate && offset !== undefined
            ? `${findView(currentView)?.text}: ${dayjs().add(offset, 'month').format('MMMM YYYY')}`
            : findView(currentView)?.text,
          subMenuProps:
            farItemViews.length > 1
              ? {
                items: farItemViews
              }
              : undefined
        }]
        : []

  if (props.onOffsetChange && currentView && offset !== undefined) {
    viewItems.unshift({
      key: 'previous',
      iconProps:
      {
        iconName: 'ChevronLeft'
      },
      onClick: () => changeOffset(offset - 1),
      iconOnly: true
    })

    viewItems.push({
      key: 'next',
      iconProps:
      {
        iconName: 'ChevronRight'
      },
      onClick: () => changeOffset(offset + 1),
      iconOnly: true
    })
  }

  if (props.filterButton) {
    viewItems.push(toCommandBarButton(props.filterButton));
  }

  const onSearch = (query: string) => {
    setSearchQuery(query)

    props.onSearch!(query)
  }

  const onSearchCleared = () => {
    setSearchQuery(undefined)

    if (props.onViewChange !== undefined) {
      props.onViewChange(
        currentView !== undefined
          ? findView(currentView)
          : undefined
      )
    }
  }

  const farItems = viewItems.length > 0 ? viewItems : undefined

  return {
    items,
    farItems,
    onSearch,
    onSearchCleared
  }
}
