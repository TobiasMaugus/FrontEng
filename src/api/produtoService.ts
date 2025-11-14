// src/api/produtoService.ts
import api from "./api";
import type {Produto} from "../types/api";

const path = "/produtos";

export async function listarProdutos(): Promise<Produto[]> {
    const r = await api.get(path);
    return r.data;
}

export async function criarProduto(p: Produto): Promise<Produto> {
    const r = await api.post(path, p);
    return r.data;
}

export async function atualizarProduto(id: number, p: Produto): Promise<Produto> {
    const r = await api.put(`${path}/${id}`, p);
    return r.data;
}

export async function excluirProduto(id: number): Promise<void> {
    await api.delete(`${path}/${id}`);
}
