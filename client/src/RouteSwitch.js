import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import LoginPage from './components/LoginPage';

function RouteSwitch() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App/>}/>
            <Route path='/login' element={<LoginPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch;