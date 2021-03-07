// form operations -CHILD

import { Button, TextField, withStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import Useform from "./Useform";
import { connect } from "react-redux";
import * as actions from "../actions/postMessage";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";
const initialFieldValues = {
  title: "",
  message: "",
};

const styles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  postBtn: {
    width: "50%",
  },
});

const PostMessageForm = ({ classes, ...props }) => {
  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.postMessageList.find((x) => x._id === props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  var {
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    resetForm,
  } = Useform(initialFieldValues, props.setCurrentId);

  const validate = () => {
    let temp = { ...errors };
    temp.title = values.title ? "" : "This Field Is Required.";
    temp.message = values.message ? "" : "This Field Is Required.";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x == "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const onSuccess = () => {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Post Box"
            content="Submitted Successfully"
            scheme={Cinnamon.Crisp.SCHEME_PURPLE}
            icon={<AssignmentTurnedIn />}
          />
        ),
      });
      resetForm();
    };
    if (validate()) {
      if (props.currentId == 0) {
        props.createPostMessage(values, onSuccess);
      } else {
        props.updatePostMessage(props.currentId, values, onSuccess);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
      className={`${classes.root} ${classes.form}`}
    >
      <TextField
        name="title"
        variant="outlined"
        label="Title"
        fullWidth
        value={values.tittle}
        onChange={handleInputChange}
        {...(errors.message && { error: true, helperText: errors.title })}
      />

      <TextField
        name="message"
        variant="outlined"
        label="Message"
        fullWidth
        value={values.message}
        multiline
        rows={6}
        onChange={handleInputChange}
        {...(errors.message && { error: true, helperText: errors.message })}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.postBtn}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  postMessageList: state.postMessage.list,
});

const mapActionToProps = {
  createPostMessage: actions.Create,
  updatePostMessage: actions.Update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(PostMessageForm));
