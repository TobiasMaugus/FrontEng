import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageLayout from "../../PageLayout";
import SearchBar from "../../SearchBar";
import DataTable from "../../DataTable";
import Pagination from "../../Pagination";

import { listarProdutos, excluirProduto } from "../../../api/produtoService";
import type { Produto } from "../../../types/Produto";

export default function ProdutoBody() {
    const navigate = useNavigate();

    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function fetchProdutos() {
            try {
                const data = await listarProdutos(); // Agora usa axios com token
                setProdutos(data);
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
            }
        }

        fetchProdutos();
    }, []);

    async function handleDelete(id: number) {
        if (!confirm("Deseja realmente excluir este produto?")) return;

        try {
            await excluirProduto(id); // axios + token
            setProdutos((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Erro ao excluir:", error);
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
                    preco: Number(p.preco).toFixed(2).replace(".", ","), // segurança extra
                    quantidade: p.quantidadeEstoque,
                }))}
                onEdit={(id) => navigate(`/Produtos/EditarProduto/${id}`)}
                onDelete={(id) => handleDelete(id)}
            />


            <Pagination
                currentPage={currentPage}
                totalPages={3}
                onPageChange={(p) => setCurrentPage(p)}
            />
        </PageLayout>
    );
}
