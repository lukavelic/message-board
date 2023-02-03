import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import LoginPage from './components/LoginPage';
import Chat from './components/Chat';

function RouteSwitch() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App/>}/>
            <Route path='/loginPage' element={<LoginPage/>}/>
            <Route path='/chat' element={<Chat/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch;