import React from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

export default function Books(props) {
  return (
    <Container>
      <Row>
        <Col md={6}>
          <h1> Books</h1>
        </Col>
        <Col md={6}>
          <Button variant="success">add</Button>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Pages</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((book, i) => (
              <tr key={i}>
                <td>1</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.pages}</td>
                <td>
                  <Button variant="danger">delete</Button>
                  <Button>update</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}
