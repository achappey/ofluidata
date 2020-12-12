
import * as React from 'react'
import { ODataConfig } from '../types/odata'

const ODataContext = React.createContext<ODataConfig | undefined>(undefined)

export default ODataContext
