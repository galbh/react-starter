import AppBar from '@material-ui/core/AppBar';
import styled from 'styled-components/macro';

const Header = styled(AppBar)`
  line-height: 60px;
  height: 60px!important;

  > div{
      padding-left: 18px;
      padding-right: 18px;
  }

  svg{
    color: #fff;
  }
`;

export default Header;
