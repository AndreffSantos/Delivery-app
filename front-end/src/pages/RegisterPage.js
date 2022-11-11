import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../componentes/Input';
import Button from '../componentes/Button';
import { register } from '../services/API';

function RegisterPage() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState({
    logged: false,
    message: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setNewUser({ ...newUser, [name]: value });
  };

  const handleClick = async () => {
    try {
      const response = await register(newUser);
      navigate(`/${response.role}`);
    } catch (error) {
      setErrorMessage({
        logged: true,
        message: error.response.statusText,
      });
    }
  };

  const nameIsValid = (name) => {
    const maxLength = 12;
    return name.length >= maxLength;
  };

  const emailIsValid = (email) => {
    // https://ui.dev/validate-email-address-javascript/
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const passwordIsValid = (password) => {
    const minLength = 6;
    return password.length >= minLength;
  };

  const registerIsValid = () => {
    const { name, email, password } = newUser;
    return nameIsValid(name) && emailIsValid(email) && passwordIsValid(password);
  };

  return (
    <div>
      <h1>Cadastro</h1>

      <Input
        name="name"
        dataTestId="common_register__input-name"
        type="text"
        value={ newUser.name }
        onChange={ handleChange }
        placeholder="Nome"
        label="Nome"
      />

      <Input
        name="email"
        dataTestId="common_register__input-email"
        type="email"
        value={ newUser.email }
        onChange={ handleChange }
        placeholder="E-mail"
        label="E-mail"
      />

      <Input
        name="password"
        dataTestId="common_register__input-password"
        type="password"
        value={ newUser.password }
        onChange={ handleChange }
        placeholder="Senha"
        label="Senha"
      />

      <Button
        textButton="Cadastrar"
        dataTestId="common_register__button-register"
        onClick={ handleClick }
        isDisabled={ !registerIsValid() }
      />

      <p
        hidden={ !errorMessage.logged }
        data-testid="common_register__element-invalid_register"
      >
        { errorMessage.message }
      </p>
    </div>
  );
}

export default RegisterPage;
// coment
