import styled from 'styled-components';

export default styled.div`
  padding: ${({ theme }) => theme.frame_padding};
  overflow: auto;
  height: calc(100vh - 124px);
  background: ${({ theme }) => theme.primary_background_color};
`;
