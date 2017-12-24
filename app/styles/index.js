import {StyleSheet} from 'react-native';

const purple = "#673AB7";
const red = "#FA3D4B";
const darkBlue = "#15182D";

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
    buttonText: {
        fontFamily: 'Avenir',
        fontSize: 20,
        padding: 10,
        textAlign: 'center',
        color: purple
    },
    buttonWrapper: {
        //backgroundColor:'#D3D3D3',
        marginBottom: 10,
        width: 300,
        borderRadius: 100,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: purple
    },
    buttonContainer: {
        backgroundColor: purple,
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
        backgroundColor: "transparent",
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
        backgroundColor: red,
    },
    label: {
        color: darkBlue,
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
        color: purple
    },
    h4: {
        fontSize: 20,
        textAlign: 'center',
        paddingBottom: 10,
        paddingTop: 10
    },
    statsTitle: {
        fontWeight: '500'
    },
    purpleText: {
        color: purple
    },
    statsNumber: {
        fontSize: 26,
        fontWeight: '600'
    }
});