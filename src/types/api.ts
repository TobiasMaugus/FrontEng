// src/types/api.ts
export interface Cliente {
    id?: number;
    nome: string;
    cpf?: string;
    email?: string;
    telefone?: string;
    // adicione campos conforme seu model
}

export interface Produto {
    id?: number;
    nome: string;
    preco: number;
    estoque: number;
    // ...
}

export interface ItemVendaDTO {
    produtoId: number;
    quantidade: number;
}

export interface VendaRequestDTO {
    clienteId: number;
    itens: ItemVendaDTO[];
}

export interface VendaResponseDTO {
    id: number;
    cliente: Cliente;
    itens: { produto: Produto; quantidade: number }[];
    total: number;
    data: string;
}
