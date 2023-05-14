import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';



const LoadingButton = ({ label, onClick, loading }) => {
    return (
      <Button variant="contained" color="primary" disabled={loading} onClick={onClick}>
        {loading && <CircularProgress size={24} style={{ marginRight: 8 }} />}
        {label}
      </Button>
    );
  }



export default LoadingButton;