import { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import AddMovie from '../components/AddMovie'
import UpdateMovie from '../components/UpdateMovie'
import DeleteMovie from '../components/DeleteMovie'
import ViewMovie from '../components/ViewMovie'


export default function AdminView({ moviesData, fetchData, isAdmin }) {


    const [movies, setMovies] = useState([])

    useEffect(() => {

        const moviesArr = moviesData.map(movie => {
            return (
                <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.description}</td>
                    <td>{movie.genre}</td>
                    <td>{movie.year}</td>
                    <td>{movie.director}</td>
                    <td className="text-center">
                      <UpdateMovie movie={movie} fetchData={fetchData}/>
                      <DeleteMovie movie={movie._id} fetchData={fetchData}/>
                      <ViewMovie movie={movie} fetchData={fetchData} isAdmin={isAdmin}/>
                    </td>
                </tr>
                )
        })

        setMovies(moviesArr)

    }, [moviesData])


    return(
        <>
            <h2 className="text-center my-4"> Admin Dashboard</h2>
               <div className="d-flex justify-content-center align-items-center mb-4">
                <AddMovie fetchData={fetchData}/>
             </div>
            
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center table-dark">
                        <th>Title</th>
                        <th>Description</th>
                        <th>Genre</th>
                        <th>Year</th>
                        <th>Director</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {movies}
                </tbody>
            </Table>    
        </>

        )
}