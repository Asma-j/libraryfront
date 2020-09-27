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

export default function BooksPage(props) {
  const [books, setBooks] = React.useState(null);
  const [activeBook, setActiveBook] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [error, setError] = React.useState("");
  const [errorDelete, setDeleteError] = React.useState("");
  const [errorUpdate, setUpdateError] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [pages, setPages] = React.useState("");

  React.useEffect(() => {
    const getBooks = async () => {
      await axios
        .get("http://localhost:8081/books")
        .then((res) => {
          setBooks(res.data);
        })
        .catch((e) => {
          setError(e.message);
        });
    };
    getBooks();
  }, [books]);

  const submitBook = async (book) => {
    await axios
      .post("http://localhost:8081/books", book)
      .then(() => {
        setShow(false);
        setBooks(books);
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  const updateBook = async () => {
    await axios
      .put("http://localhost:8081/books/" + activeBook._id, activeBook)
      .then(() => {
        setShowUpdate(false);
        setBooks(books);
      })
      .catch((e) => {
        setUpdateError(e.message);
      });
  };

  const handleClose = () => {
    setSubmitted(true);
    if (title && author && pages) {
      submitBook({ title, author, pages });
    }
  };
  const handleShow = () => setShow(true);

  const handleUpdateClose = () => {
    setSubmitted(true);
    if (activeBook.title && activeBook.author && activeBook.pages) {
      updateBook();
    }
  };
  const handleUpdateShow = () => setShowUpdate(true);

  const handleDeleteClose = async () => {
    await axios
      .delete("http://localhost:8081/books/" + activeBook._id)
      .then(() => {
        setShowDelete(false);
        setBooks(books);
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
              <h1>Books</h1>
              <Button onClick={handleShow} variant="success">
                Add
              </Button>
            </Card.Header>
            <Card.Body>
              <Table striped hover bordered>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Pages</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {books ? (
                    books.length > 0 ? (
                      books.map((book) => (
                        <tr key={book._id}>
                          <td>{book.title}</td>
                          <td>{book.author}</td>
                          <td>{book.pages}</td>
                          <td>
                            <ButtonGroup size="sm">
                              <Button
                                variant="danger"
                                onClick={() => {
                                  setActiveBook(book);
                                  handleDeleteShow();
                                }}
                              >
                                Delete
                              </Button>
                              <Button
                                variant="warning"
                                onClick={() => {
                                  setActiveBook(book);
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
                        <td className="text-center" colSpan="4">
                          No books available.
                        </td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td className="text-center" colSpan="4">
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
        <Modal.Header closeButton className="bg-success text-light">
          <Modal.Title>Add book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter book title"
              />
              {submitted && !title ? (
                <Form.Text className="text-danger">
                  Plese enter a title for the book!
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control
                onChange={(e) => setAuthor(e.target.value)}
                type="text"
                placeholder="Enter author name"
              />
              {submitted && !author ? (
                <Form.Text className="text-danger">
                  Plese enter the fullname of the author!
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group controlId="pages">
              <Form.Label>Pages number</Form.Label>
              <Form.Control
                onChange={(e) => setPages(e.target.value)}
                type="number"
                placeholder="Enter number of pages"
              />
              {submitted && !pages ? (
                <Form.Text className="text-danger">
                  Plese enter number of pages!
                </Form.Text>
              ) : null}
            </Form.Group>
          </Form>
          {error ? (
            <Alert variant="danger">
              Submit data of book failed because of {error}
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
      {activeBook && (
        <>
          <Modal show={showUpdate} onHide={handleUpdateClose}>
            <Modal.Header closeButton className="bg-warning">
              <Modal.Title>Update book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    value={activeBook.title}
                    onChange={(e) =>
                      setActiveBook({ ...activeBook, title: e.target.value })
                    }
                    type="text"
                    placeholder="Enter book title"
                  />
                  {submitted && !activeBook.title ? (
                    <Form.Text className="text-danger">
                      Plese enter a title for the book!
                    </Form.Text>
                  ) : null}
                </Form.Group>
                <Form.Group controlId="author">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    value={activeBook.author}
                    onChange={(e) =>
                      setActiveBook({ ...activeBook, author: e.target.value })
                    }
                    type="text"
                    placeholder="Enter author name"
                  />
                  {submitted && !activeBook.author ? (
                    <Form.Text className="text-danger">
                      Plese enter the fullname of the author!
                    </Form.Text>
                  ) : null}
                </Form.Group>
                <Form.Group controlId="pages">
                  <Form.Label>Pages number</Form.Label>
                  <Form.Control
                    value={activeBook.pages}
                    onChange={(e) =>
                      setActiveBook({ ...activeBook, pages: e.target.value })
                    }
                    type="number"
                    placeholder="Enter number of pages"
                  />
                  {submitted && !activeBook.pages ? (
                    <Form.Text className="text-danger">
                      Plese enter number of pages!
                    </Form.Text>
                  ) : null}
                </Form.Group>
              </Form>
              {errorUpdate ? (
                <Alert variant="danger">
                  Update data of book failed because of {errorUpdate}
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
            <Modal.Header closeButton className="bg-danger text-light">
              <Modal.Title>Delete book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you really want to delete "{activeBook ? activeBook.title : ""}
              "?
              {errorDelete ? (
                <Alert variant="danger">
                  Delete book failed because of {errorDelete}
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
