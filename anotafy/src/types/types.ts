export interface Empresa {
    id: number;
    razao_social: string;
    nome_fantasia: string | null;
    cnpj_raiz: string | null;
    data_fundacao: string | null;
    cnae_principal: string | null;
    telefone_principal: string;
    email_principal: string;
    website: string | null;
    logo_url: string | null;
    status: StatusEmpresa;
    data_cadastro: Date;
    data_atualizacao: Date;
}

export interface CreateUsuario {
    nome: string;
    codigo_identificacao: string;
    login: string;
    senha: string;
    unidade_id: number;
}

export interface CreateUnidade {
    nome: string;
    tipo_unidade: TipoUnidade;
    email: string;
    telefone: string;
    cnpj?: string | null;
    cep?: string | null;
    logradouro?: string | null;
    numero?: string | null;
    complemento?: string | null;
    bairro?: string | null;
    cidade?: string | null;
    estado?: string | null;
    codigo_ibge_municipio?: string | null;
    data_abertura?: string | null;
    empresa_id: number;
    matriz_id?: number | null;
}

export interface CreateEmpresa {
    razao_social: string;
    nome_fantasia?: string | null;
    cnpj_raiz?: string | null;
    data_fundacao?: string | null;
    cnae_principal?: string | null;
    telefone_principal: string;
    email_principal: string;
    website?: string | null;
    logo_url?: string | null;
}

export interface UpdateEmpresaInput extends Partial<Empresa> {
    id: number;
}

export interface Unidade {
    id: number;
    matriz_id: number | null;
    nome: string;
    tipo_unidade: TipoUnidade;
    cnpj: string | null;
    cep: string | null;
    logradouro: string | null;
    numero: string | null;
    complemento: string | null;
    bairro: string | null;
    cidade: string | null;
    estado: string | null;
    codigo_ibge_municipio: string | null;
    telefone: string;
    email: string;
    status: StatusUnidade;
    data_abertura: string | null;
    data_cadastro: Date;
    data_atualizacao: Date;
    empresa_id: number;

    // Relacionamentos (opcionais para queries)
    matriz?: Unidade | null;
    filiais?: Unidade[];
    empresa?: Empresa;
    categorias?: Categoria[];
    usuarios?: Usuario[];
    mesas?: Mesa[];
}

export interface CreateUnidadeInput {
    matriz_id?: number | null;
    nome: string;
    tipo_unidade: TipoUnidade;
    cnpj?: string | null;
    cep?: string | null;
    logradouro?: string | null;
    numero?: string | null;
    complemento?: string | null;
    bairro?: string | null;
    cidade?: string | null;
    estado?: string | null;
    codigo_ibge_municipio?: string | null;
    telefone?: string | null;
    email?: string | null;
    status?: StatusUnidade;
    data_abertura?: string | null;
    empresa_id: number;
}

export interface UpdateUnidadeInput extends Partial<CreateUnidadeInput> {
    id: number;
}

// types/categoria.ts
export interface Categoria {
    id: number;
    nome: string;
    descricao: string | null;
    data_cadastro: Date;
    data_atualizacao: Date;
    pai_id: number | null;
    unidade_id: number;
    status: YesNo;

    // Relacionamentos
    pai?: Categoria | null;
    filhos?: Categoria[];
    unidade?: Unidade;
    produtos?: Produto[];
}

export interface CreateCategoriaInput {
    nome: string;
    descricao?: string | null;
    pai_id?: number | null;
    unidade_id: number;
}

export interface UpdateCategoriaInput extends Partial<CreateCategoriaInput> {
    id: number;
}

// Para árvore de categorias
export interface CategoriaWithChildren extends Categoria {
    filhos?: CategoriaWithChildren[];
}

// types/produto.ts
export interface Produto {
    id: number;
    nome: string;
    descricao: string | null;
    preco: number | string; // Decimal do Prisma vira string no JSON
    status: YesNo;
    data_cadastro: Date;
    data_atualizacao: Date;
    categoria_id: number;

    // Relacionamentos
    categoria?: Categoria;
    itens_comanda?: ItemComanda[];
}

export interface CreateProdutoInput {
    nome: string;
    descricao?: string | null;
    preco: number | string;
    status?: YesNo;
    categoria_id: number;
}

export interface UpdateProdutoInput extends Partial<CreateProdutoInput> {
    id: number;
}

// Para exibição em listas com categoria
export interface ProdutoWithCategoria extends Produto {
    categoria: Categoria;
}

// types/usuario.ts
export interface Usuario {
    id: number;
    nome: string;
    status: YesNo;
    codigo_identificacao: string;
    login: string;
    senha: string;
    data_cadastro: Date;
    data_atualizacao: Date;
    unidade_id: number;

