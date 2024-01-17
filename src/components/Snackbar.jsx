/* eslint-disable react/prop-types */
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function AutoCloseSnackbar({ trigger, message }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (trigger) {
      setOpen(true);

      // Automatically close the Snackbar after 5 seconds
      setTimeout(() => {
        setOpen(false);
      }, 5000);
    }
  }, [trigger]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000} // Snackbar will close automatically, but we're manually closing it after 5 seconds
      onClose={handleClose}
      message={message || "Default Message"}
      action={action}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      ContentProps={{
        // Use ContentProps to style the Snackbar content
        style: {
          backgroundColor: "#e09696",
          color: "black",
          // Change the background color as needed
        },
      }}
    />
  );
}
