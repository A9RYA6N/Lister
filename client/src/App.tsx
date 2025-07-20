import {BrowserRouter, Routes, Route} from 'react-router'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<Login/>}/>
				<Route path='/' element={<Homepage/>}/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
