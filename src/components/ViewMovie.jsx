import React, { useState } from "react";
import { Container, Card, Button, Row, Col, InputGroup, FormControl, Form, Modal } from 'react-bootstrap';
import Swal from "sweetalert2";


export default function ViewMovie ({ movie, fetchData, isAdmin }) {
  const [comment, setComment] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  const openEdit = () => {
    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
  };

  const addComment = (e) => {
    e.preventDefault();
    fetch(`https://movieapp-api-lms1.onrender.com/movies/addComment/${movie._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
    	comment: comment
      }),
    })
      .then((res) => res.json())
      .then((data) => {
      	console.log(data)
        if (data.error !== 'Error in updating a movie.' || data.error !== 'Movie not found') {
          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Comment Successfully Added",
            customClass: {
              confirmButton: 'sweet-warning',
            },
          });  
        } else {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Please try again",
            customClass: {
              confirmButton: 'sweet-warning',
            },
          });
          console.log(data.error)
        }
      	setComment("")
        fetchData();
      });
  };

  return (
    <>
      <Button className="btnUpdate" variant="primary" size="sm" onClick={openEdit}>
        Details
      </Button>

      <Modal id="create-modal" show={showEdit} onHide={closeEdit}>
        <Container className="mt-5">
          <Row>
            <Col>
              <Card>
                <Card.Body className="p-0">
                  <Card.Title className="text-center bg-dark text-white p-2">
                    {movie.title}
                  </Card.Title>
                  <Card.Text className="m-2 text-center">{movie.description}</Card.Text>
                  <Card.Text className="m-2 text-center">{movie.genre}</Card.Text>
                  <Card.Footer>
                    <Card.Text className="text-center">{movie.director} - {movie.year}</Card.Text>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>


          <Form onSubmit={addComment}>
            <Modal.Header>
              <Modal.Title>Comments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="movieComment">
                <Form.Label>Add Comment</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>
              {movie.comments && movie.comments.length > 0 ? (
                movie.comments.map((commentItem) => (
                  <Col key={commentItem._id} className="my-2">
                    <Card className="card h-100">
                      <Card.Body className="cardBody">
                        <Card.Title className="custom-card-title">User: {commentItem.userId}</Card.Title>
                        <Card.Text className="custom-card-description">{commentItem.comment}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p className = "my-4">No comments available</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeEdit}>
                Close
              </Button>
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        
      </Modal>
    </>
  );
};

