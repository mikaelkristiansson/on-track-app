import Colors from './colors';
// import Fonts from './fonts';
// import Sizes from './sizes';
export default {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingTop: 30
  },
  text: {
    fontFamily: 'Avenir',
  },
  bold: {
    fontWeight: 'bold'
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightContent: {
    alignItems: 'flex-end'
  },
  buttonText: {
    fontFamily: 'Avenir',
    fontSize: 16,
    padding: 10,
    width: '100%',
    textAlign: 'center',
    fontWeight: '700',
    backgroundColor: Colors.brand.secondary,
    color: '#fff',
    borderRadius: 20,
    overflow: 'hidden'
  },
  buttonWrapper: {
    //backgroundColor:'#D3D3D3',
    marginBottom: 10,
    marginTop: 10,
    width: 300,
    borderRadius: 100,
    alignItems: 'center',
    //borderWidth: 2,
    //borderColor: colors.red
  },
  smallButtonText: {
    fontFamily: 'Avenir',
    fontSize: 16,
    padding: 5,
    //width: '100%',
    textAlign: 'center',
    fontWeight: '700',
    //backgroundColor: colors.red,
    color: Colors.brand.primary,//'#fff',
    borderRadius: 15,
    overflow: 'hidden'
  },
  smallButtonWrapper: {
    //backgroundColor:'#D3D3D3',
    marginBottom: 10,
    marginTop: 10,
    width: 100,
    borderRadius: 100,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.brand.primary
  },
  buttonContainer: {
    backgroundColor: Colors.brand.primary,
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 10
  },
  button: {
    fontFamily: 'Avenir',
    color: '#FFFFFF',
    fontSize: 18,
  },
  tabcontainer: {
    flex: 1,
    backgroundColor: 'transparent',
    maxHeight: 41,
    marginBottom: 0
  },
  tabbar: {
    backgroundColor: 'transparent',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  tab: {
    width: 120,
  },
  // Navbar
  navbar: {
    backgroundColor: '#fff',//Colors.brand.primary,
    borderBottomWidth: 0,
    height: 30
  },
  navbarTitle: {
    color: Colors.textPrimary,//'#ffffff',
    fontWeight: '400',
    // fontFamily: Fonts.base.family,
    // fontSize: Fonts.base.size,
  },
  navbarButton: {
    tintColor: '#ffffff',
    color: '#fff',
  },
  indicator: {
    marginBottom: -1,
    backgroundColor: Colors.brand.primary,
  },
  label: {
    color: Colors.textPrimary,
    fontWeight: '400',
  },
  form: {
    width: 300
  },
  image: {
    margin: 10
  },
  inputText: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD'
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: 'transparent'
  },
  title: {
    fontSize: 40,
    margin: 10,
    textAlign: 'center',
    color: Colors.brand.secondary,
    marginBottom: 30
  },
  h3: {
    fontSize: 40,
    textAlign: 'center',
    paddingBottom: 0,
    paddingTop: 10,
    fontWeight: 'bold'
  },
  h4: {
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 10
  },
  sub: {
    fontStyle: 'italic',
    color: '#999',
    paddingBottom: 20
  },
  statsTitle: {
    fontWeight: '500'
  },
  purpleText: {
    color: Colors.brand.secondary
  },
  statsNumber: {
    fontSize: 26,
    fontWeight: '600'
  },
  pickerModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  pickerButtonContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    padding: 6,
    backgroundColor: '#ececec',
  },
  modalPicker: {
    backgroundColor: '#fff'
  },
  settings: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 60
  },
  profile: {
    padding: 10,
    marginTop: 20,
    paddingTop: 0,
    //borderBottomWidth: StyleSheet.hairlineWidth,
    //borderColor: AppColors.border
    //flexDirection: 'row'
  },
  profileName: {
    fontWeight: '400',
    fontSize: 20,
    fontFamily: 'Avenir',
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  roundedProfileImage: {
    width:100,
    height:100,
    //borderWidth:3,
    //borderColor: '#fff',
    borderRadius:50,
    overflow: 'hidden'
  }
};
// export default {
//   appContainer: {
//     backgroundColor: '#000',
//   },

//   // Default
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: Colors.background,
//   },
//   containerCentered: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   //   windowSize: {
//   //     height: Sizes.screen.height,
//   //     width: Sizes.screen.width,
//   //   },

//   // Aligning items
//   leftAligned: {
//     alignItems: 'flex-start',
//   },
//   centerAligned: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   rightAligned: {
//     alignItems: 'flex-end',
//   },

