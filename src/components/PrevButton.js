import {StyleSheet, View} from 'react-native';
import {Button, Input, Text} from '@99xt/first-born';
import React from 'react';
import colors from '../assets/theme/colors';

const PrevButton = ({goToPrev}) => {

    return (
        <View style={{ alignItems: 'flex-end' }}>
            <View style={{ width: 80, marginTop: 30 }}>
                <Button
                    rounded
                    block
                    // style={styles.btn}
                    color={colors.button} title="Prev" onPress={() => goToPrev()}>
                    {/*color={colors.button} title="Next" onPress={() => wizard.current.next()}>*/}
                    <Text>Back</Text>
                </Button>
            </View>
        </View>

    );
};

export default PrevButton;


const styles = StyleSheet.create({
    action: {},
});
