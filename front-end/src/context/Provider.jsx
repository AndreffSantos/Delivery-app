import PropTypes from 'prop-types';
import React from 'react';
import AppContext from './Context';

export default function Provider({ children }) {
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    const useStorage = JSON.parse(localStorage.getItem('user'));
    if (useStorage) {
      setUser(useStorage);
    }
  }, []);

  const context = React.useMemo(() => ({
    user,
    setUser,
  }), [user, setUser]);

  return (
    <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
