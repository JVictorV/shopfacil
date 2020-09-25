import * as z from 'zod';

export const zEndereco = z.object({
	cep: z
		.string()
		.length(8)
		.regex(/^\d+$/),
	logradouro: z.string().max(70),
	numero: z.number().max(9999999999),
	complemento: z
		.string()
		.max(20)
		.optional(),
	bairro: z.string().max(50),
	cidade: z.string().max(50),
	uf: z.string().length(2),
});

export const zComprador = z.object({
	nome: z.string().max(40),
	documento: z
		.string()
		.min(11)
		.max(14),
	ip: z
		.string()
		.min(16)
		.max(50)
		.optional(),
	user_agent: z
		.string()
		.max(255)
		.optional(),
	endereco: zEndereco,
});

export const zPedido = z.object({
	numero: z
		.string()
		.max(27)
		.regex(/^[A-Za-z0-9._]*\d+[A-Za-z0-9._-]*$/),
	valor: z.number().max(9999999999999),
	descricao: z.string().max(255),
});

export enum TipoPagamento {
	Boleto = '300',
	Transferencia = '800',
}

export const zRequest = z.object({
	merchant_id: z.string().max(13),
	meio_pagamento: z.nativeEnum(TipoPagamento),
	pedido: zPedido,
	comprador: zComprador,
	token_request_confirmacao_pagamento: z.string().optional(),
});
