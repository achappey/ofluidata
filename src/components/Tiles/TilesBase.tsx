import * as React from 'react';
import {
    Breadcrumb, DefaultPalette,
    Pivot, PivotItem, Stack, Sticky, StickyPositionType
} from '@fluentui/react';
import { ITilesGridSegment, TilesGridMode, TilesList } from '@uifabric/experiments';

import useTiles from './use-Tiles';
import { OFluiTilesWrapperProps } from './TilesWrapper';
import { DataService } from '../../services/DataService';
import { EntityType, ODataConfig } from '../../types/OData';
import { OFluiTile } from './Tile';
import { OFluiListBase } from '../List/ListBase';

export interface OFluiTilesBaseProps extends OFluiTilesWrapperProps {
    config: ODataConfig
}

export const OFluiTilesBase = (props: OFluiTilesBaseProps) => {
    const service = new DataService(props.http, props.url, props.config);

    const { languages,
        entitySets,
        currentEntityType,
        tilesOptions,
        navigation,
        listOptions,
        onTileClick } = useTiles(service, props.options);

    const pivotContent = languages.map(g => {
        return <PivotItem headerText={g} key={g} />;
    });

    const tileItems = entitySets.map(r => {
        const onClick = () => onTileClick(r);

        return {
            key: r.name!,
            content: r,
            onRender: (z: any) => <OFluiTile
                title={z.entitySets![0].name!.replaceAll("_", " ")}
                onClick={onClick}
            />
        }
    });


    const tiles: ITilesGridSegment<EntityType>[] = [{
        minRowHeight: 96,
        key: "tiles",
        minAspectRatio: 2,
        spacing: 7,
        marginBottom: 7,
        mode: TilesGridMode.fill,
        items: tileItems
    }]

    const headerContent = <Stack horizontal
        style={{
            paddingBottom: 16,
            backgroundColor: DefaultPalette.white
        }} >
        <Stack.Item grow>
            <Breadcrumb items={navigation} />
        </Stack.Item>
        <Stack.Item>
            <Pivot headersOnly={true}>
                {pivotContent}
            </Pivot>
        </Stack.Item>
    </Stack>;

    return (
        <>
            {tilesOptions.stickyHeader ?
                <Sticky stickyPosition={StickyPositionType.Header}>
                    {headerContent}
                </Sticky>
                :
                <>
                    {headerContent}
                </>
            }

            {currentEntityType != undefined
                ? <OFluiListBase {...props}
                    options={listOptions}
                    entityType={currentEntityType.typeName!} />
                :
                <TilesList items={tiles} />
            }
        </>
    );
};
