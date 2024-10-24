import { Link } from "react-router-dom";
import { usuario } from "../constants/dados";

const Usuario = () => {
  return (
    <div>
      <div>
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
      <div className="flex flex-col items-center w-708 h-[53rem] border-r border-[#BBBBBB]">
        <div className=" flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold mt-32 mb-11">Acesse agora via QR Code</h1>
          {usuario.map((user, index) => {
            return (
              <div key={index} className="border-b w-96 border-[#BBBBBB]">
                <div className="mb-10 flex items-center justify-center">
                  <img className="w-72 bg-black p-4 rounded-xl" src={user.qrCode} alt="qrCode" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-[#EBEBEB] h-7 -mt-4 w-12 flex items-center justify-center mb-12">
          <p className="bg-[#EBEBEB] text-[#BBBBBB] text-lg">ou</p>
        </div>
        <div>
        <h1 className="text-2xl font-semibold mb-11">Acesse pelo link.</h1>
        </div>
        <div className="flex items-center justify-center mb-12">
            <div className="flex items-center justify-center bg-[#D9D9D9] border text-base text-[#727272] font-semibold border-[#9F9F9F] w-448 h-12 rounded-xl p-3">
            {usuario.map((user, index) => {
            return (
              <div key={index} className=" w-96 ">
                <p className="flex items-center justify-center bg-[#D9D9D9]">{user.link}</p>
              </div>
            );
          })}
            </div>
          </div>
          <div className="flex items-center justify-center mb-8">
            <button className="bg-[#53A1E0] w-[28rem] font-semibold text-xl h-12 rounded-xl">
              <Link to="/usuario" className="bg-[#53A1E0] text-white">
                COPIAR LINK
              </Link>
            </button>
          </div>
      </div>
    </div>
  );
};

export default Usuario;
