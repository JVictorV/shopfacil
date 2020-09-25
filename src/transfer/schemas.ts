import * as z from 'zod';
import { zRequest } from '../shared/schemas';

export const zTransferenciaRequest = zRequest;
export type TransferenciaType = z.infer<typeof zTransferenciaRequest>;
