import * as React from 'react';

import {
    Breadcrumb, DefaultPalette,
    IBreadcrumbItem, Pivot,
    PivotItem, Stack,
    Sticky, StickyPositionType
} from '@fluentui/react';

import { OFluiTilesList } from '../List/TilesList';
import { OFluiTileContent } from '../Content/TileContent';
import { OFluiTilesPageConfig } from '../../../types/config';
import { OFluiTile } from '../../../types/oflui';
import { useLanguage } from 'ofluidata-translations';

export interface OFluiTilesPageProps extends OFluiTilesPageConfig {
}

export const OFluiTilesPage = (props: OFluiTilesPageProps) => {
    const { i18n } = useLanguage(props.lang);
    const [currentTiles, setCurrentTiles] = React.useState<OFluiTile[] | undefined>(undefined);

    const navigateHome = () => setCurrentTiles(undefined);

    const navigate = (index: number) => setCurrentTiles([
        ...currentTiles!.slice(0, index)
    ]);

    const currentTile = currentTiles && currentTiles.length > 0 ? currentTiles[currentTiles.length - 1] : undefined;

    const homeNav = {
        text: props.title ? props.title : 'Home',
        key: 'home',
        onClick: navigateHome
    };

    const onTileClick = (tile: OFluiTile) => {
        setCurrentTiles(currentTiles ? [...currentTiles, tile] : [tile]);
    }

    const headerStyle = {
        paddingBottom: 16,
        paddingLeft: 24,
        paddingRight: 14,
        backgroundColor: DefaultPalette.white
    };

    const changeLanguage = (pivot: PivotItem) => i18n.changeLanguage(pivot.props.headerText!.toLowerCase());

    const pivotContent = i18n
        .languages
        .sort()
        .map(g => <PivotItem
            headerText={g.toUpperCase()}
            key={g}
        />);

    const navigation: IBreadcrumbItem[] =
        currentTiles != undefined ?
            [
                homeNav,
                ...currentTiles
                    .map((d: OFluiTile, c: number) => {
                        return {
                            text: d.title,
                            key: d.title,
                            isCurrentItem: c == currentTiles.length,
                            onClick: () => navigate(c + 1)
                        };
                    })
            ] :
            [
                homeNav
            ];


    const headerContent =
        <Stack horizontal
            style={headerStyle} >
            <Stack.Item grow>
                <Breadcrumb items={navigation} />
            </Stack.Item>
            <Stack.Item>
                <Pivot
                    headersOnly={true}
                    onLinkClick={changeLanguage}>
                    {pivotContent}
                </Pivot>
            </Stack.Item>
        </Stack>;

    return <>
        {props.stickyHeader ?
            <Sticky stickyPosition={StickyPositionType.Header}>
                {headerContent}
            </Sticky> :
            <>
                {headerContent}
            </>
        }

        {currentTile != undefined ?
            <OFluiTileContent
                tile={currentTile}
                onClick={onTileClick}
            /> :
            <OFluiTilesList
                tiles={props.tiles}
                onClick={onTileClick}
            />
        }
    </>;
};
