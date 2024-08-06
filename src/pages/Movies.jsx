import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';



export default function MoviesCatalog() {

    const [movies, setMovies] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

 useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded.isAdmin);
        if (decoded.isAdmin === true){
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        setIsAdmin(false);
      }
    }
  }, []);

    const fetchData = () => {
        let fetchUrl = "https://movieapp-api-lms1.onrender.com/movies/getMovies"

        fetch(fetchUrl, {
            
        })
        .then(res => res.json())
        .then(data => {         
            
            if(data.message === "Error finding movies"){
                setMovies([])
            } else {
                setMovies(data.movies);
            }
        });
    }

   useEffect(() => {

        fetchData();

    }, []);

    return(
     
        (isAdmin === true)?
            <AdminView moviesData={movies} fetchData={fetchData} isAdmin={isAdmin}/>
        :
            <UserView moviesData={movies} fetchData={fetchData}/>
            
    )
}