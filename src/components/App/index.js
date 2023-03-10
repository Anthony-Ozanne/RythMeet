// == Import
import './styles.scss';

import { useState, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../authContext';

import Topbar from '../Topbar';
import Menu from '../Menu';
import Footer from '../Footer';
import Home from '../Home';
import About from '../About';
import Contact from '../Contact';

import LoginForm from '../LoginForm';
import SigninForm from '../SigninForm';
import AddConcert from '../AddConcert';
import UserConcertList from '../UserConcertList';
import ConcertList from '../ConcertList';
import Concert from '../Concert';
import Profil from '../Profil';
import MyProfil from '../MyProfil';
import EditProfil from '../EditProfil';
import Error from '../Error';

// == Composant
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <div className="app">

      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} onSearch={handleSearch} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <Routes>
        <Route path="/" element=<Home /> />
        <Route path="/mylist" element=<UserConcertList /> />
        <Route path="/concerts" element=<ConcertList searchValue={searchValue} /> />
        <Route path="/concerts/:id" element=<Concert /> />
        <Route path="/concert/create" element=<AddConcert /> />
        <Route path="/login" element=<LoginForm /> />
        <Route path="/register" element=<SigninForm /> />
        <Route path="/profil/:id" element=<Profil /> />
        <Route path="/profil/me" element=<MyProfil /> />
        <Route path="/profil/me/edit" element=<EditProfil /> />
        <Route path="/contact" element=<Contact /> />
        <Route path="/about" element=<About /> />
        <Route path="*" element=<Error /> />
      </Routes>

      <Footer />

    </div>
  );
}

// == Export
export default App;
