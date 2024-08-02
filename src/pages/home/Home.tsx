import { MetersTable } from '@/components';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 16px;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const StyledSpan = styled.span`
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  margin-bottom: 16px;
`;

export const Home = () => {
  return (
    <PageWrapper>
      <StyledSpan>Список счетчиков</StyledSpan>
      <MetersTable />
    </PageWrapper>
  );
};
