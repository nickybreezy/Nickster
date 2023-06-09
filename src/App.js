import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home'
import Login from "./Login";
import SearchAlbum from "./SearchAlbum";
import Profile from "./Profile";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Title from './Title';
import Manage from './Manage';
import Library from './Library';


import Sidebar from './sidebar';
import "./fonts/Warownia.otf";
import './sidebar.css';
import SearchSongs from "./SearchSongs";

const CLIENT_ID = "99e8f40ff31e4773afd9025afb9d63c2";
const CLIENT_SECRET = "a0c007ed7ada4e0aa5eabfeb02a6ffc9";

function App() {
    return (
        <div className="App">
            <Title />
            <div className="box">

                <BrowserRouter>
                    <Sidebar />
                    <Routes className="routes">
                        <Route path="/" element={<Home />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/manage" element={<Manage />} />
                        <Route exact path="/searchsongs" element={<SearchSongs />} />
                        <Route exact path="/library" element={<Library />} />
                        <Route exact path="/searchalbum" element={<SearchAlbum />} />
                        <Route exact path="/profile" element={<Profile />} />
                    </Routes>

                </BrowserRouter>


            </div>

        </div>
    );
}

export default App;
