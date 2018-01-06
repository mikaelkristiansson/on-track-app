const app = {
  background: '#fff',//'#49477A',
  cardBackground: '#FFFFFF',
  listItemBackground: '#FFFFFF',
};
  
const brand = {
  brand: {
    primary: '#fa3d4b',//'#0E4EF8',
    primaryOpacity: 'rgba(250, 61, 75, .4)',
    secondary: '#673ab7'//'#17233D',
  },
};
  
const text = {
  textPrimary: '#15182D',//'#222222',
  textSecondary: '#BABDC2',//'#777777',
  textThirdly: '#D0D1D5',
  headingPrimary: brand.brand.primary,
  headingSecondary: brand.brand.primary,
};
  
const borders = {
  border: '#D0D1D5',
};
  
const tabbar = {
  tabbar: {
    background: '#ffffff',
    border: '#eee',
    iconDefault: '#BABDC2', //'#333'
    iconSelected: text.primary,
    iconMiddleBg: brand.brand.primary,
    iconMiddleColor: '#fff'
  },
};

const indicator = {
  spinner: '#ffffff'
};

const textInput = {
  input: '#444'
};

const victory = {
  chart: {
    line: brand.brand.primary,//'#20E5FF',
    fill: brand.brand.primaryOpacity,//'rgba(11,205,253, .4)',
    scatter: app.background,
    scatterBorder: brand.brand.primary//'#20E5FF'
  }
};
  
export default {
  ...app,
  ...brand,
  ...text,
  ...borders,
  ...tabbar,
  ...indicator,
  ...textInput,
  ...victory,
};
  