
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

type State = {
    outerPressCount: number;
    innerPressCount: number;
};

export class CapturePhaseTest extends RX.Component<RX.CommonProps, State> {
    
    constructor(props: RX.CommonProps) {
        super(props);
        this.state = {
            outerPressCount: 0,
            innerPressCount: 0,
        };
    }

    private onOuterPress = (e: RX.Types.SyntheticEvent) => {
        this.setState(state => ({ outerPressCount: state.outerPressCount + 1 }));
    }

    private onOuterPressCapture = (e: RX.Types.SyntheticEvent) => {
        // Prevent press from propagating to child. This also blocks onPress on this element, so run it ourselves.
        e.stopPropagation();
        this.onOuterPress(e);
    }
    
    private onOuterKeyPressCapture = (e: RX.Types.KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
             // Prevent press from propagating to child. This also blocks onKeyPress on this element, so run it ourselves.
            e.stopPropagation();
            this.onOuterPress(e);
        }
    }

    private onInnerPress = (e: RX.Types.SyntheticEvent) => {
        this.setState(state => ({ innerPressCount: state.innerPressCount + 1 }));
    }

    render() {
        return (
            <RX.View style={ _styles.container }>
                <RX.Text style={ _styles.explainText }>
                    { 'This test verifies that stopping a Capture phase event from propagating prevents a child from ' + 
                    'receiving the Capture or Bubble phases. The inner view should not increment its counter when pressed.' }
                </RX.Text>
                <RX.View style={_styles.row}>
                    <ButtonView 
                        style={_styles.box} 
                        focusedStyle={_styles.focused}
                        pressedStyle={_styles.pressed}
                        tabIndex={0}
                        onPress={this.onOuterPress}
                        onPressCapture={this.onOuterPressCapture}
                        onKeyPressCapture={this.onOuterKeyPressCapture}>

                            <RX.Text style={ _styles.labelText }>
                                { `Pressed outer ${this.state.outerPressCount} times` }
                            </RX.Text>
                            
                            <ButtonView 
                                style={_styles.box}
                                focusedStyle={_styles.focused}
                                pressedStyle={_styles.pressed}
                                tabIndex={0}
                                onPress={this.onInnerPress}
                                onPressCapture={this.onInnerPress}>
                                <RX.Text style={ _styles.labelText }>
                                    { `Pressed inner ${this.state.innerPressCount} times` }
                                </RX.Text>
                            </ButtonView>

                    </ButtonView>
                </RX.View>
            </RX.View>
        );
    }
}
