// src/api/vendaService.ts
import api from "./api";
import type {VendaRequestDTO, VendaResponseDTO} from "../types/api";

const path = "/vendas";

export async function listarVendas(): Promise<VendaResponseDTO[]> {
    const r = await api.get(path);
    return r.data;
}

export async function criarVenda(body: VendaRequestDTO): Promise<VendaResponseDTO> {
    const r = await api.post(path, body);
    return r.data;
}

export async function buscarVenda(id: number): Promise<VendaResponseDTO> {
    const r = await api.get(`${path}/${id}`);
    return r.data;
}

export async function excluirVenda(id: number): Promise<void> {
    await api.delete(`${path}/${id}`);
}
