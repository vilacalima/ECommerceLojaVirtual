import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Response(props) {
  const isSucess = props.isSucess;
  const message = props.message;
  const rotaSucces = props.rotaSucces;
  const rotaNotSucess = props.rotaNotSucess;

  const history = useHistory();

  useEffect(() => {

    setTimeout(() => {
        if(isSucess === true){
            history.push(`/${rotaSucces}`)
        } else {
            history.push(`/${rotaNotSucess}`)
        }
    }, 2000);
  },);
  
  return (
    <div>
        {isSucess && (
            <div className="mensagem sucesso">{message}</div>
          )}
        {!isSucess && (
            <div className="mensagem erro">{message}</div>
        )}
    </div>
  );
}

export default Response;
