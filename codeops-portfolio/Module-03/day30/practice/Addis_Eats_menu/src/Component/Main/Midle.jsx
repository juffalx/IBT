import './Midle.css';
import PropTypes from 'prop-types';
import { ThemeChannel } from '../../Context/ThemeContext';
import Sidebar from './Sidebar/Sidebar';
import Menu from './Menu/Menu';
import { useContext,useEffect } from 'react';

function First({ onAdd }) {
  const { theme } = useContext(ThemeChannel);
  useEffect(() => console.log('theme is ', theme), [theme]);

  return (
    <div
      className={
        theme === 'light' ? 'container-grid light' : 'container-grid dark'
      }
    >
      <Sidebar />
      <Menu onAdd={onAdd} />
    </div>
  );
}

First.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default First;
