import fetch from 'node-fetch';

import { generateHeader } from '../shared/auth';
import { BoletoEnvironments } from './environments';
import { BoletoRequest, zBoletoRequest } from './schemas';

export const fetchBoleto = (
	data: BoletoRequest,
	{ merchantId, securityKey }: { merchantId: string; securityKey: string },
	env = BoletoEnvironments.PRODUCTION,
) => {
	const parsedData = zBoletoRequest.parse(data);

	return fetch(env, {
		method: 'POST',
		body: JSON.stringify(parsedData),
		headers: { ...generateHeader(merchantId, securityKey) },
	});
};
