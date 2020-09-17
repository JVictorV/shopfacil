interface IAuthorizationHeader {
	Authorization: string;
	'Content-Type': string;
}

export const generateHeader = (merchantId: string, securityKey: string): IAuthorizationHeader => {
	const base64 = Buffer.from(`${merchantId}:${securityKey}`).toString('base64');
	return {
		Authorization: `Basic ${base64}`,
		'Content-Type': 'application/json',
	};
};
