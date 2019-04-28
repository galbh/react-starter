import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Spinner from './styles';

const SpinnerComponent = () => <Spinner><CircularProgress size={100} /></Spinner>;

export default SpinnerComponent;
