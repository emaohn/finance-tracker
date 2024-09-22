import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import getTags from "../firebaseHelpers/firestoreHelper"

const createNewStr = "Create new tag '";

export default function TagsEditor({
  tags,
  onTagsUpdated,
  primaryTag,
  setPrimaryTag,
}) {
  const [tagOptions, setTagOptions] = React.useState([
    "dining",
    "travel",
    "grocery",
    "shopping",
    "rent",
  ]);
  const [addTags, setAddTags] = React.useState(false)
  const [tagInput, setTagInput] = React.useState("");
  const [tagValue, setTagValue] = React.useState(null);

  React.useEffect(() => {
    setTagOptions(getTags())
  }, []);

  const createNewTag = (newTag) => {
    setTagOptions((prevTags) => [...prevTags, formatTag(newTag)]);
  };

  const tagExists = (tag) => {
    return tagOptions.includes(formatTag(tag));
  };

  const formatTag = (tagStr) => {
    return tagStr.trim().toLowerCase();
  };

  const getTags = () => {
    if (tagInput !== "" && !tagExists(tagInput)) {
      return tagOptions.concat([createNewStr + formatTag(tagInput) + "'"]);
    }
    return tagOptions;
  };

  const addTag = (tag) => {
    if (tags.length == 0) {
      setPrimaryTag(tag);
    }
    onTagsUpdated((prevTags) => [...prevTags, formatTag(tag)]);

    console.log(tags)
  };

  const removeTag = (tagToRemove) => {
    onTagsUpdated((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));

    if (tags.length == 0) {
        setPrimaryTag(null)
    }
  };

  const handleBlur = () => {
    // If the user didn't type anything and clicks away in tag text field,
    // hide the text field and reset its value
    if (tagInput.trim() === '') {
      setAddTags(false);
      setTagInput('');
    }
  };

  if (tags) {
    console.log("primary tag: ", primaryTag);
    console.log("tags: ", tags);
    console.log("heeelsdkjasd");
    return (
      <Grid container direction="column" spacing={2}>
        <Grid></Grid>
        <Grid container item>
          {tags.length > 0 ? (
            <Grid container item direction="column" spacing={2}>
              <Grid item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Primary Tag</InputLabel>
                  <Select
                    value={primaryTag}
                    onChange={(event) => setPrimaryTag(event.target.value)}
                    renderValue={(selected) => (
                      <Chip label={selected} style={{ margin: "4px" }} />
                    )}
                  >
                    {tags.map((tag, index) => (
                      <MenuItem value={tag} key={index}>
                        {tag}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sx={{ minHeight: tags.length > 0 ? "50px" : "0px" }}>
                {[...tags, "+ add tag"].map((tag, i) =>
                  tag == "+ add tag" ? (
                    <Chip label={tag} key={i} style={{ margin: "4px" }} onClick={() => setAddTags(true)}/>
                  ) : (
                    <Chip
                      label={tag}
                      key={i}
                      onDelete={() => removeTag(tag)}
                      style={{ margin: "4px" }}
                    />
                  )
                )}
              </Grid>
            </Grid>
          ) : null}
        </Grid>
        <Grid item>
          {tags.length == 0 || addTags ? (
            <Autocomplete
              options={getTags()}
              getOptionLabel={(option) => option}
              value={tagValue}
              onChange={(event, newValue) => {
                if (newValue !== null && newValue.includes(createNewStr)) {
                  const newTag = newValue.split("'")[1];
                  createNewTag(newTag);
                  addTag(newTag);
                } else {
                  addTag(newValue);
                }
                setTagInput("");
                setTagValue(null);
                setAddTags(false)
              }}
              inputValue={tagInput}
              onInputChange={(event, newInputValue) => {
                setTagInput(newInputValue);
              }}
              autoHighlight
              renderInput={(params) => (
                <TextField {...params} label="Add Tags" variant="standard" autoFocus onBlur={handleBlur}/>
              )}
            ></Autocomplete>
          ) : null}
        </Grid>
      </Grid>
    );
  }
  return null;
}
