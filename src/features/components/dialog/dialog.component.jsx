import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent } from '@material-ui/core';

const DialogComponent = ({
  component, title, closeDialog, open, isRtl
}) => (
  <Dialog
    style={isRtl ? { direction: 'rtl' } : null}
    open={open}
    onClose={() => closeDialog()}
  >
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{component}</DialogContent>
  </Dialog>
);

DialogComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  isRtl: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired
};

DialogComponent.defaultProps = { title: '', isRtl: false };

export default DialogComponent;
