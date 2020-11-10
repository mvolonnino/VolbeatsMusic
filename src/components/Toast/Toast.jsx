import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { useDataLayerValue } from "../../context/DataLayer";

import "./Toast.css";

function Toast() {
  const [{ alertMessage }, dispatch] = useDataLayerValue();

  const handleClose = () => {
    dispatch({
      type: "SET_ALERT_MESSAGE",
      alertMessage: {
        message: "",
        open: false,
      },
    });
  };

  return (
    <div className="toast">
      <Snackbar
        message={alertMessage?.message}
        open={alertMessage?.open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={3000}
      />
    </div>
  );
}

export default Toast;
