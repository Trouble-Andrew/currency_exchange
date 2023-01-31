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

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

const Chart = memo(function Chart() {
  const { from, to } = useGlobalContext();
  // fetch(
  //   'https://gist.githubusercontent.com/Trouble-Andrew/a3455838c45b3fd4e6d2c27f4daea020/raw/8b9687206d94d315e2f3609081adbaedcbc14d76/rub.json',
  // )
  //   .then((res) => res.json())
  //   .then((data) => data.rates)
  //   .then((rates) => objectToArray(rates))
  //   .then((rates) => console.log(rates));
  const { timeseries, isLoading, isError } = useTimeseries(from);
  const timeseriesArray = timeseries ? objectToArray(timeseries?.rates) : [];

  console.log(timeseries);
  console.log(isLoading);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '5px',
        backgroundColor: 'var(--color-background-grey-dark)',
        // maxWidth: '45rem',
        minHeight: '20rem',
        p: '15px',
        m: '0 auto',
        mb: '1rem',
      }}
    >
      {isLoading && <CircularProgress color="success" size={40} />}
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
