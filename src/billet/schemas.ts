import z from 'zod';
import { zRequest } from '../shared/schemas';

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

export const zBoletoRequest = zRequest.extend({
	boleto: zBoleto,
});

export type BoletoRequest = z.infer<typeof zBoletoRequest>;
