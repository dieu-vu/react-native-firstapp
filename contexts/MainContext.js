import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const MainContext = React.createContext({});

const MainProvider = (props) => {
  // create state isLoggedIn, set value to false
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <MainContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      {props.children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export {MainContext, MainProvider};
