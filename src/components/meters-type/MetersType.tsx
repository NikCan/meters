import { MeterType } from '@/assets/types';
import { FC, memo, useMemo } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

interface Props {
  type: MeterType;
}
export const MetersType: FC<Props> = memo(({ type }) => {
  const content = useMemo(() => {
    switch (type) {
      case 'ColdWaterAreaMeter':
        return (
          <>
            <img src="/cold-water.svg" alt="cold" />
            <span>XBC</span>
          </>
        );
      case 'HotWaterAreaMeter':
        return (
          <>
            <img src="/hot-water.svg" alt="hot" />
            <span>ГBC</span>
          </>
        );
      default:
        return <span>{type}</span>;
    }
  }, [type]);

  return <StyledDiv>{content}</StyledDiv>;
});

MetersType.displayName = 'MetersType';
