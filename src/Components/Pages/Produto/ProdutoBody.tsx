import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageLayout from "../../PageLayout";
import SearchBar from "../../SearchBar";
import DataTable from "../../DataTable";
import Pagination from "../../Pagination";

import type {Produto} from "../../../types/Produto";

export default function ProdutoBody() {
    const navigate = useNavigate();

    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3; // você pode ajustar depois

    useEffect(() => {
        async function fetchProdutos() {
            try {
                const response = await fetch("http://localhost:8080/produtos");
                if (!response.ok) throw new Error("Erro ao buscar produtos");

                const data: Produto[] = await response.json();
                setProdutos(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchProdutos();
    }, []);

    async function handleDelete(id: number) {
        if (!confirm("Deseja realmente excluir este produto?")) return;

        try {
            await fetch(`http://localhost:8080/produtos/${id}`, {
                method: "DELETE",
            });

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
                    ...p,
                    preco: p.preco.toFixed(2).replace(".", ","), // formata exibição
                }))}
                onEdit={(id) => navigate(`/Produtos/EditarProduto/${id}`)}
                onDelete={(id) => handleDelete(id)}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(p) => setCurrentPage(p)}
            />
        </PageLayout>
    );
}
