import React, { useState, useContext } from "react";
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
import { TagContext } from "../providers/TagProvider"

const Tag = ({ tag }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);
  const [tagEdits, setTagEdits] = useState("");
  const { editTag, deactivateTag } = useContext(TagContext);

  const showEditForm = () => {
    setIsEditing(true);
    setTagEdits(tag.name);
  };

  const hideEditForm = () => {
    setIsEditing(false);
    setTagEdits("");
  };

  const createEditTag = () => {
    tag.name = tagEdits;
  };

  const createDeactiveTag = () => {
    tag.active = 0;
  }

  return (
    <div className="justify-content-between row">
      {isEditing ? (
        <Form className="w-100">
          <InputGroup>
            <Input
              bsSize="sm"
              onChange={(e) => setTagEdits(e.target.value)}
              value={tagEdits}
            />
            <ButtonGroup size="sm">
              <Button onClick={(e) => {
                createEditTag();
                editTag(tag)
                hideEditForm()
              }}>Save</Button>
              <Button outline color="danger" onClick={hideEditForm}>
                Cancel
              </Button>
            </ButtonGroup>
          </InputGroup>
        </Form>
      ) : (
          <>
            <div className="p-1">{tag.name}</div>
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
        <ModalHeader>Delele {tag.name}?</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this tag? This action cannot be
          undone.
        </ModalBody>
        <ModalFooter>
          <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
          <Button className="btn btn-outline-danger" onClick={(e) => {
            createDeactiveTag();
            deactivateTag(tag);
            setPendingDelete(false);
            Modal.isOpen = { pendingDelete }
          }}>Yes, Delete</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Tag;
