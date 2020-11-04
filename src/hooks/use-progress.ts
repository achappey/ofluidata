import { useState } from "react";
import { IProgressIndicatorProps } from "@fluentui/react";

export const useProgress = () => {
    const [progressIndicator, setProgressIndicator] = useState<IProgressIndicatorProps | undefined>(undefined);

    const updateProgress = (description: string, counter: number, total: number) => {
        setProgressIndicator({
            label: description,
            percentComplete: counter / total,
            description: `${counter}/${total}`
        });
    }

    const processItems = async (description: string, items: any[], itemAction: (item: any) => Promise<void>) => {
        const errorMap: { [id: string]: any[]; } = {};

        updateProgress(description, 0, items.length);

        for (let i = 1; i <= items.length; i++) {
            const item = items[i - 1];

            await itemAction(item)
                .then(_g => updateProgress(description, i, items.length))
                .catch(error => {
                    updateProgress(description, i, items.length);

                    const errorMessage = error.toString();

                    if (errorMap[errorMessage])
                        errorMap[errorMessage].push(item);
                    else {
                        errorMap[errorMessage] = [item];
                    }
                });
        }

        setProgressIndicator(undefined);

        return Object.keys(errorMap).length > 0
            ? errorMap
            : undefined;
    }

    return {
        progressIndicator,
        processItems
    };
};