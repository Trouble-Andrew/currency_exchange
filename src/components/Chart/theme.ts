const colors = [
  '#252525',
  '#525252',
  '#737373',
  '#969696',
  '#bdbdbd',
  '#d9d9d9',
  '#f0f0f0',
];
const white = 'var(--color-white)';
const whiteOpacity = 'var(--color-white-opacity)';
const grey = '#969696';

// Typography
const letterSpacing = 'normal';
const fontSize = '8px';

// Layout
const baseProps = {
  width: 450,
  height: 300,
  padding: 50,
  colorScale: colors,
};

// Labels
const baseLabelStyles = {
  fontSize,
  fontFamily: 'var(--font-poppins)',
  letterSpacing,
  padding: -3,
  // marginBottom: 20,
  fill: white,
  stroke: 'transparent',
};

const centeredLabelStyles = Object.assign(
  { textAnchor: 'middle' },
  baseLabelStyles,
);

// Strokes
const strokeLinecap = 'round';
const strokeLinejoin = 'round';

// Put it all together...
export const theme = {
  area: Object.assign(
    {
      style: {
        data: {
          fill: white,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps,
  ),
  axis: Object.assign(
    {
      style: {
        axis: {
          fill: 'transparent',
          stroke: white,
          strokeWidth: 1,
          strokeLinecap,
          strokeLinejoin,
          strokeOpacity: 0.5,
        },
        axisLabel: Object.assign({}, centeredLabelStyles, {
          padding: 25,
        }),
        grid: {
          fill: 'none',
          stroke: white,
          strokeWidth: 0.5,
          pointerEvents: 'painted',
        },
        ticks: {
          fill: 'transparent',
          size: 1,
          stroke: 'transparent',
        },
        tickLabels: baseLabelStyles,
      },
    },
    baseProps,
  ),
  bar: Object.assign(
    {
      style: {
        data: {
          fill: white,
          padding: 8,
          strokeWidth: 0,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps,
  ),
  errorbar: Object.assign(
    {
      borderWidth: 8,
      style: {
        data: {
          fill: 'transparent',
          stroke: white,
          strokeWidth: 2,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps,
  ),
  group: Object.assign(
    {
      colorScale: colors,
    },
    baseProps,
  ),
  histogram: Object.assign(
    {
      style: {
        data: {
          fill: grey,
          stroke: white,
          strokeWidth: 2,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps,
  ),
  legend: {
    colorScale: colors,
    gutter: 10,
    orientation: 'vertical',
    titleOrientation: 'top',
    style: {
      data: {
        type: 'circle',
      },
      labels: baseLabelStyles,
      title: Object.assign({}, baseLabelStyles, { padding: 5 }),
    },
  },
  line: Object.assign(
    {
      style: {
        data: {
          fill: 'transparent',
          stroke: white,
          strokeWidth: 2,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps,
  ),
  tooltip: {
    style: Object.assign({}, baseLabelStyles, {
      padding: 0,
      pointerEvents: 'none',
    }),
    flyoutStyle: {
      stroke: white,
      strokeWidth: 1,
      fill: '#f0f0f0',
      pointerEvents: 'none',
    },
    flyoutPadding: 5,
    cornerRadius: 5,
    pointerLength: 10,
  },
};
