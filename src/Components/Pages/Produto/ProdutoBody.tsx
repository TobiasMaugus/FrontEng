import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageLayout from "../../PageLayout";
import SearchBar from "../../SearchBar";
import DataTable from "../../DataTable";
import Pagination from "../../Pagination";

import ExcluirModal from "../../ModalExcluir";
import { listarProdutos, excluirProduto } from "../../../api/produtoService";
import type { Produto } from "../../../types/Produto";

export default function ProdutoBody() {
    const navigate = useNavigate();

    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Modal
    const [modalAberto, setModalAberto] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

    // ------------------------------
    // Carregar produtos
    // ------------------------------
    useEffect(() => {
        async function fetchProdutos() {
            try {
                const data = await listarProdutos();
                setProdutos(data);
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
            }
        }
        fetchProdutos();
    }, []);

    // ------------------------------
    // Abrir modal
    // ------------------------------
    function abrirModal(produto: Produto) {
        setProdutoSelecionado(produto);
        setModalAberto(true);
    }

    // ------------------------------
    // Confirmar exclusão
    // ------------------------------
    async function confirmarExclusao() {
        if (!produtoSelecionado) return;

        try {
            await excluirProduto(produtoSelecionado.id!);
            setProdutos((prev) =>
                prev.filter((p) => p.id !== produtoSelecionado.id)
            );
        } catch (error) {
            console.error("Erro ao excluir:", error);
        } finally {
            setModalAberto(false);
            setProdutoSelecionado(null);
        }
    }

    return (
        <PageLayout title="Produtos">
            <SearchBar
                placeholder="Buscar:"
                onAdd={() => navigate("/Produtos/CadastrarProduto")}
            />

            <DataTable
                columns={[
                    "ID",
                    "NOME",
                    "CATEGORIA",
                    "PREÇO",
                    "QUANTIDADE",
                    "EDITAR",
                    "EXCLUIR",
                ]}
                data={produtos.map((p) => ({
                    id: p.id,
                    nome: p.nome,
                    categoria: p.categoria,
                    preco: Number(p.preco).toFixed(2).replace(".", ","),
                    quantidade: p.quantidadeEstoque,
                }))}
                onEdit={(id) => navigate(`/Produtos/EditarProduto/${id}`)}
                onDelete={(id) => {
                    const p = produtos.find((prod) => prod.id === id);
                    if (p) abrirModal(p);
                }}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={3}
                onPageChange={(p) => setCurrentPage(p)}
            />

            {modalAberto && produtoSelecionado && (
                <ExcluirModal
                    tipo="Produto"
                    itemNome={produtoSelecionado.nome}
                    onConfirm={confirmarExclusao}
                    onCancel={() => setModalAberto(false)}
                />
            )}
        </PageLayout>
    );
}
