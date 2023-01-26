import { ServerResponse } from 'http';
import { Data } from '../../../types/types';

export interface ServerData extends ServerResponse, Data {}