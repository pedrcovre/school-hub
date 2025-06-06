import Nav from "./Nav";
import React from "react";

const Requestabertaaluno = () => {
  return (
    <>
      <Nav />
      <div class="flex items-center justify-center min-h-screen">
        <div class="bg-[#ebeff3] rounded-2xl p-16 w-7/8 my-10 h-lvh">
        <div class="flex flex-row  justify-between">
        <div class="w-2/5">
            <p class="text-gray-600 text-2xl font-medium">RAFAEL GOMES</p>
            <h1 class="text-4xl font-medium my-2">Monitoria para SQL</h1>
            <p class="text-gray-600 text-2xl font-medium">REQ-2025-001</p>
            <p class="text-3xl font-normal mt-10">Gostaria de uma monitoria para a matéria de SQL MODELAGEM E DESENVOLVIMENTO DE BD RELACIONAIS</p>
            <p class="text-3xl font-medium mt-10">Até 10 dias úteis</p>
        </div>

        <div class="flex flex-row text-right">
            <div>
            <div class="flex flex-row justify-end items-center rounded-xl mt-20">
            <span class="material-symbols-outlined">import_contacts</span>            
            <h1 class="text-4xl font-medium">Treinamento</h1>
            </div>
            <p class="text-3xl font-normal mt-22">Data ínicio</p>
            <p class="text-3xl font-normal">2025-06-04</p>
            </div>
            <a href="" class="-mt-6 -mr-5">
            <span class="material-symbols-outlined ">close</span>
            </a>
        </div>
        </div>
        <div class="flex flex-row  justify-around items-end h-2/6">
            <a href="#" class="flex flex-row items-center justify-center rounded-xl p-4 bg-[#d0d9e3] w-2/8 mt-2 hover:text-white hover:bg-black">
            <span class="material-symbols-outlined">edit</span>
            <p class="text-xl font-bold">EDITAR</p>
            </a>

            <a href="#" class="flex flex-row items-center justify-center rounded-xl p-4 bg-[#d0d9e3] w-2/8 mt-2 hover:text-white hover:bg-black">
            <span class="material-symbols-outlined">delete</span>
            <p class="text-xl font-bold">EXCLUIR</p>
            </a>
        </div>

        </div>
      </div>
    </>
  );
};



export default Requestabertaaluno;
