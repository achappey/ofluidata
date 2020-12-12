import * as React from 'react'
import {
    AnimationClassNames, Link,
    Image, ImageFit, FontIcon
} from '@fluentui/react'
import { Tile } from '@uifabric/experiments'

export type OFluiTileItemProps = {
    title: string,
    image?: string,
    icon?: string,
    url?: string,
    onClick?: () => void
}

export const OFluiTileItem = (props: OFluiTileItemProps) => {
    const nameplate = <>
        {props.title}
    </>

    const foreground = props.icon
        ? <FontIcon iconName={props.icon} />
        : props.image
            ? <Image
                imageFit={ImageFit.none}
                src={props.image}
                style={{ height: 41 }}
            />
            : <></>

    const linkProps = props.url
        ? {
            href: props.url,
            target: 'parent'
        }
        : {
            onClick: props.onClick
        }

    return (
        <Link {...linkProps} >
            <Tile tileSize={'large'}
                foreground={foreground}
                className={AnimationClassNames.fadeIn400}
                itemName={nameplate}
            />
        </Link>
    )
}
