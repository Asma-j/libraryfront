import React from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

export default function students(props) {
  return (
    <Container>
      <Row>
        <Col md={6}>
          <h1> Students</h1>
        </Col>
        <Col md={6}>
          <Button>add</Button>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th> name</th>
              <th>Class</th>
              <th>age</th>
              <th>tel</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((student, i) => (
              <tr key={i}>
                <td>{student.name}</td>
                <td>{student.Class}</td>
                <td>{student.age}</td>
                <td>{student.tel}</td>
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
    </Container>
  );
}
