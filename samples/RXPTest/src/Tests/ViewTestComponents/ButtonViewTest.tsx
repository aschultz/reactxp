
import * as RX from 'reactxp';

import * as CommonStyles from '../../CommonStyles';
import { ButtonView } from './ButtonView';

const _styles = {
    container: RX.Styles.createTextStyle({
        marginBottom: 20,
        alignItems: 'stretch',
    }),
    row: RX.Styles.createTextStyle({
        flexDirection: 'row',
        margin: 10,
    }),
    box: RX.Styles.createViewStyle({
        flex: 0,
        backgroundColor: '#eee',
        borderColor: 'black',
        borderWidth: 1,
        marginRight: 10,
        padding: 5
    }),
    pressed: RX.Styles.createViewStyle({
        backgroundColor: '#CCC',
    }),
    focused: RX.Styles.createViewStyle({
        borderColor: 'red',
        borderWidth: 2,
    }),
    explainText: RX.Styles.createTextStyle({
        fontSize: CommonStyles.generalFontSize,
        color: CommonStyles.explainTextColor
    }),
    labelText: RX.Styles.createTextStyle({
        margin: 8,
        fontSize: CommonStyles.generalFontSize,
    }),
};

type ViewInputTestState = {
    press1Count: number;
    press1InCount: number;
    press1OutCount: number;
    press2Count: number;
};

export class ButtonViewTest extends RX.Component<RX.CommonProps, ViewInputTestState> {
    
    constructor(props: RX.CommonProps) {
        super(props);
        this.state = {
            press1Count: 0,
            press1InCount: 0,
            press1OutCount: 0,
            press2Count: 0,
        };
    }

    private onPress1 = (e: RX.Types.SyntheticEvent) => {
        this.setState(state => ({ press1Count: state.press1Count + 1 }));
    }

    private onPress1In = (e: RX.Types.SyntheticEvent) => {
        this.setState(state => ({ press1InCount: state.press1InCount + 1 }));
    }

    private onPress1Out = (e: RX.Types.SyntheticEvent) => {
        this.setState(state => ({ press1OutCount: state.press1OutCount + 1 }));
    }

    private onPress2 = (e: RX.Types.SyntheticEvent) => {
        this.setState(state => ({ press2Count: state.press2Count + 1 }));
    }

    render() {
        return (
            <RX.View style={ _styles.container }>
                <RX.Text style={ _styles.explainText }>
                    { 'Each view below should behave like a button, responding to mouse and touch presses, ' +
                        'as well as keyboard tab, space, and enter.' }
                </RX.Text>
                <RX.View style={_styles.row}>
                    <ButtonView 
                        style={_styles.box} 
                        focusedStyle={_styles.focused}
                        pressedStyle={_styles.pressed}
                        tabIndex={0}
                        onPressIn={this.onPress1In}
                        onPressOut={this.onPress1Out}
                        onPress={this.onPress1}>
                        <RX.Text style={ _styles.labelText }>
                            { `Pressed ${this.state.press1Count} times\r\n` }                            
                            { `Pressed in ${this.state.press1InCount} times\r\n` }
                            { `Pressed out ${this.state.press1OutCount} times` }
                        </RX.Text>
                    </ButtonView>
                    <ButtonView 
                        style={_styles.box}
                        focusedStyle={_styles.focused}
                        pressedStyle={_styles.pressed} 
                        tabIndex={0}
                        onPress={this.onPress2}>
                        <RX.Text style={ _styles.labelText }>
                            { `Pressed ${this.state.press2Count} times` }
                        </RX.Text>
                    </ButtonView>
                </RX.View>
            </RX.View>
        );
    }
}
