import { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export default function Register() {

    const navigate = useNavigate(); 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    function registerUser(e){
        e.preventDefault();

        fetch("https://movieapp-api-lms1.onrender.com/users/register", {

            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })

        })
        .then(res => res.json())
        .then(data => {

            if(data.message === "Registered Successfully"){
                setEmail("");
                setPassword("");
                setConfirmPassword("");

                Swal.fire({
                    title: "Registration Successful",
                    icon: "success",
                    text: "Thank you for registering!",
                    customClass: {
                        confirmButton: 'sweet-warning'
                    },
                }).then(() => {
                    navigate('/login');
                });

            }else if(data.error === "Email invalid"){
                Swal.fire({
                    title: "Invalid Email Format",
                    icon: "error",
                    text: "Invalid email format.",
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                })
          
            }else if(data.error === "Password must be atleast 8 characters"){
                Swal.fire({
                    title: "Password Invalid",
                    icon: "error",
                    text: "Password must be atleast 8 characters long.",
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                })
            }else{
                Swal.fire({
                    title: "Something went wrong.",
                    icon: "error",
                    text: "Please try again later or contact us for assistance.",
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });
            }
        })
    }

    useEffect(() => {
        if(( email !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword)){

            setIsActive(true)

        } else {

            setIsActive(false)

        }
    }, [ email, password, confirmPassword])

    return (
        (localStorage === 0 ) ?
     <Navigate to="/login" />
     :
     <Container className="register-container d-flex justify-content-center">
         <Row className="w-100">
            <Col sx={3} md={4} lg={5} className="mx-auto">
                 <Form onSubmit={(e) => registerUser(e)} className="register-form">
                     <h2 className="text-center">Register</h2>
                     <p className="text-center">Create your account.</p>
                     <Form.Group>
                     <Form.Label>Email Address </Form.Label>
                         <Form.Control
                             id="txtEmail"
                             type="email"
                             required
                             value={email}
                             onChange={e => { setEmail(e.target.value) }}
                         />
                     </Form.Group>
                     <Form.Group>
                     <Form.Label>Password </Form.Label>
                         <Form.Control
                             id="txtPassword"
                             type="password"
                             required
                             value={password}
                             onChange={e => { setPassword(e.target.value) }}
                         />
                     </Form.Group>
                     <Form.Group>
                     <Form.Label>Confirm Password </Form.Label>
                         <Form.Control
                             id="txtConfirmPassword"
                             type="password"
                             required
                             value={confirmPassword}
                             onChange={e => { setConfirmPassword(e.target.value) }}
                         />
                     </Form.Group>

                     {isActive ? 
                       <Button className="btn mt-3" variant="success" type="submit" id="submitBtn">Register Now</Button> 
                       : 
                       <Button className="btn mt-3" variant="danger" type="submit" id="submitBtn" disabled>Register Now</Button>
                     }
                 </Form>
            </Col>
        </Row>
    </Container>
     
    )
}