import {StyleSheet} from 'react-native';
import { colors } from '../helpers/colors';

export default styles = StyleSheet.create({
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
  buttonText: {
    fontFamily: 'Avenir',
    fontSize: 16,
    padding: 10,
    width: '100%',
    textAlign: 'center',
    fontWeight: '700',
    backgroundColor: colors.red,
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
    borderWidth: 2,
    borderColor: colors.red
  },
  buttonContainer: {
    backgroundColor: colors.red,
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
  indicator: {
    marginBottom: -1,
    backgroundColor: colors.red,
  },
  label: {
    color: colors.darkBlue,
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
    color: colors.purple
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
    color: colors.purple
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
    width:120,
    height:120,
    borderWidth:3,
    borderColor: '#fff',
    borderRadius:60,
  }
});