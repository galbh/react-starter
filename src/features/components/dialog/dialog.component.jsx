import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import propTypes from 'prop-types';
import { CloseDialogAction } from '../../../common/state/dialog/dialog.actions';
import styles from './dialog.component.scss';
import dialogTypes from '../../../common/state/dialog/dialog-types.json';

const FullPageDialogStyle = {
  width: 'calc(100% - 40px)',
  height: '100%',
  maxWidth: 'none',
  maxHeight: 'none'
};

const DialogComponent = (props) => {
  const isFullPage = props.type === dialogTypes.full;
  const baseClass = `${styles.dialog} dialog`;
  const fullPageClass = `${baseClass} ${styles.fullPage}`;

  return (
    <Dialog
      style={props.isRtl ? { direction: 'rtl' } : null}
      open={props.open}
      title={props.title}
      onRequestClose={() => props.dispatch(new CloseDialogAction())}
      className={isFullPage ? fullPageClass : baseClass}
      titleClassName={styles.title}
      autoScrollBodyContent
      autoDetectWindowHeight
      contentStyle={isFullPage ? FullPageDialogStyle : null}
    >
      <i
        role="presentation"
        className={
          props.isRtl
            ? `material-icons ${styles.closeIconRtl}`
            : `material-icons ${styles.closeIcon}`}
        onClick={() => props.dispatch(new CloseDialogAction())}
      >
        clear
      </i>
      {props.component}
    </Dialog>
  );
};

DialogComponent.propTypes = {
  open: propTypes.bool.isRequired,
  title: propTypes.string.isRequired,
  type: propTypes.string,
  component: propTypes.oneOfType([propTypes.element, propTypes.string]),
  dispatch: propTypes.func.isRequired,
  isRtl: propTypes.bool.isRequired
};

DialogComponent.defaultProps = {
  component: '',
  type: ''
};

function mapStateToProps (state) {
  return { isRtl: state.shared.isRtl() };
}
export default connect(mapStateToProps)(DialogComponent);
