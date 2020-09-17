import z from 'zod';
import fetch from 'node-fetch';
import { BilletEnviroments } from './billetEnviroments';
import { generateHeader } from './auth';

const zPedido = z.object({
	numero: z
		.string()
		.max(27)
		.regex(/^[A-Za-z0-9._]*\d+[A-Za-z0-9._-]*$/),
	valor: z.number().max(9999999999999),
	descricao: z.string().max(255),
});

const zEndereco = z.object({
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

const zComprador = z.object({
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

const zBoletoInstrucoes = z.object({
	instrucao_linha_1: z
		.string()
		.max(60)
		.optional(),
	instrucao_linha_2: z
		.string()
		.max(60)
		.optional(),
	instrucao_linha_3: z
		.string()
		.max(60)
		.optional(),
	instrucao_linha_4: z
		.string()
		.max(60)
		.optional(),
	instrucao_linha_5: z
		.string()
		.max(60)
		.optional(),
	instrucao_linha_6: z
		.string()
		.max(60)
		.optional(),
	instrucao_linha_7: z
		.string()
		.max(60)
		.optional(),
	instrucao_linha_8: z
		.string()
		.max(60)
		.optional(),
	instrucao_linha_9: z
		.string()
		.max(60)
		.optional(),
	instrucao_linha_10: z
		.string()
		.max(60)
		.optional(),
	instrucao_linha_11: z
		.string()
		.max(60)
		.optional(),
	instrucao_linha_12: z
		.string()
		.max(60)
		.optional(),
});

export enum TipoInscricaoPagador {
	CPF = '01',
	CNPJ = '02',
}

const zBoletoRegistro = z.object({
	controle_participante: z
		.string()
		.max(25)
		.optional(),
	qtde_parcelas: z
		.string()
		.max(2)
		.optional(),
	qtde_dias_multa: z
		.number()
		.max(99)
		.optional(),
	aplicar_multa: z.boolean().optional(),
	valor_percentual_multa: z
		.number()
		.max(9999)
		.optional(),
	valor_multa: z.number().optional(),
	valor_desconto_bonificacao: z
		.number()
		.max(9999999999)
		.optional(),
	tipo_ocorrencia: z
		.string()
		.max(3)
		.optional(),
	especie_titulo: z
		.string()
		.max(2)
		.optional(),
	qtde_dias_juros: z
		.number()
		.max(99)
		.optional(),
	valor_juros_mora: z
		.number()
		.max(9999999999999)
		.optional(),
	Percentual_juros_mora: z
		.string()
		.max(8)
		.optional(),
	data_limite_desconto: z
		.string()
		.length(10)
		.regex(/^\d{4}-\d{2}-\d{2}$/),
	valor_desconto: z
		.number()
		.max(99999999)
		.optional(),
	tipo_inscricao_pagador: z.nativeEnum(TipoInscricaoPagador).optional(),
});

export enum TipoRenderizacao {
	HTML,
	PDF_SCREEN,
	PDF,
}

const zBoleto = z.object({
	beneficiario: z.string().max(150),
	carteira: z.string().length(2),
	nosso_numero: z
		.string()
		.min(3)
		.max(11),
	data_emissao: z
		.string()
		.length(10)
		.regex(/^\d{4}-\d{2}-\d{2}$/),
	data_vencimento: z
		.string()
		.length(10)
		.regex(/^\d{4}-\d{2}-\d{2}$/),
	valor_titulo: z.number().max(9999999999999),
	url_logotipo: z
		.string()
		.url()
		.max(255)
		.optional(),
	mensagem_cabecalho: z
		.string()
		.max(200)
		.optional(),
	tipo_renderizacao: z.nativeEnum(TipoRenderizacao).optional(),
	instrucoes: zBoletoInstrucoes.optional(),

	registro: zBoletoRegistro.optional(),
});

const zBoletoRequest = z.object({
	merchant_id: z.string().max(13),
	meio_pagamento: z.string(),
	pedido: zPedido,
	comprador: zComprador,
	boleto: zBoleto,
	token_request_confirmacao_pagamento: z.string().optional(),
});

export type BoletoRequest = z.infer<typeof zBoletoRequest>;

export const fetchBillet = (
	data: BoletoRequest,
	{ merchantId, securityKey }: { merchantId: string; securityKey: string },
	env = BilletEnviroments.PRODUCTION,
) => {
	const parsedData = zBoletoRequest.parse(data);

	return fetch(env, {
		method: 'POST',
		body: JSON.stringify(parsedData),
		headers: { ...generateHeader(merchantId, securityKey) },
	});
};
