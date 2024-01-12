import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function View({ estado = 0 }) {
  const [userEmail, setUserEmail] = useState('');
  const [userUid, setSerUid] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email;
        const userid = user.uid;

        setUserEmail(email);
        setSerUid(userid);
      } else {
        toast.info(`Usuario não autenticado`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
          closeButton: false,
          tema: "red",
          style: {
            backgroundColor: '#780000',
            color: '#BFDBF7',
            width: '600px',
            height: '400px',
            fontSize: '60px',
            textAlign: 'center',
          },
        });

        setTimeout(() => {
          navigate('../login');
        }, 2000);
      }
    });
    return () => unsubscribe();
  }, [navigate]);


  let conteudo;
  switch (estado) {
    case 1:
      conteudo = userEmail;
      break;
    case 2:
      conteudo = userUid;
      break;
    default:
      break;
  }
  // Retornar diretamente o valor de conteudo
  return conteudo;
}