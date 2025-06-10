import { useState } from "react";

const Login = () => {
  const [visibility, setVisibility] = useState({})

    return (
        <div className="m-[30px] flex min-h-screen select-none">
            <img src="/logo.svg" alt="Logo" className="w-[35px] h-[34px]" />
            <div className="ml-[160px] mt-[100px] w-1/2">
                <div className="flex flex-col items-center mt-[100px] w-full">
                    <h1 className="text-[40px] font-medium">Acesse sua conta</h1>
                    <p className="text-[13px] whitespace-nowrap">Bem-vindo de volta, preencha as informações</p>
                </div>
                <div className="flex flex-col items-center mt-10">
                    <div className="w-[450px]">
                        <p className="mb-2 text-left font-medium">Email</p>
                        <input
                            type="email"
                            placeholder="Digite seu email"
                            className="w-full h-[60px] bg-white border border-black/20 focus:outline-none rounded-lg p-3 mb-[35px]"
                        />
                    </div>
                    <div className="w-[450px]">
                        <p className="mb-2 text-left font-medium">Senha</p>
                        <div className="relative mb-[10px]">
                            <input
                                type={visibility.password ? "text" : "password"}
                                placeholder="Digite sua senha"
                                className="w-full h-[60px] bg-white border border-black/20 rounded-lg p-3 pr-12 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setVisibility({ ...visibility, password: !visibility.password })}
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                                <span className="material-symbols-rounded text-gray-500 cursor-pointer">
                                    {visibility.password ? "visibility" : "visibility_off"}
                                </span>
                            </button>
                        </div>
                        <a className="text-[14px] text-[#395f8b73] mb-[35px] inline-block">Esqueceu sua senha?</a>
                    </div>

                    <div className="w-[450px]">
                        <button
                            type="submit"
                            className="w-full h-[52px] bg-[#5CA4F5] rounded-lg text-white text-sm font-medium mb-4 cursor-pointer transition-all duration-200 hover:h-[56px]"
                        >
                            Entrar
                        </button>
                    </div>

                    <div className="text-[15px] mt-2">
                        Não tem uma conta?{" "}
                        <a className="text-[#395f8b] font-medium cursor-pointer">Cadastre-se</a>
                    </div>

                    <footer className="text-sm mt-44 text-center w-[450px]">
                        © 2025 School Hub. Todos os direitos reservados.
                    </footer>
                </div>
            </div>
            <div className="mr-[36px] w-1/2 h-screen">
                <img
                    src="/src/assets/fotoPessoas.jpg"
                    alt="Foto Pessoas"
                    className="w-[780px] h-[898px] object-cover rounded-lg"
                />
            </div>
        </div>
    );
};

export default Login;