    // Relacionamentos
    unidade?: Unidade;
    itens_comanda?: ItemComanda[];
}

export interface CreateUsuarioInput {
    nome: string;
    status?: YesNo;
    codigo_identificacao: string;
    login: string;
    senha: string;
    unidade_id: number;
}

export interface UpdateUsuarioInput extends Partial<CreateUsuarioInput> {
    id: number;
}

// Para login (sem senha)
export interface UsuarioSafe {
    id: number;
    nome: string;
    status: YesNo;
    codigo_identificacao: string;
    login: string;
    data_cadastro: Date;
    unidade_id: number;
    unidade?: Unidade;
}

// types/mesa.ts
export interface Mesa {
    id: number;
    identificacao: string;
    capacidade: number | null;
    status: StatusMesa;
    data_cadastro: Date;
    data_atualizacao: Date;
    unidade_id: number;

    // Relacionamentos
    unidade?: Unidade;
    comandas?: Comanda[];
}

export interface CreateMesaInput {
    identificacao: string;
    capacidade?: number | null;
    status?: StatusMesa;
    unidade_id: number;
}

export interface UpdateMesaInput extends Partial<CreateMesaInput> {
    id: number;
}

// Para dashboard com contagem de comandas
export interface MesaWithComandaCount extends Mesa {
    _count?: {
        comandas: number;
    };
}

// types/comanda.ts
export interface Comanda {
    id: number;
    pessoas: number | null;
    hora_abertura: Date;
    hora_fechamento: Date | null;
    status: StatusComanda;
    data_cadastro: Date;
    data_atualizacao: Date;
    mesa_id: number;

    // Relacionamentos
    mesa?: Mesa;
    itens_comanda?: ItemComanda[];
}

export interface CreateComandaInput {
    pessoas?: number | null;
    hora_abertura?: Date;
    status?: StatusComanda;
    mesa_id: number;
}

export interface UpdateComandaInput extends Partial<CreateComandaInput> {
    id: number;
    hora_fechamento?: Date | null;
}

// Para detalhes da comanda
export interface ComandaWithDetails extends Comanda {
    mesa: Mesa;
    itens_comanda: ItemComandaWithProduto[];
    total: number;
}

// types/item-comanda.ts
export interface ItemComanda {
    id: number;
    comanda_id: number;
    usuario_id: number | null;
    produto_id: number;
    preco_unitario: number | string; // Decimal
    quantidade: number;
    observacao: string | null;
    status_item: StatusItem;
    hora_adicionado: Date;
    hora_atualizado: Date;

    // Relacionamentos
    comanda?: Comanda;
    usuario?: Usuario | null;
    produto?: Produto;
}

export interface CreateItemComandaInput {
    comanda_id: number;
    usuario_id?: number | null;
    produto_id: number;
    preco_unitario: number | string;
    quantidade?: number;
    observacao?: string | null;
    status_item?: StatusItem;
}

export interface UpdateItemComandaInput
    extends Partial<CreateItemComandaInput> {
    id: number;
}

// Para exibição com produto
export interface ItemComandaWithProduto extends ItemComanda {
    produto: Produto;
    usuario?: Usuario | null;
}

// Para cozinha
export interface ItemComandaCozinha extends ItemComandaWithProduto {
    comanda: Comanda;
    mesa: Mesa;
}

// enums/empresa.ts
export enum StatusEmpresa {
    ATIVA = "ATIVA",
    INATIVA = "INATIVA",
    SUSPENSA = "SUSPENSA",
}

export enum TipoEmpresa {
    MATRIZ = "MATRIZ",
    FILIAL = "FILIAL",
    ESCRITORIO = "ESCRITORIO",
    DEPOSITO = "DEPOSITO",
}

// enums/unidade.ts
export enum TipoUnidade {
    MATRIZ = "MATRIZ",
    FILIAL = "FILIAL",
    ESCRITORIO = "ESCRITORIO",
    DEPOSITO = "DEPOSITO",
}

export enum StatusUnidade {
    ATIVA = "ATIVA",
    INATIVA = "INATIVA",
    EM_REFORMA = "EM_REFORMA",
}

export enum EstadoBrasileiro {
    AC = "AC",
    AL = "AL",
    AP = "AP",
    AM = "AM",
    BA = "BA",
    CE = "CE",
    DF = "DF",
    ES = "ES",
    GO = "GO",
    MA = "MA",
    MT = "MT",
    MS = "MS",
    MG = "MG",
    PA = "PA",
    PB = "PB",
    PR = "PR",
    PE = "PE",
    PI = "PI",
    RJ = "RJ",
    RN = "RN",
    RS = "RS",
    RO = "RO",
    RR = "RR",
    SC = "SC",
    SP = "SP",
    SE = "SE",
    TO = "TO",
}

