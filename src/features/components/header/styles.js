import AppBar from '@material-ui/core/AppBar';
import styled from 'styled-components/macro';

export const Header = styled(AppBar)`  
  line-height: 60px;
  height: 60px!important;
  background-color: transparent!important;
  box-shadow: none!important;
  height: 64px;

  > div{
    padding-left: 18px;
    padding-right: 18px;
  }

  > div, svg{
    color: ${props => props.theme.primary_text_color}
  }
`;

export const Title = styled.div`
  flex-grow: 1;
  margin: 0 16px;
`;
