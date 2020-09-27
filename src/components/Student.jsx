import React from "react";
import { Modal, Row, Col, Button, Table, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

export default function Student(props) {
  const [books, setBooks] = useState(null);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  React.useEffect(() => {
    const getBooks = async (book) => {
      await axios
        .post("http://localhost:8081/books", book)
        .then(() => {
          setBooks(false);
        })
        .catch((e) => {
          setError(e.message);
        });
    };
  });
  const submitBook = async (book) => {
    await axios
      .post("http://localhost:8081/books", book)
      .then(() => {
        setShow(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  };
  const handleClose = () => {
    setSubmitted(true);
    if (title && author && pages) {
      submitBook({ title, author, pages });
    }
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Row>
        <Col md={6}>
          <h1> Students</h1>
        </Col>
        <Col md={6}>
          <Button onClick={handleShow} variant="success">
            add
          </Button>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th> Name</th>
              <th>class</th>
              <th>age</th>
              <th>tel</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((students, i) => (
              <tr key={i}>
                <td>1</td>
                <td>{students.name}</td>
                <td>{students.class}</td>
                <td>{students.age}</td>
                <td>{students.tel}</td>
                <td>
                  {" "}
                  <Button variant="danger">delete</Button>
                  <Button>update</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-success text-light">
          <Modal.Title>add book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => e.preventDefault()}>
            {" "}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="enter title"
              />
              {submitted && !title ? (
                <Form.Text className="text-danger">
                  please enter the title for the book
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group controlId="author">
              <Form.Label>author</Form.Label>
              <Form.Control
                onChange={(e) => setAuthor(e.target.value)}
                type="text"
                placeholder="Enter author"
              />
              {submitted && !author ? (
                <Form.Text className="text-danger">
                  please enter the name of the author
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group controlId="pages">
              <Form.Label>pages</Form.Label>
              <Form.Control
                onChange={(e) => setPages(e.target.value)}
                type="email"
                placeholder="Enter pages"
              />
              {submitted && !pages ? (
                <Form.Text className="text-danger">
                  please enter the number of pages
                </Form.Text>
              ) : null}
            </Form.Group>
          </Form>
          {error ? (
            <Alert variant="danger"> submit failed because of {error} </Alert>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleClose}>
            validate
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
