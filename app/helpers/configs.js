import { AppColors, AppStyles } from '../theme';

export default {

  // Build Configuration - eg. Debug or Release?
  DEV: __DEV__,

  // Google Analytics - uses a 'dev' account while we're testing
  // gaTrackingId: (__DEV__) ? 'UA-84284256-2' : 'UA-84284256-1',

  // URLs
  urls: {
  },

  // Navbar Props
  navbarProps: {
    //hideNavBar: true,
    titleStyle: AppStyles.navbarTitle,
    navigationBarStyle: AppStyles.navbar,
    // leftButtonIconStyle: AppStyles.navbarButton,
    // leftButtonStyle: AppStyles.navbarButton,
    // leftButtonTextStyle: AppStyles.navbarButton,
    navBarButtonColor: '#fff',
    //rightButtonIconStyle: AppStyles.navbarButton,
    sceneStyle: {
      //backgroundColor: AppColors.background,
      //paddingTop: AppSizes.navbarHeight,
    },
  },
};
