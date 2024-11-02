import { indicacoes, usuario } from "../constants/dados";
import { Copy } from "lucide-react";

const Usuario = () => {
  return (
    <div>
      <div className="w-full">
        {usuario.map((user, index) => {
          return (
            <div
              key={index}
              className="gap-2 bg-[#C7C7C7] h-14 flex items-center justify-end"
            >
              <div className="flex items-center bg-[#C7C7C7] gap-3 px-5">
                <h1 className="bg-[#C7C7C7]">{user.nome}</h1>
                <img
                  className=" w-8 h-8 bg-[#C7C7C7]"
                  src={user.img}
                  alt="perfil"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="lg:flex lg: lg:justify-center">
        <div className="p-8 bg-white border-b-2 rounded-xl ">
          <h1 className="text-2xl font-semibold">Seu link de indicação</h1>
          {usuario.map((user, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center md:w-96  xl:w-708"
              >
                <img
                  className="w-40 lg:w-60"
                  src={user.qrCode}
                  alt="qrCode"
                />
                <div className="flex gap-2 flex-col md:flex-row pt-4 items-center">
                  <div className="flex items-center justify-center">
                    <p className="text-xs md:text-lg p-2 border rounded-xl">
                      {user.link}
                    </p>
                  </div>

                  <button className="flex items-center justify-center text-white font-semibold bg-[#53A1E0] w-24 h-10 rounded-xl">
                    <Copy className="w-5" /> Copiar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex bg-white p-8  flex-col   xl:w-708 border-b-2 rounded-xl">
          <div>
            <h1 className="text-2xl font-semibold pb-3">Estatísticas</h1>
            {indicacoes.map((indicacao, index) => {
              return (
                <div key={index} className=" flex flex-col  items-center md:w-96 justify-center gap-3">
                  <div className="bg-indigo-100 p-4 w-80">
                    <h1 className="text-purple-700 text-xl font-semibold">Total de indicações</h1>
                  <h1 className="text-2xl font-semibold text-purple-700">{indicacao.total}</h1>
                  </div>
                  <div className="bg-green-100 p-4 w-80">
                    <h1 className="text-xl font-semibold text-green-700">Aprovadas</h1>
                  <h1 className="text-2xl font-semibold text-green-700">{indicacao.aprovadas}</h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usuario;
