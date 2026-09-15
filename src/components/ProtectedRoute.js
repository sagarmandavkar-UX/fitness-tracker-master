// src/components/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const ProtectedRoute = ({ element: Component, isSubscribed, showPopup, setShowPopup, ...rest }) => {
  return (
    <>
      <Route
        {...rest}
        element={
          isSubscribed ? (
            <Component />
          ) : (
            <>
              <Navigate to="/pricing" />
              {showPopup && (
                <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
                  <DialogTitle>Subscription Required</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      To access this feature, please subscribe to our premium plan.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setShowPopup(false)} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              )}
            </>
          )
        }
      />
    </>
  );
};

export default ProtectedRoute;
