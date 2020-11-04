
import * as React from 'react';
import { HttpService } from '../services/HttpService';

const HttpContext = React.createContext(new HttpService());

export default HttpContext;