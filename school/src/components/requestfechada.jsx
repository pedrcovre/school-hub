import React from "react";

const Requestfechada = () => {
  return (
    <>
      <div class="flex items-center justify-center">
        <div class="bg-[#ebeff3] rounded-2xl p-16 w-7/8 my-10 min-h-[800px] flex flex-row justify-between">
        <div class="w-2/5">
            <p class="text-gray-600 text-2xl font-medium">RAFAEL GOMES</p>
            <h1 class="text-4xl font-medium my-2">Remover PC</h1>
            <p class="text-gray-600 text-2xl font-medium">REQ-2025-001</p>
            <p class="text-3xl font-normal mt-10">Preciso que removam o PC da sala da ADS 41, Último PC da primeira fileira, PC-32110</p>
            <p class="text-3xl font-medium mt-10">Até 2 dias úteis</p>

            <p class="text-xl font-normal mt-10">Anexo:</p>

            <a href="#" class="flex flex-row items-center rounded-xl p-4 bg-[#d0d9e3] w-3/7 mt-2 hover:text-white hover:bg-black">
            <span className="material-symbols-outlined">description</span>
            <p class="text-xl font-medium">mapa_sala.pdf</p>
            </a>
        </div>

        <div class="flex flex-row text-right">
            <div>
            <p class="text-gray-600 text-2xl font-medium mt-10">MATHEUS KILPP NOGUEIRA</p>
            <div class="flex flex-row justify-end items-center rounded-xl">
            <span class="material-symbols-outlined text-2xl">memory</span>
            <h1 class="text-4xl font-medium">Suporte TI</h1>
            </div>
            <p class="text-3xl font-normal mt-22">Data ínicio</p>
            <p class="text-3xl font-normal">2025-06-04</p>

            <p class="text-3xl font-normal mt-6">Data Fechamento</p>
            <p class="text-3xl font-normal">2025-06-05</p>

            <div class="items-center flex flex-row justify-end mt-5">
            <p class="rounded-xl p-2 px-8 bg-[#d0d9e3] text-xl font-medium">Recusado</p>
            </div>
            </div>
            <a href="" class="-mt-6 -mr-5">
            <span class="material-symbols-outlined ">close</span>
            </a>
        </div>
        </div>
      </div>
    </>
  );
};



export default Requestfechada;