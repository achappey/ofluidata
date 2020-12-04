import * as React from "react";

import {
    IProgressIndicatorProps,
    ProgressIndicator,
} from "@fluentui/react";

export interface OFluiProgressIndicatorProps extends IProgressIndicatorProps {
    onCompleted: () => void
    itemAction: (item: any) => Promise<void>,
    items?: any[],
}


export const OFluiProgressIndicator = (props: OFluiProgressIndicatorProps) => {
    //  const [percentComplete, setPercentComplete] = React.useState<number | undefined>(undefined);
    const [processedItemCount, setProcessedItemCount] = React.useState<number>(0);


    React.useEffect(() => {
        let isSubscribed = true;

        const processItems = async (items: any[]) => {
            for (let i = 0; i < items.length; i++) {
                if (isSubscribed) {
                    await props.itemAction(items[i]);

                    setProcessedItemCount(i + 1);
                }
            }

            props.onCompleted();
        }

        if (props.items == undefined)
            setProcessedItemCount(0)
        else {
            processItems(props.items);
        }

        return () => { isSubscribed = false };
    }, [props.items]);

    const percentComplete = props.items ? processedItemCount / props.items.length : undefined;
    const description = props.items ? `${processedItemCount}/${props.items.length}` : ``;

    return <>
        {percentComplete != undefined &&
            <ProgressIndicator {...props}
                description={description}
                percentComplete={percentComplete}
            />
        }
    </>
}


