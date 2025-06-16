import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom"; // Adicione esta linha


const getStatusBadge = (status) => {
  const statusLower = status?.toLowerCase();
  switch (statusLower) {
    case "pending":
      return <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-200 text-gray-800">Pendente</span>;
    case "approved":
      return <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-200 text-green-800">Aprovado</span>;
    case "rejected":
      return <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-200 text-red-800">Recusado</span>;
    default:
      return <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-200 text-gray-800">{status}</span>;
  }
};

const Requestaberta = ({ data, onClose, onEdit, onDelete }) => {
  const { token, role } = useAuth();
  const navigate = useNavigate();

    const handleEdit = () => {
    navigate("/newrequest", { state: { requestData: data } });
  };
  if (!data) return null;

  const handleDelete = async () => {
    const confirm = window.confirm("Tem certeza que deseja excluir esta requisição?");
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:5000/api/requests/${data.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        onDelete?.(data.id); // Atualiza a lista
        onClose(); // Fecha o card
      } else {
        const errorData = await response.json();
        alert("Erro ao excluir: " + errorData.error);
      }
    } catch (err) {
      console.error("Erro ao excluir requisição:", err);
      alert("Erro inesperado ao excluir.");
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-[#ebeff3] rounded-2xl p-10 w-11/12 max-w-4xl min-h-6xl relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4">
          <span className="material-symbols-outlined text-3xl cursor-pointer">close</span>
        </button>

        <div className="flex justify-between">
          <div className="w-2/3">
            <p className="text-gray-600 text-2xl font-medium">{data.responsavel}</p>
            <h1 className="text-4xl font-medium my-2">{data.tipo}</h1>
            <p className="text-gray-600 text-xl font-medium">REQ-{data.id}</p>
            <div className="mt-4">{getStatusBadge(data.status)}</div>
            <p className="text-2xl mt-10 whitespace-pre-line">{data.descricao}</p>
            <p className="text-xl font-medium mt-10">Prazo estimado: {data.prazo || "10 dias úteis"}</p>

            {data.arquivo && (
              <div className="mt-6">
                <p className="text-lg font-medium">Anexo:</p>
                <a
                  href={data.arquivo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {data.arquivo.split("/").pop()}
                </a>
              </div>
            )}
          </div>

          <div className="text-right">
            <div className="flex flex-row justify-end items-center gap-2 mt-6">
              <span className="material-symbols-outlined">import_contacts</span>
              <h1 className="text-2xl font-medium">Treinamento</h1>
            </div>
            <p className="text-xl mt-4">Data de início</p>
            <p className="text-xl">{data.data}</p>
          </div>
        </div>

        <div className="flex justify-around items-center mt-20">
          {role === 'student' && (
            <>
        <button
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#d0d9e3] hover:bg-black hover:text-white cursor-pointer"
          onClick={handleEdit}
        >
          <span className="material-symbols-outlined">edit</span>
          <p className="text-xl font-bold">EDITAR</p>
        </button>

              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#d0d9e3] hover:bg-black hover:text-white cursor-pointer"
              >
                <span className="material-symbols-outlined">delete</span>
                <p className="text-xl font-bold">EXCLUIR</p>
              </button>
            </>
          )}

          {role === 'admin' && (
            <>
            <div className="flex flex-row justify-between w-11/12 max-w-4xl items-center">
              <button className="flex items-center w-90 h-20 px-6 py-3 rounded-xl bg-[#d0d9e3] hover:bg-black hover:text-white cursor-pointer">
                <span className="material-symbols-outlined">add</span>
                <p className="text-xl font-bold">ADICIONAR RECURSOS</p>
              </button>
              <div className="text-center">
              <button className="flex items-center px-6 py-3 rounded-xl mb-5 bg-[#d0d9e3] hover:bg-black hover:text-white cursor-pointer">
                <span className="material-symbols-outlined">edit_note</span>
                <p className="text-xl font-bold">ESCREVER OBS</p>
              </button>
              <button className="flex items-center text-center px-6 py-3 rounded-xl w-2/2 bg-blue-300 hover:bg-blue-600 hover:text-white cursor-pointer">
                <span className="material-symbols-outlined">send</span>
                <p className="text-xl font-bold">Enviar</p>
              </button>
              </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Requestaberta;
