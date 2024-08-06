import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {


    return (
        <Row>
            <Col className="text-center mx-auto">
                <h1>Welcome to Movie Collections</h1>
                <p>Watch all your favorite movies here!</p>
                {(localStorage.length !== 0) ?
                <Link className="btn btn-primary" to={"/movies"}>See Movie Collections</Link>
                :
                <Link className="btn btn-primary" to={"/login"}>Login to start</Link>
            	}
            </Col>
        </Row>
    )
}