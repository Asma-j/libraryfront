import React from "react";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  Table,
  ButtonGroup,
  Button,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";

export default function StudentsPage(props) {
  const [Students, setStudents] = React.useState(null);
  const [activeStudent, setActiveStudent] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [error, setError] = React.useState("");
  const [errorDelete, setDeleteError] = React.useState("");
  const [errorUpdate, setUpdateError] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [name, setname] = React.useState("");
  const [Class, setClass] = React.useState("");
  const [age, setage] = React.useState("");
  const [tel, settel] = React.useState("");
  React.useEffect(() => {
    const getStudents = async () => {
      await axios
        .get("http://localhost:8081/Students")
        .then((res) => {
          setStudents(res.data);
        })
        .catch((e) => {
          setError(e.message);
        });
    };
    getStudents();
  }, [Students]);

  const submitStudent = async (Student) => {
    await axios
      .post("http://localhost:8081/Students", Student)
      .then(() => {
        setShow(false);
        setStudents(Students);
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  const updateStudent = async () => {
    await axios
      .put("http://localhost:8081/Students/" + activeStudent._id, activeStudent)
      .then(() => {
        setShowUpdate(false);
        setStudents(Students);
      })
      .catch((e) => {
        setUpdateError(e.message);
      });
  };

  const handleClose = () => {
    setSubmitted(true);
    if (name && Class && age && tel) {
      submitStudent({ name, Class, age, tel });
    }
  };
  const handleShow = () => setShow(true);

  const handleUpdateClose = () => {
    setSubmitted(true);
    if (
      activeStudent.name &&
      activeStudent.Class &&
      activeStudent.age &&
      activeStudent.tel
    ) {
      updateStudent();
    }
  };
  const handleUpdateShow = () => setShowUpdate(true);

  const handleDeleteClose = async () => {
    await axios
      .delete("http://localhost:8081/Students/" + activeStudent._id)
      .then(() => {
        setShowDelete(false);
        setStudents(Students);
      })
      .catch((e) => {
        setDeleteError(e.message);
      });
  };
  const handleDeleteShow = () => setShowDelete(true);

  return (
    <>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <h1>Students</h1>
              <Button onClick={handleShow} variant="success">
                Add
              </Button>
            </Card.Header>
            <Card.Body>
              <Table striped hover bordered>
                <thead>
                  <tr>
                    <th> Name</th>
                    <th>Class</th>
                    <th>age</th>
                    <th>tel</th>

                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {Students ? (
                    Students.length > 0 ? (
                      Students.map((Student) => (
                        <tr key={Student._id}>
                          <td>{Student.name}</td>
                          <td>{Student.Class}</td>
                          <td>{Student.age}</td>
                          <td>{Student.tel}</td>
                          <td>
                            <ButtonGroup size="sm">
                              <Button
                                variant="danger"
                                onClick={() => {
                                  setActiveStudent(Student);
                                  handleDeleteShow();
                                }}
                              >
                                Delete
                              </Button>
                              <Button
                                variant="warning"
                                onClick={() => {
                                  setActiveStudent(Student);
                                  handleUpdateShow();
                                }}
                              >
                                Update
                              </Button>
                            </ButtonGroup>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td ClassName="text-center" colSpan="4">
                          No Students available.
                        </td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td ClassName="text-center" colSpan="4">
                        Loading...
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton ClassName="bg-success text-light">
          <Modal.name>Add Student</Modal.name>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={(e) => setname(e.target.value)}
                type="text"
                placeholder="Enter Student name"
              />
              {submitted && !name ? (
                <Form.Text ClassName="text-danger">
                  Plese enter a name for the Student!
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group controlId="Class">
              <Form.Label>Class</Form.Label>
              <Form.Control
                onChange={(e) => setClass(e.target.value)}
                type="text"
                placeholder="Enter Class name"
              />
              {submitted && !Class ? (
                <Form.Text ClassName="text-danger">
                  Plese enter the fullname of the Class!
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group controlId="age">
              <Form.Label>age number</Form.Label>
              <Form.Control
                onChange={(e) => setage(e.target.value)}
                type="number"
                placeholder="Enter number of age"
              />
              {submitted && !age ? (
                <Form.Text ClassName="text-danger">
                  Plese enter number of age!
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group controlId="tel">
              <Form.Label>tel number</Form.Label>
              <Form.Control
                onChange={(e) => settel(e.target.value)}
                type="number"
                placeholder="Enter number of tel"
              />
              {submitted && !tel ? (
                <Form.Text ClassName="text-danger">
                  Plese enter number of tel!
                </Form.Text>
              ) : null}
            </Form.Group>
          </Form>
          {error ? (
            <Alert variant="danger">
              Submit data of Student failed because of {error}
            </Alert>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleClose}>
            Validate
          </Button>
        </Modal.Footer>
      </Modal>
      {activeStudent && (
        <>
          <Modal show={showUpdate} onHide={handleUpdateClose}>
            <Modal.Header closeButton ClassName="bg-warning">
              <Modal.name>Update Student</Modal.name>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group controlId="name">
                  <Form.Label>name</Form.Label>
                  <Form.Control
                    value={activeStudent.name}
                    onChange={(e) =>
                      setActiveStudent({
                        ...activeStudent,
                        name: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Enter Student name"
                  />
                  {submitted && !activeStudent.name ? (
                    <Form.Text ClassName="text-danger">
                      Plese enter a name for the Student!
                    </Form.Text>
                  ) : null}
                </Form.Group>
                <Form.Group controlId="Class">
                  <Form.Label>Class</Form.Label>
                  <Form.Control
                    value={activeStudent.Class}
                    onChange={(e) =>
                      setActiveStudent({
                        ...activeStudent,
                        Class: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Enter Class name"
                  />
                  {submitted && !activeStudent.Class ? (
                    <Form.Text ClassName="text-danger">
                      Plese enter the fullname of the Class!
                    </Form.Text>
                  ) : null}
                </Form.Group>
                <Form.Group controlId="age">
                  <Form.Label>age number</Form.Label>
                  <Form.Control
                    value={activeStudent.age}
                    onChange={(e) =>
                      setActiveStudent({
                        ...activeStudent,
                        age: e.target.value,
                      })
                    }
                    type="number"
                    placeholder="Enter number of age"
                  />
                  {submitted && !activeStudent.age ? (
                    <Form.Text ClassName="text-danger">
                      Plese enter number of age!
                    </Form.Text>
                  ) : null}
                </Form.Group>
              </Form>
              {errorUpdate ? (
                <Alert variant="danger">
                  Update data of Student failed because of {errorUpdate}
                </Alert>
              ) : null}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleUpdateClose}>
                Close
              </Button>
              <Button variant="warning" onClick={handleUpdateClose}>
                Update
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showDelete} onHide={handleDeleteClose}>
            <Modal.Header closeButton ClassName="bg-danger text-light">
              <Modal.name>Delete Student</Modal.name>
            </Modal.Header>
            <Modal.Body>
              Do you really want to delete "
              {activeStudent ? activeStudent.name : ""}
              "?
              {errorDelete ? (
                <Alert variant="danger">
                  Delete Student failed because of {errorDelete}
                </Alert>
              ) : null}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleDeleteClose}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteClose}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}
