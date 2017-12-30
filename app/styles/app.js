import {StyleSheet} from 'react-native';
import { colors } from '../helpers/colors';

export default AppStyles = StyleSheet.create({
  // Navbar
  navbar: {
    backgroundColor: colors.brand.primary,
    borderBottomWidth: 0,
  },
  navbarTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    //fontFamily: Fonts.base.family,
    //fontSize: Fonts.base.size,
  },
  navbarButton: {
    tintColor: '#ffffff',
  },

  // TabBar
  tabbar: {
    backgroundColor: colors.tabbar.background,
    borderTopColor: colors.tabbar.border,
    borderTopWidth: 1,
  },
});