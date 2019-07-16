import * as RX from 'reactxp';

export type ButtonViewProps = {
    pressedStyle?: RX.Types.StyleRuleSet<RX.Types.ViewStyle>,
    focusedStyle?: RX.Types.StyleRuleSet<RX.Types.ViewStyle>,
} & Omit<RX.Types.ViewProps, 'key' | 'ref'>;

type ButtonViewState = {
    pressed?: boolean;
    focused?: boolean;
};

export class ButtonView extends RX.Component<ButtonViewProps, ButtonViewState> {
    
    constructor(props: RX.Types.ViewProps) {
        super(props);
        this.state = {};
    }

    render() {
        const { style: baseStyle, pressedStyle, focusedStyle, ...otherProps } = this.props;

        const combinedStyle = [baseStyle];
        if (focusedStyle && this.state.focused) {
            combinedStyle.push(focusedStyle);
        }
        if (pressedStyle && this.state.pressed) {
            combinedStyle.push(pressedStyle);
        }

        return (
            <RX.View 
                {...otherProps} 
                accessibilityTraits={RX.Types.AccessibilityTrait.Button}
                onPressIn={this.onPressIn} 
                onPressOut={this.onPressOut}
                onMouseLeave={this.onMouseLeave}
                onFocus={this.onFocus} 
                onBlur={this.onBlur}
                onKeyPress={this.onKeyPress}
                style={combinedStyle}>
                    {this.props.children}
            </RX.View>
        );
    }

    private onPressIn = (e: RX.Types.SyntheticEvent) => {
        this.setState({ pressed: true });
        if (this.props.onPressIn) {
            this.props.onPressIn(e);
        }
    }

    private onPressOut = (e: RX.Types.SyntheticEvent) => {
        this.setState({ pressed: false });
        if (this.props.onPressOut) {
            this.props.onPressOut(e);
        }
    }

    private onMouseLeave = (e: RX.Types.MouseEvent) => {
        this.setState({ pressed: false });
        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(e);
        }
    }

    private onFocus = (e: RX.Types.SyntheticEvent) => {
        this.setState({ focused: true });
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    }

    private onBlur = (e: RX.Types.SyntheticEvent) => {
        this.setState({ focused: false });
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    }

    private onKeyPress = (e: RX.Types.KeyboardEvent) => {
        if (this.props.onKeyPress) {
            this.props.onKeyPress(e);
        }

        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            if (this.props.onPress) {
                this.props.onPress(e);
            }
        }
    }
}
