import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
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
        color: '#673AB7'
    },
    buttonWrapper: {
        //backgroundColor:'#D3D3D3',
        marginBottom: 10,
        width: 300,
        borderRadius: 100,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#673AB7'
    },
    buttonContainer: {
        backgroundColor: '#673AB7',
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop: 30
    },
    form: {
        width: 300
    },
    image: {
        margin: 10
    },
    inputText: {
        marginBottom: 10,
        padding: 10
    },
    title: {
        fontSize: 40,
        margin: 10,
        textAlign: 'center'
    },
});