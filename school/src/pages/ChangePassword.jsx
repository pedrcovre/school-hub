import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext'; 
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';

const ChangePassword = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { changePassword } = useAuth();

  const onSubmit = async (data) => {
    try {
      await changePassword(data.email, data.password);
      alert('Senha alterada com sucesso!');
    } catch (error) {
      alert(error.response?.data?.mensagem || 'Erro ao alterar senha');
      console.error('Erro:', error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen select-none m-[20px] lg:m-[30px]">
      <div className="mb-6 lg:mb-0">
        <img src="/logo.svg" alt="Logo" className="w-14 mb-4 lg:mb-0" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center w-full lg:w-1/2 px-4 lg:px-10"
      >
        <h1 className="text-[32px] lg:text-[40px] font-medium mb-8">Alterar Senha</h1>

        <div className="w-full max-w-[450px] space-y-6">
          <EmailInput register={register} errors={errors} />
          <PasswordInput register={register} errors={errors} watch={watch} />
          <PasswordInput register={register} errors={errors} watch={watch} isConfirm />

          <button
            type="submit"
            className="w-full h-[52px] bg-blue-500 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:h-[56px] hover:bg-blue-600 mt-4"
          >
            Alterar Senha
          </button>
        </div>

        <footer className="text-sm mt-10 text-center w-full max-w-[450px]">
          © 2025 School Hub. Todos os direitos reservados.
        </footer>
      </form>

      <div className="hidden lg:flex w-1/2 items-center justify-center">
        <img
          src="/src/assets/image-change-password.jpg"
          alt="Icone Senha"
          className="w-[550px] h-[650px] object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default ChangePassword;
