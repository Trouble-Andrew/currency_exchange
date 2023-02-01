import { useGlobalContext } from '@/contexts';
import useTimeseries from '@/hooks/useTimeseries';
import { objectToArray } from '@/utils/objectToArray';
import { Box, CircularProgress, useMediaQuery } from '@mui/material';
import { Rates } from 'models/Rates';
import { memo } from 'react';
import * as V from 'victory';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryCursorContainer,
  VictoryLabel,
  LineSegment,
} from 'victory';
import styles from './Chart.module.scss';
import { theme } from './theme';

interface CartProps {
  interval: string;
}

const Chart = memo(function Chart({ interval }: CartProps) {
  const { from, to } = useGlobalContext();
  const { timeseries, isLoading, isError } = useTimeseries(from, interval);
  const timeseriesArray = timeseries ? objectToArray(timeseries?.rates) : [];
  const matchesSm = useMediaQuery('(max-width:767px)');

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        flexGrow: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
      }}
    >
      {isLoading && <CircularProgress color="success" size={40} />}
      {timeseries && (
        <VictoryChart
          domainPadding={{ x: [20, 15], y: 5 }}
          padding={{
            top: 20,
            bottom: 20,
            left: matchesSm ? 20 : 20,
            right: matchesSm ? 5 : 20,
          }}
          height={150}
          width={matchesSm ? 200 : 600}
          theme={theme}
          containerComponent={
            <VictoryCursorContainer
              cursorDimension="x"
              cursorLabel={({ datum }) => {
                const data = timeseriesArray[Math.floor(datum.x)];
                const rates = data?.value as Rates;

                if (data?.key) {
                  return `${rates[to]} ${to}\n${data?.key
                    .split('-')
                    .reverse()
                    .join('.')}`;
                } else {
                  return;
                }
              }}
              cursorComponent={
                <LineSegment style={{ stroke: 'var(--color-white)' }} />
              }
              cursorLabelComponent={
                <VictoryLabel
                  style={{ fill: 'var(--color-white)', fontSize: '8px' }}
                  dx={-30}
                  dy={-5}
                  backgroundPadding={[3, { left: 20, right: 20 }, { left: 20 }]}
                  className={styles.label}
                />
              }
            />
          }
        >
          <VictoryAxis
            crossAxis
            offsetY={20}
            tickCount={matchesSm ? 3 : 6}
            tickFormat={(t) => `${t.split('-').reverse().join('.')}`}
            style={{
              grid: { stroke: 'transparent' },
              tickLabels: { padding: 5, fontSize: '8px' },
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
          />

          <VictoryAxis
            dependentAxis
            tickCount={6}
            offsetX={matchesSm ? 5 : 20}
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
