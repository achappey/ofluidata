import * as React from 'react'

export interface OFluiErrorMessageProps {
    message: string
}

export const OFluiErrorMessage = (props: OFluiErrorMessageProps) => {
    const style = {
        fontSize: 12,
        color: 'rgb(164, 38, 44)',
        fontWeight: 400,
        paddingTop: 5,
        margin: 0,
        display: 'flex',
        alignItems: 'center'
    }

    return <span>
        <div>
            <p style={style}>
                <span>
                    {props.message}
                </span>
            </p>
        </div>
    </span>
}
