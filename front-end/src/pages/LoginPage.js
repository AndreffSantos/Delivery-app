import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/Context';
import Input from '../componentes/Input';
import Button from '../componentes/Button';
import { login } from '../services/API';

function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = React.useContext(AppContext);
  const [loginData, setLogin] = React.useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = React.useState({
    logged: false,
    message: '',
  });

  React.useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    if (userStorage) {
      setUser(userStorage);
      navigate(`/${userStorage.role}`);
    }
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setLogin({ ...loginData, [name]: value });
  };

  const handleClick = async () => {
    try {
      const response = await login(loginData);
      const { id, name, email, role, token } = response;
      localStorage.setItem('user', JSON.stringify({ id, name, email, role, token }));
      setUser({ id, name, email, role, token });
      navigate(`/${response.role}`);
    } catch (error) {
      setErrorMessage({
        logged: true,
        message: error.response.statusText,
      });
    }
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

  const loginIsValid = () => {
    const { email, password } = loginData;
    return emailIsValid(email) && passwordIsValid(password);
  };

  return (
    <div>
      <h1>Página de Login</h1>

      <Input
        name="email"
        dataTestId="common_login__input-email"
        type="email"
        value={ loginData.email }
        onChange={ handleChange }
        placeholder="E-mail"
        label="Login"
      />

      <Input
        name="password"
        dataTestId="common_login__input-password"
        type="password"
        value={ loginData.password }
        onChange={ handleChange }
        placeholder="Senha"
        label="Senha"
      />

      <Button
        textButton="Login"
        dataTestId="common_login__button-login"
        onClick={ handleClick }
        isDisabled={ !loginIsValid() }
      />

      <Button
        textButton="Ainda não tenho conta"
        dataTestId="common_login__button-register"
        onClick={ () => navigate('/register') }
      />

      <p
        hidden={ !errorMessage.logged }
        data-testid="common_login__element-invalid-email"
      >
        { errorMessage.message }
      </p>
    </div>
  );
}

export default LoginPage;
