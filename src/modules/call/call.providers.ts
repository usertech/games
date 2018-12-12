import { Connection } from 'mongoose';

import { CallSchema } from './call.schema';
import { CALL_MODEL_PROVIDER, DB_PROVIDER } from '../../constants';

export const callsProviders = [
  {
    provide: CALL_MODEL_PROVIDER,
    useFactory: (connection: Connection) => connection.model('Call', CallSchema),
    inject: [DB_PROVIDER],
  },
];