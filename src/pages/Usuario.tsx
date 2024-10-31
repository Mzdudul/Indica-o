import { indicacoes, usuario } from "../constants/dados";
import {  Copy } from "lucide-react";

const Usuario = () => {
  return (
    <div>
      <div className="w-full">
        {usuario.map((user, index) => {
          return (
            <div
              key={index}
              className="gap-2 bg-[#C7C7C7] h-14 flex items center justify-end"
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
      <div className="md:flex md:items-center">
        <div className="p-7 bg-white border-b-2 rounded-xl m-3">
          <h1 className="text-2xl font-semibold">Seu link de indicação</h1>
          {usuario.map((user, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center md:w-96 xl:w-708"
              >
                <img className="w-40 pt-5" src={user.qrCode} alt="qrCode" />
                <div className="flex flex-col md:flex-row gap-2 items-center mt-2">
                  <div className="flex  items-center justify-center">
                    <p className="text-xs md:text-lg p-2 border rounded-xl">
                      {user.link}
                    </p>
                  </div>

                  <button className="flex items-center justify-center text-white gap-1 md:mt-0  mt-2 font-semibold bg-[#53A1E0] w-24 h-10 rounded-xl">
                    <Copy className="w-5" /> Copiar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          {indicacoes.map((indicacao, index) => {
            return (
              <div key={index}>
                <h1>{indicacao.total}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Usuario;
