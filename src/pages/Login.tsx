import { auth } from '../firebaseConfig.ts';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSnackbar } from 'notistack';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  function login() {
    window.location.href = '/usuario';
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // =Signed up
        const user = userCredential.user;

        navigate('/usuario');
        enqueueSnackbar({
          message: 'Usuario Logado com Sucesso!',
          variant: 'success',
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        enqueueSnackbar({
          message: errorMessage,
          variant: 'error',
        });
        // ..
      });
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen ">
        <div className="border-b-2 border-[#BBBBBB] pb-7 w-[71rem]">
          <div className="mb-14 flex itemns-center justify-center">
            <h1 className="text-3xl font-semibold">Faça Login</h1>
          </div>
          <div className="flex items-center justify-center mb-12">
            <input
              className="bg-[#D9D9D9] border text-base text-[#727272] font-semibold border-[#9F9F9F] w-[44rem] h-12 rounded-xl p-3"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
            />
          </div>
          <div className="flex items-center justify-center mb-14">
            <input
              className="bg-[#D9D9D9] border text-base text-[#727272] font-semibold border-[#9F9F9F] w-[44rem] h-12 rounded-xl p-3"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
            />
          </div>
          <div className="flex items-center justify-center mb-8">
            <button
              onClick={login}
              className="bg-[#53A1E0] w-[28rem] font-semibold text-xl h-12 rounded-xl"
            >
              Entrar
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-5">
          <div className="bg-[#EBEBEB] h-7 -mt-8 w-36 flex items-center justify-center">
            <p className="bg-[#EBEBEB] text-[#BBBBBB] text-lg">ou</p>
          </div>
          <button>
            <img
              className="w-12 mt-5 flex items-center justify-center bg-[#D9D9D9] p-2 rounded-full"
              src="/google.png"
              alt="Opção de login com google"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