//   // Text Styles
//   baseText: {
//     // fontFamily: Fonts.base.family,
//     // fontSize: Fonts.base.size,
//     // lineHeight: Fonts.base.lineHeight,
//     color: Colors.textPrimary,
//     fontWeight: '300',
//   },
//   p: {
//     // fontFamily: Fonts.base.family,
//     // fontSize: Fonts.base.size,
//     // lineHeight: Fonts.base.lineHeight,
//     color: Colors.textPrimary,
//     fontWeight: '300',
//     marginBottom: 8,
//   },
//   h1: {
//     // fontFamily: Fonts.h1.family,
//     // fontSize: Fonts.h1.size,
//     // lineHeight: Fonts.h1.lineHeight,
//     color: Colors.headingPrimary,
//     fontWeight: '800',
//     margin: 0,
//     marginBottom: 4,
//     left: 0,
//     right: 0,
//   },
//   h2: {
//     // fontFamily: Fonts.h2.family,
//     // fontSize: Fonts.h2.size,
//     // lineHeight: Fonts.h2.lineHeight,
//     color: Colors.headingPrimary,
//     fontWeight: '800',
//     margin: 0,
//     marginBottom: 4,
//     left: 0,
//     right: 0,
//   },
//   h3: {
//     // fontFamily: Fonts.h3.family,
//     // fontSize: Fonts.h3.size,
//     // lineHeight: Fonts.h3.lineHeight,
//     color: Colors.headingPrimary,
//     fontWeight: '500',
//     margin: 0,
//     marginBottom: 4,
//     left: 0,
//     right: 0,
//   },
//   h4: {
//     // fontFamily: Fonts.h4.family,
//     // fontSize: Fonts.h4.size,
//     // lineHeight: Fonts.h4.lineHeight,
//     color: Colors.headingPrimary,
//     fontWeight: '800',
//     margin: 0,
//     marginBottom: 4,
//     left: 0,
//     right: 0,
//   },
//   h5: {
//     // fontFamily: Fonts.h5.family,
//     // fontSize: Fonts.h5.size,
//     // lineHeight: Fonts.h5.lineHeight,
//     color: Colors.headingPrimary,
//     fontWeight: '800',
//     margin: 0,
//     marginTop: 4,
//     marginBottom: 4,
//     left: 0,
//     right: 0,
//   },
//   strong: {
//     fontWeight: '900',
//   },
//   link: {
//     textDecorationLine: 'underline',
//     color: Colors.brand.primary,
//   },
//   subtext: {
//     // fontFamily: Fonts.base.family,
//     // fontSize: Fonts.base.size * 0.8,
//     // lineHeight: parseInt(Fonts.base.lineHeight * 0.8, 10),
//     color: Colors.textSecondary,
//     fontWeight: '500',
//   },

//   // Helper Text Styles
//   textCenterAligned: {
//     textAlign: 'center',
//   },
//   textRightAligned: {
//     textAlign: 'right',
//   },

//   // Give me padding
//   //   padding: {
//   //     paddingVertical: Sizes.padding,
//   //     paddingHorizontal: Sizes.padding,
//   //   },
//   //   paddingHorizontal: {
//   //     paddingHorizontal: Sizes.padding,
//   //   },
//   //   paddingLeft: {
//   //     paddingLeft: Sizes.padding,
//   //   },
//   //   paddingRight: {
//   //     paddingRight: Sizes.padding,
//   //   },
//   //   paddingVertical: {
//   //     paddingVertical: Sizes.padding,
//   //   },
//   //   paddingTop: {
//   //     paddingTop: Sizes.padding,
//   //   },
//   //   paddingBottom: {
//   //     paddingBottom: Sizes.padding,
//   //   },
//   //   paddingSml: {
//   //     paddingVertical: Sizes.paddingSml,
//   //     paddingHorizontal: Sizes.paddingSml,
//   //   },
//   //   paddingHorizontalSml: {
//   //     paddingHorizontal: Sizes.paddingSml,
//   //   },
//   //   paddingLeftSml: {
//   //     paddingLeft: Sizes.paddingSml,
//   //   },
//   //   paddingRightSml: {
//   //     paddingRight: Sizes.paddingSml,
//   //   },
//   //   paddingVerticalSml: {
//   //     paddingVertical: Sizes.paddingSml,
//   //   },
//   //   paddingTopSml: {
//   //     paddingTop: Sizes.paddingSml,
//   //   },
//   //   paddingBottomSml: {
//   //     paddingBottom: Sizes.paddingSml,
//   //   },

//   // General HTML-like Elements
//   hr: {
//     left: 0,
//     right: 0,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.border,
//     height: 1,
//     backgroundColor: 'transparent',
//     // marginTop: Sizes.padding,
//     // marginBottom: Sizes.padding,
//   },

//   // Grid
//   row: {
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//   },
//   flex1: {
//     flex: 1,
//   },
//   flex2: {
//     flex: 2,
//   },
//   flex3: {
//     flex: 3,
//   },
//   flex4: {
//     flex: 4,
//   },
//   flex5: {
//     flex: 5,
//   },
//   flex6: {
//     flex: 6,
//   },

//   // Navbar
//   navbar: {
//     backgroundColor: '#fff',//Colors.brand.primary,
//     borderBottomWidth: 0,
//     height: 30
//   },
//   navbarTitle: {
//     color: Colors.textPrimary,//'#ffffff',
//     fontWeight: '400',
//     // fontFamily: Fonts.base.family,
//     // fontSize: Fonts.base.size,
//   },
//   navbarButton: {
//     tintColor: '#ffffff',
//     color: '#fff',
//   },

//   // TabBar
//   tabbar: {
//     backgroundColor: Colors.tabbar.background,
//     borderTopColor: Colors.border,
//     borderTopWidth: 1,
//   },
// };
