import { Link } from "react-router-dom";


const Login = () => {
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
              placeholder="E-mail"
            />
          </div>
          <div className="flex items-center justify-center mb-14">
            <input
              className="bg-[#D9D9D9] border text-base text-[#727272] font-semibold border-[#9F9F9F] w-[44rem] h-12 rounded-xl p-3"
              type="password"
              placeholder="Senha"
            />
          </div>
          <div className="flex items-center justify-center mb-8">
            <button className="bg-[#53A1E0] w-[28rem] font-semibold text-xl h-12 rounded-xl">
              <Link to='/usuario' className="bg-[#53A1E0]">
              Entrar
              </Link>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center mt-5">
         <img className="w-8 flex items-center justify-center " src="/google.png" alt="Opção de login com google"/>
        </div>
      </div>
    </>
  );
};

export default Login;
