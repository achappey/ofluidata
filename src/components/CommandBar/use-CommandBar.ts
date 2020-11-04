import { useState } from 'react';
import { ICommandBarItemProps } from '@fluentui/react';
import { toCommandBarItems } from '../../services/OFluiMapper';
import { View } from '../../types/OFlui';
import { useLanguage } from '../../hooks/use-language';

const getDefaultView = (views?: View[], defaultView?: string) => {
    const hasViews = views != undefined && views.length > 0;

    return defaultView != undefined && hasViews ?
        views!.find(f => f.id == defaultView)
        : hasViews ? views![0] : undefined;
};

export default (views?: View[],
    defaultViewKey?: string,
    language?: string,
    search?: (query: string) => void,
    viewChange?: (view: View | undefined) => void) => {
    const { t } = useLanguage(language);
    const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
    const defaultView = getDefaultView(views, defaultViewKey);
    const [currentView, setCurrentView] = useState<string | undefined>(defaultView != null ? defaultView.id : undefined);

    const changeView = (viewId: string) => {
        if (currentView != viewId) {
            setCurrentView(viewId);

            if (viewChange != undefined) {
                viewChange(views!.find(f => f.id == viewId));
            }
        }
    };

    const farItemViews: ICommandBarItemProps[] = views != undefined ? toCommandBarItems(views).map(v => {
        return {
            ...v,
            onClick: () => changeView(v.key)
        }
    }) : [];

    const farItems: ICommandBarItemProps[] | undefined = searchQuery != undefined ? [{
        key: "search",
        text: t('searching', { query: searchQuery })
    }] : currentView != undefined ? [{
        key: currentView,
        text: views!.find(f => f.id == currentView)!.name,
        subMenuProps: farItemViews.length > 1 ? {
            items: farItemViews
        } : undefined
    }] : undefined;

    const onSearch = (query: string) => {

        setSearchQuery(query);

        search!(query);
    }

    const onSearchCleared = () => {
        setSearchQuery(undefined);

        if (viewChange != undefined) {
            viewChange(currentView != undefined ? views!.find(f => f.id == currentView)! : undefined);
        }
    };

    return {
        farItems,
        searchQuery,
        onSearch,
        onSearchCleared

    };
}