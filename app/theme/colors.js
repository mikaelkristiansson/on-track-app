const app = {
  background: '#E9EBEE',
  cardBackground: '#FFFFFF',
  listItemBackground: '#FFFFFF',
};
  
const brand = {
  brand: {
    primary: '#fa3d4b',//'#0E4EF8',
    secondary: '#673ab7',//'#17233D',
  },
};
  
const text = {
  textPrimary: '#15182D',//'#222222',
  textSecondary: '#BABDC2',//'#777777',
  headingPrimary: brand.brand.primary,
  headingSecondary: brand.brand.primary,
};
  
const borders = {
  border: '#BABDC2'//'#D0D1D5',
};
  
const tabbar = {
  tabbar: {
    background: '#ffffff',
    border: '#eee',
    iconDefault: '#BABDC2', //'#333'
    iconSelected: '#444',
    iconMiddleBg: brand.brand.primary,
    iconMiddleColor: '#fff'
  },
};

const indicator = {
  spinner: '#ffffff'
};
  
export default {
  ...app,
  ...brand,
  ...text,
  ...borders,
  ...tabbar,
  ...indicator,
};
  