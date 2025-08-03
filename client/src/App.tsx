import {BrowserRouter, Routes, Route} from 'react-router'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import Otp from './pages/Otp'
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<Login/>}/>
				<Route path='/' element={<Homepage/>}/>
				<Route path='/verify' element={<Otp/>}/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
