import { useGlobalContext } from '@/contexts';
import useTimeseries from '@/hooks/useTimeseries';
import { objectToArray } from '@/utils/objectToArray';
import { Box, CircularProgress } from '@mui/material';
import { memo } from 'react';
import * as V from 'victory';
import {
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryCursorContainer,
  VictoryLabel,
} from 'victory';
import { theme } from './theme';

interface CartProps {
  interval: string;
}

const Chart = memo(function Chart({ interval }: CartProps) {
  const { from, to } = useGlobalContext();
  const { timeseries, isLoading, isError } = useTimeseries(from, interval);
  const timeseriesArray = timeseries ? objectToArray(timeseries?.rates) : [];

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isLoading && (
        <CircularProgress color="success" size={40} sx={{ mt: '3rem' }} />
      )}
      {timeseries && (
        <VictoryChart
          domainPadding={{ x: 10, y: 10 }}
          padding={20}
          height={150}
          width={600}
          theme={theme}
        >
          <VictoryAxis
            crossAxis
            offsetY={20}
            tickCount={6}
            tickFormat={(t) => `${t.split('-').reverse().join('.')}`}
            style={{
              grid: { stroke: 'transparent' },
              tickLabels: { padding: 5 },
            }}
          />

          <VictoryLine
            // animate={{
            //   duration: 2000,
            //   onLoad: { duration: 1000 },
            // }}
            padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
            data={timeseriesArray}
            x="key"
            y={`value['${to.toUpperCase()}']`}
            style={{
              data: { stroke: '#c43a31', strokeWidth: '1px' },
            }}
            containerComponent={
              <VictoryCursorContainer
                cursorDimension="x"
                cursorLabel={({ datum }) => `${datum.x}, ${datum.y}`}
              />
            }
          />

          <VictoryAxis
            dependentAxis
            tickCount={6}
            offsetX={20}
            style={{
              grid: {
                stroke: '#fff',
                strokeOpacity: 0.3,
              },
              tickLabels: {
                textAnchor: 'start',
                verticalAnchor: 'start',
              },
            }}
          />
        </VictoryChart>
      )}
    </Box>
  );
});

export default Chart;
