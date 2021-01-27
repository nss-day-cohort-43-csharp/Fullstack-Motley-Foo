import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom"
import { TagContext } from "../providers/TagProvider"
import { Button } from "reactstrap"
import WindowChecker from "../utils/WindowChecker";

const TagSearch = () => {
  const { tags, getActiveTags } = useContext(TagContext)
  const history = useHistory();

  useEffect(() => {
    WindowChecker()
    getActiveTags()
  }, []);

  return (
    <div className="col-2">
      {tags.map((tag) => (
        <Button className="btn btn-info m-1" key={tag.id} onClick={(e) => { history.push(`/search/tag/${tag.id}`) }}>{tag.name}</Button>
      ))}
    </div>
  );
};

export default TagSearch;