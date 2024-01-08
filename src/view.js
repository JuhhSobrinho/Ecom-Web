import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export function View({ estado = true }) {
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email;
        setUserEmail(email);
        toast.info(`Bem Vindo: ${email}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          closeButton: false,
          tema: "red",
          style: {
            backgroundColor: '#1f7a8c',
            color: '#BFDBF7',
          },
        });
      } else {
        toast.info(`Usuario não autentificado`, {
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


  // Renderização condicional com base no estado
  return (
    <div>
      {estado ? <ToastContainer /> : userEmail}
    </div>
  );
}
