import { IBreadcrumbItem } from "@fluentui/react";
import { useState } from "react";
import { useLanguage } from "../../hooks/use-language";
import { DataService } from "../../services/DataService";
import { tileOptions, toListOptions } from "../../services/OFluiMapper";
import { EntityType } from "../../types/OData";
import { OFluiTilesOptions } from "../../types/OFlui";

export default (service: DataService,
    options?: OFluiTilesOptions) => {

    const tilesOptions = tileOptions(options);
    const listOptions = toListOptions(options);

    const { t, i18n } = useLanguage(tilesOptions.language);

    const [currentEntityType, setCurrentEntityType] = useState<EntityType | undefined>(undefined);

    const entitySets = service
        .getEntities()
        .filter(r => r.entitySets!.length > 0);

    const languages = i18n.languages;

    const onTileClick = (entityType: EntityType) => setCurrentEntityType(entityType);

    const navigateHome = () => setCurrentEntityType(undefined);

    const homeNav = {
        text: 'Home',
        key: 'Home',
        onClick: navigateHome
    };

    const navigation: IBreadcrumbItem[] = currentEntityType != undefined ? [
        homeNav,
        {
            text: currentEntityType.entitySets![0].name!,
            key: currentEntityType.typeName!,
            isCurrentItem: true
        },
    ] : [homeNav];

    return {
        entitySets,
        languages,
        tilesOptions,
        listOptions,
        navigation,
        currentEntityType,
        navigateHome,
        onTileClick, t
    }

}