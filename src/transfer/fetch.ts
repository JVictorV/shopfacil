import fetch from 'node-fetch';

import { generateHeader } from '../shared/auth';
import { TransferenciaType, zTransferenciaRequest } from './schemas';
import { TransferenciaEnvironments } from './environments';

export const fetchTransferencia = (
	data: TransferenciaType,
	{ merchantId, securityKey }: { merchantId: string; securityKey: string },
	env = TransferenciaEnvironments.PRODUCTION,
) => {
	const parsedData = zTransferenciaRequest.parse(data);

	return fetch(env, {
		method: 'POST',
		body: JSON.stringify(parsedData),
		headers: { ...generateHeader(merchantId, securityKey) },
	});
};
