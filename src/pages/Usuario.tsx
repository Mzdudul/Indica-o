import { compradores } from '../constants/dados';


const Usuario = () => {
    return <div>
      

      {
        compradores.map((comprador, index) => {
          return <div key={index} className='flex gap-2'>
            <h1>{comprador.id}</h1>
            <h1>{comprador.nome}</h1>
            <h1>{comprador.numero}</h1>
          </div>
        })
      }
    </div>;
  };
  
  export default Usuario;