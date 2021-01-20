import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import {
  Button,
  ButtonGroup,
  Form,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const Category = ({ category }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);
    const [categoryEdits, setCategoryEdits] = useState("");
    const { getToken} = useContext(UserProfileContext);

  const showEditForm = () => {
    setIsEditing(true);
    setCategoryEdits(category.name);
  };

  const hideEditForm = () => {
    setIsEditing(false);
    setCategoryEdits("");
    };

    const deleteCategory = (id) => {
        getToken().then((token) =>
            fetch(`/api/category/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        );
    };

  return (
    <div className="justify-content-between row">
      {isEditing ? (
        <Form className="w-100">
          <InputGroup>
            <Input
              bsSize="sm"
              onChange={(e) => setCategoryEdits(e.target.value)}
              value={categoryEdits}
            />
            <ButtonGroup size="sm">
              <Button onClick={showEditForm}>Save</Button>
              <Button outline color="danger" onClick={hideEditForm}>
                Cancel
              </Button>
            </ButtonGroup>
          </InputGroup>
        </Form>
      ) : (
          <>
            <div className="p-1">{category.name}</div>
            <ButtonGroup size="sm">
              <Button className="btn btn-primary" onClick={showEditForm}>
                Edit
            </Button>
              <Button
                className="btn btn-danger"
                onClick={(e) => setPendingDelete(true)}
              >
                Delete
            </Button>
            </ButtonGroup>
          </>
        )}
      {/* DELETE CONFIRM MODAL */}
      <Modal isOpen={pendingDelete}>
        <ModalHeader>Delele {category.name}?</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this category? This action cannot be
          undone.
        </ModalBody>
        <ModalFooter>
                  <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
                  <Button className="btn btn-outline-danger" onClick={() => deleteCategory(category.id)} > Yes, Delete</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Category;
