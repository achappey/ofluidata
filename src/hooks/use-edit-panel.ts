import { useEffect, useState } from "react";

import { validateField } from "../services/ODataMapper";
import { Property } from "../types/OData";
import { useLanguage } from "./use-language";

export const useEditPanel = ((isOpen: boolean,
    properties: Property[],
    onOpened: () => Promise<any>,
    onSave: (item: any) => Promise<void>,
    language?: string) => {

    const { t } = useLanguage(language);
    const [item, setItem] = useState<any | undefined>(undefined);
    const [saving, setSaving] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const isValid = item != undefined && properties
        .map(t => validateField(t, item[t.name]))
        .filter(r => r != undefined).length == 0;

    const saveItem = () => {
        setSaving(true);

        onSave(item)
            .catch(t => {
                setErrorMessage(t.toString());
                setSaving(false);
            })
    };


    useEffect(() => {
        setErrorMessage(undefined);
        setSaving(false);

        if (isOpen) {
            onOpened()
                .then((item: any) => setItem(item))
        }
        else {
            setItem(undefined);
        }

    }, [isOpen]);

    const onChange = (item: any) => setItem(item);

    const isLoading = saving || item == undefined;
    const spinnerText = saving ? t('saving') : t('loading');

    return {
        item,
        isValid,
        errorMessage,
        isLoading,
        spinnerText,
        onChange,
        saveItem, t
    };
});