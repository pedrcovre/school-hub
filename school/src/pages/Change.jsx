import { useState } from "react";

const Change = () => {
    const [visibility, setVisibility] = useState({});

    return (
        <div className="mx-[30px] mt-[20px] select-none">
            <img src="/logo.svg" alt="Logo" className="w-[35px] h-[34px]" />
            <div className="ml-[80px] flex h-screen">
                <div className="flex flex-col items-center justify-center w-1/2 p-10">
                    <h1 className="text-2xl font-medium mb-11">Alterar Senha</h1>
                    <form className="w-[450px]">
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="Digite seu email"
                                className="w-full h-[60px] bg-white border border-gray-300 rounded-lg p-3 focus:outline-none"
                            />
                        </div>
                        <div className="mb-[10px]">
                            <label className="block text-sm font-medium mb-2">Nova senha</label>
                            <div className="relative">
                                <input
                                    type={visibility.password ? "text" : "password"}
                                    placeholder="Digite sua senha"
                                    className="w-full h-[60px] bg-white border border-black/20 rounded-lg p-3 pr-12 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setVisibility({ ...visibility, password: !visibility.password })}
                                    className="absolute top-1/2 right-3 -translate-y-1/2"
                                >
                                    <span className="material-symbols-rounded text-gray-500 cursor-pointer">
                                        {visibility.password ? "visibility" : "visibility_off"}
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className="mb-[10px]">
                            <label className="block text-sm font-medium mb-2">Confirme sua senha</label>
                            <div className="relative">
                                <input
                                    type={visibility.password ? "text" : "password"}
                                    placeholder="Digite sua senha"
                                    className="w-full h-[60px] bg-white border border-black/20 rounded-lg p-3 pr-12 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setVisibility({ ...visibility, password: !visibility.password })}
                                    className="absolute top-1/2 right-3 -translate-y-1/2"
                                >
                                    <span className="material-symbols-rounded text-gray-500 cursor-pointer">
                                        {visibility.password ? "visibility" : "visibility_off"}
                                    </span>
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full h-[52px] bg-blue-500 rounded-lg text-white text-sm font-medium mb-4 cursor-pointer transition-all duration-200 hover:h-[56px] hover:bg-blue-600"
                        >
                            Alterar Senha
                        </button>
                    </form>
                    <footer className="text-sm mt-50 text-center w-[450px]">
                        © 2025 School Hub. Todos os direitos reservados.
                    </footer>
                </div>
                <div className="mt-14 w-1/2 h-screen">
                    <img
                        src="/src/assets/iconSenha.jpg"
                        alt="icon3"
                        className="w-[550px] h-[650px] object-cover rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Change;
