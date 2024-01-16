import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

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
          navigate('../login');
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