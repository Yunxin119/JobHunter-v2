import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './pages/Dashboard';
import ThemeToggle from './components/ThemeToggle';
import EditUsers from './pages/admin/EditUsers';
import Profile from './pages/Profile';
import Calendar from './pages/Calendar';
import JobSearch from "./pages/JobSearch";
import SearchResults from "./pages/SearchResults";
import JobDetails from "./pages/JobDetails";
import PostDetail from './pages/PostDetail';
import EditPosts from './pages/admin/EditPosts';
function App() {
  const { userInfo } = useSelector((state) => state.authReducer)
  const isLoggedIn = userInfo !== null;
  const isAdmin = userInfo?.role === 'admin';
  return (
    
      <div className='w-screen h-screen overflow-y-scroll overflow-x-hidden'>
        <ThemeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={isLoggedIn ? <Home /> : <Login />} />
        <Route path='/register' element={isLoggedIn ? <Home /> : <Register />} />
        <Route path='/applications' element={isLoggedIn ? <Dashboard /> : <Login />} />
        <Route path='/users' element={isAdmin? <EditUsers /> : <Navigate to="/" />} />
        <Route path='/posts' element={isAdmin ? <EditPosts /> : <Navigate to="/" />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path="/search" element={<JobSearch />} />
        <Route path="/search/results" element={<SearchResults />} />
        <Route path="/details/:id" element={<JobDetails />} />
        <Route path="/details/post/:id" element={<PostDetail />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
