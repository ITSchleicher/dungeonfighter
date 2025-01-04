import { useState } from "react";
import NavTabs from "./NavTabs";
import Home from "./pages/Home";
import Character from "./pages/Character";
import Armory from "./pages/Armory";
import Login from "./pages/Login";
import Footer from "./Footer";


export default function ProfileContainer() {
    const [currentPage, setCurrentPage] = useState('Home');

    const renderPage = () => {
      if (currentPage === 'Home') {
        return <Home />;
      }
      if (currentPage === 'Character') {
        return <Character />;
      }
      if (currentPage === 'Armory') {
        return <Armory />;
      }
      if (currentPage === 'Login') {
        return <Login />
        
      }
    };

    const handlePageChange = (page) => setCurrentPage(page);
  
    return (
      <div>
        <header>
         
          <NavTabs currentPage={currentPage} handlePageChange={handlePageChange}  />
          
        </header>
        <div>
          <main className="mx-3">{renderPage()}</main>
          <Footer />
        </div>
      </div>
    );
    
  }
