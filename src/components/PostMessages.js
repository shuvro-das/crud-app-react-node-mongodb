//LIST OF RECORDS -parent

import {
  Button,
  Divider,
  Grid,
  List,
  ListItemText,
  Paper,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import ButterToast, { Cinnamon } from "butter-toast";
import { DeleteSweep } from "@material-ui/icons";
import * as actions from "../actions/postMessage";
import PostMessageForm from "./PostMessageForm";
// import BookingForm from "./BookingForm";
const styles = (theme) => ({
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(2),
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
});

//props.classes.paper
//const {classes, ...props} = props

const PostMessages = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.fetchAllPostMessages();
  }, []);
  const onDelete = (id) => {
    const onSuccess = () => {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Post Box"
            content="Deleted Successfully"
            scheme={Cinnamon.Crisp.SCHEME_PURPLE}
            icon={<DeleteSweep />}
          />
        ),
      });
    };
    if (window.confirm("Are You Sure to Delete This Record ?")) {
      props.deletePostMessage(id, onSuccess);
    }
  };
  return (
    <Grid container>
      <Grid item={true} xs={5}>
        <Paper className={classes.paper}>
          <PostMessageForm {...{ currentId, setCurrentId }} />
        </Paper>
      </Grid>
      <Grid xs={7}>
        <Paper className={classes.paper}>
          <List>
            {props.postMessageList.map((record, index) => {
              return (
                <Fragment key={index}>
                  <ListItemText>
                    <Typography variant="h5">{record.title}</Typography>
                    <div>{record.message}</div>
                    <div className={classes.actionDiv}>
                      <Button
                        className={classes.smMargin}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => setCurrentId(record._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        className={classes.smMargin}
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => onDelete(record._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </ListItemText>
                  <Divider component="li" />
                </Fragment>
              );
            })}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  postMessageList: state.postMessage.list,
});

const mapActionToProps = {
  fetchAllPostMessages: actions.fetchAll,
  deletePostMessage: actions.Delete,
};
//props.fetchAllpostMessages

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(PostMessages));