// enums/common.ts
export enum YesNo {
    YES = "YES",
    NO = "NO",
}

export enum StatusAtivoInativo {
    ATIVO = "ATIVO",
    INATIVO = "INATIVO",
}

export enum Ordenacao {
    ASC = "asc",
    DESC = "desc",
}

// enums/produto.ts
export enum StatusProduto {
    ATIVO = "ATIVO",
    INATIVO = "INATIVO",
    ESGOTADO = "ESGOTADO",
    RASCUNHO = "RASCUNHO",
}

export enum TipoProduto {
    PRODUTO = "PRODUTO",
    SERVICO = "SERVICO",
    BEBIDA = "BEBIDA",
    SOBREMESA = "SOBREMESA",
}

export enum UnidadeMedida {
    UNIDADE = "UNIDADE",
    KILO = "KILO",
    GRAMA = "GRAMA",
    LITRO = "LITRO",
    MILILITRO = "MILILITRO",
}

// enums/mesa.ts
export enum StatusMesa {
    LIVRE = "LIVRE",
    OCUPADA = "OCUPADA",
    EM_FECHAMENTO = "EM_FECHAMENTO",
    AGUARDANDO_LIMPEZA = "AGUARDANDO_LIMPEZA",
    BLOQUEADA = "BLOQUEADA",
    RESERVADA = "RESERVADA",
}

export enum TipoMesa {
    INTERNA = "INTERNA",
    EXTERNA = "EXTERNA",
    VARANDA = "VARANDA",
    AREA_FUMANTES = "AREA_FUMANTES",
}

// enums/comanda.ts
export enum StatusComanda {
    OCUPADA = "OCUPADA",
    EM_FECHAMENTO = "EM_FECHAMENTO",
    FINALIZADA = "FINALIZADA",
    CANCELADA = "CANCELADA",
}

export enum FormaPagamento {
    DINHEIRO = "DINHEIRO",
    CARTAO_CREDITO = "CARTAO_CREDITO",
    CARTAO_DEBITO = "CARTAO_DEBITO",
    PIX = "PIX",
    VALE_ALIMENTACAO = "VALE_ALIMENTACAO",
}

export enum TipoComanda {
    NORMAL = "NORMAL",
    DELIVERY = "DELIVERY",
    BALCAO = "BALCAO",
    MESA = "MESA",
}

// enums/item-comanda.ts
export enum StatusItem {
    NA_COZINHA = "NA_COZINHA",
    PREPARANDO = "PREPARANDO",
    PRONTO = "PRONTO",
    ENTREGUE = "ENTREGUE",
    CANCELADO = "CANCELADO",
}

export enum PrioridadeItem {
    BAIXA = "BAIXA",
    MEDIA = "MEDIA",
    ALTA = "ALTA",
    URGENTE = "URGENTE",
}

export enum TipoPreparo {
    RAPIDO = "RAPIDO",
    MEDIO = "MEDIO",
    LONGO = "LONGO",
    SOB_ENCOMENDA = "SOB_ENCOMENDA",
}

// enums/usuario.ts
export enum TipoUsuario {
    ADMIN = "ADMIN",
    GERENTE = "GERENTE",
    GARCOM = "GARCOM",
    CAIXA = "CAIXA",
    COZINHA = "COZINHA",
    ENTREGADOR = "ENTREGADOR",
}

export enum StatusUsuario {
    ATIVO = "ATIVO",
    INATIVO = "INATIVO",
    FERIAS = "FERIAS",
    AFASTADO = "AFASTADO",
}

export enum NivelAcesso {
    MASTER = "MASTER",
    GERENCIAL = "GERENCIAL",
    OPERACIONAL = "OPERACIONAL",
    CONSULTA = "CONSULTA",
}

// enums/categoria.ts
export enum TipoCategoria {
    PRODUTO = "PRODUTO",
    SERVICO = "SERVICO",
    BEBIDA = "BEBIDA",
    COMIDA = "COMIDA",
    SOBREMESA = "SOBREMESA",
    ENTRADA = "ENTRADA",
}

export enum StatusCategoria {
    ATIVA = "ATIVA",
    INATIVA = "INATIVA",
    RASCUNHO = "RASCUNHO",
}

// enums/pedido.ts
export enum StatusPedido {
    PENDENTE = "PENDENTE",
    CONFIRMADO = "CONFIRMADO",
    EM_PREPARO = "EM_PREPARO",
    PRONTO = "PRONTO",
    ENTREGUE = "ENTREGUE",
    CANCELADO = "CANCELADO",
}

export enum OrigemPedido {
    BALCAO = "BALCAO",
    MESA = "MESA",
    DELIVERY = "DELIVERY",
    TELEFONE = "TELEFONE",
    APP = "APP",
}
