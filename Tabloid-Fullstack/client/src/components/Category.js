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

const Category = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);
    const [categoryEdits, setCategoryEdits] = useState("");
    const category = props.category;
    
  const showEditForm = () => {
    setIsEditing(true);
    setCategoryEdits(category.name);
  };

  const hideEditForm = () => {
    setIsEditing(false);
    setCategoryEdits("");
    };

    const editCategory = () => {
        if (categoryEdits.length != 0) {
            const categoryToChange = { name: categoryEdits }
            props.edit(category.id, categoryToChange);
            hideEditForm();
        } else {
            showEditForm();
        }
    }

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
                          <Button onClick={() => {
                              editCategory();
                          }}>Save</Button>
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
                  <Button className="btn btn-outline-danger" onClick={() => {
                      props.delete(category.id);
                      setPendingDelete(false);
                  }} > Yes, Delete</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Category;
