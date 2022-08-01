import React from 'react';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import Login from './components/login/login';
import Maker from './components/maker/maker';

function App({FileInput, authService, cardRepository}) {
  return <div className={styles.app}>
    <BrowserRouter>
      {/* <switch>
        <Route exact path ="/">
          <Login authService={authService} />;
        </Route> 
        <Route exact path ="/maker">
          <Maker />
        </Route>    
      </switch> */}
      <Routes>
        <Route path ='/' exact element={<Login authService={authService}/>} />
        <Route path ='/maker' exact element={<Maker FileInput={FileInput} authService={authService} cardRepository={cardRepository}/>} />
      </Routes>
    </BrowserRouter>
  </div>
}

<Routes>
  <Route path ='/' exact element={<Login />} />
  <Route path ='/maker' exact element={<Maker />} />
</Routes>




export default App;