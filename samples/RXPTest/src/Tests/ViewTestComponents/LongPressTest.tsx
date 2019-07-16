
import * as RX from 'reactxp';

import * as CommonStyles from '../../CommonStyles';

const _styles = {
    container: RX.Styles.createTextStyle({
        marginBottom: 20
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
    press2Count: number;
};

export class LongPressTest extends RX.Component<RX.CommonProps, ViewInputTestState> {
    
    constructor(props: RX.CommonProps) {
        super(props);
        this.state = {
            press1Count: 0,
            press2Count: 0,
        };
    }

    private onPress1 = (e: RX.Types.SyntheticEvent) => {
        this.setState(state => ({ press1Count: state.press1Count + 1 }));
    }

    private onPress2 = (e: RX.Types.SyntheticEvent) => {
        this.setState(state => ({ press2Count: state.press2Count + 1 }));
    }

    render() {
        return (
            <RX.View style={ _styles.container }>
                <RX.Text style={ _styles.explainText }>
                    { 'Each view below should respond to a long press' }
                </RX.Text>
                <RX.View style={_styles.row}>
                    <RX.View 
                        style={_styles.box} 
                        tabIndex={0}
                        onLongPress={this.onPress1}>
                        <RX.Text style={ _styles.labelText }>
                            { `Long-pressed ${this.state.press1Count} times` }
                        </RX.Text>
                    </RX.View>
                    <RX.View 
                        style={_styles.box}
                        tabIndex={0}
                        onLongPress={this.onPress2}>
                        <RX.Text style={ _styles.labelText }>
                            { `Long-pressed ${this.state.press2Count} times` }
                        </RX.Text>
                    </RX.View>
                </RX.View>
            </RX.View>
        );
    }
}
