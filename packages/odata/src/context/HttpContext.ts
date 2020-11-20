
import * as React from 'react';
import { HttpService } from '../common/httpService';
import { OFluiHttpClient } from '../types/http';

const HttpContext = React.createContext<OFluiHttpClient>(new HttpService());

export default HttpContext;