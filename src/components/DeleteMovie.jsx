import React from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function RemoveItemFromCart({ movie, fetchData }) {

    const removeToggle = async () => {
   
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to remove this movie?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'No, cancel',
            customClass: {
                confirmButton: 'sweet-confirm',
                cancelButton: 'sweet-cancel'
            }
        });

        if (result.isConfirmed) {
      
            try {
                const response = await fetch(`https://movieapp-api-lms1.onrender.com/movies/deleteMovie/${movie}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data.message);

                if (data.error !== "Movie not deleted" || data.error !== "Error in deleting a movie." ) {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: 'Movie deleted successfully',
                        customClass: {
                            confirmButton: 'sweet-warning'
                        }
                    });
                 
                } else {
                    Swal.fire({
                        title: 'Something Went Wrong',
                        icon: 'error',
                        text: 'Please try again',
                        customClass: {
                            confirmButton: 'sweet-warning'
                        }
                    });
                }

            } catch (error) {
                console.error("Error:", error);
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Failed to remove movie. Please try again later.',
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });
            }
        } else if (result.isDismissed) {
          
            Swal.fire({
                title: 'Cancelled',
                text: 'Movie not deleted.',
                icon: 'info',
                customClass: {
                    confirmButton: 'sweet-warning'
                }
            });
        }
        fetchData();
    }

    return (
        <Button className="btnRemove me-2" variant="danger" size="sm" onClick={removeToggle}>
            Remove
        </Button>
    )
}
