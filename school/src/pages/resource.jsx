import { useState } from "react";
import Navbar from "../components/Navbar";

const allResources = [
    { nome: "Rafael Gomes", tipo: "SQL - Modelagem", data: "2025-06-04" },
    { nome: "Ana Cardoso", tipo: "POO - Java", data: "2025-06-02" },
    { nome: "Lucas Souza", tipo: "Redes", data: "2025-06-01" },
    { nome: "Anderson Vieira", tipo: "Engenharia de Software", data: "2025-05-30" },
    { nome: "Sophia Dornelles", tipo: "Algoritmos", data: "2025-05-28" },
    { nome: "Matheus Trevisan", tipo: "Banco de Dados", data: "2025-05-26" },
    { nome: "Paulo Azhaeimer", tipo: "Sistemas Operacionais", data: "2025-05-24" },
    { nome: "Manete Paraquedas", tipo: "Sistemas Operacionais", data: "2025-05-24" },
];

const itemsPerPage = 5;

const Resource = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(allResources.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = allResources.slice(startIndex, startIndex + itemsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen p-10 justify-items-center">
                <h1 className="text-4xl font-bold mb-10 text-center">Meus Recursos</h1>

                <div className="flex justify-items-center overflow-x-auto text-center w-1/2 mx-auto rounded-2xl border border-gray-200">
                    <table className="min-w-full bg-white shadow-md rounded-xl">
                        <thead>
                            <tr className="text-black text-center border-b border-gray-200">
                                <th className="p-4">Nome</th>
                                <th className="p-4">Tipo de Recurso</th>
                                <th className="p-4">Data</th>
                                <th className="p-4">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50 border-b border-gray-200">
                                    <td className="p-4">{item.nome}</td>
                                    <td className="p-4">{item.tipo}</td>
                                    <td className="p-4">{item.data}</td>
                                    <td className="p-4">
                                        <button className="flex items-center p-2 rounded-lg text-xs bg-gray-200 hover:underline mr-4">
                                            Download
                                            <span class="material-symbols-outlined">
                                                download
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center items-center mt-6 gap-4">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="flex px-2 items-center py-2 rounded-lg bg-gray-300 hover:bg-gray-400 disabled:opacity-50">
                        <span class="material-symbols-outlined">arrow_back</span>
                    </button>
                    <span className="text-base font-medium">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className="flex px-2 items-center py-2 rounded-lg bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
                    >
                        <span class="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Resource;
