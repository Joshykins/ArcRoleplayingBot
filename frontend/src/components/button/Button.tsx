import * as React from 'react';
import './button.scss'

export enum ButtonTypes {
    success,
    failure,
    boring,
}

export interface ButtonProps {
    type?: ButtonTypes,
    className?: string,
    disabled?: boolean
}

export const Button: React.FunctionComponent<ButtonProps> = ({type = ButtonTypes.success, className, disabled, children}) => {
    let buttonClasses = "button"
    
    if(className) {
        buttonClasses = className + " button";
    }

    switch (type) {
        case ButtonTypes.success:
                buttonClasses += " success tileShadow";
            break;
        case ButtonTypes.failure:
            buttonClasses += " failure tileShadow";
            break;
    }

    if(disabled && type === ButtonTypes.boring) {
        buttonClasses += " disabled tileShadow";
    }
    else if(disabled) {
        buttonClasses += " disabled";
    }

    interface ButtonStateRippleProperties {
        top: number;
        left: number;
        rippleCount: number;
    }
    const defaultRippleProperties : ButtonStateRippleProperties = {
        top: 0,
        left: 0,
        rippleCount: 0
    }
    //State for top/left
    const [rippleProperties, setRippleProperties] = React.useState<ButtonStateRippleProperties>(defaultRippleProperties);
    let ripples = Array();

    for (let i = 0; i < rippleProperties.rippleCount; i++) {
        ripples.push( <div className="buttonRipple" style={{top:rippleProperties.top, left:rippleProperties.left}}></div>);
    }

    //UseEffect
    React.useEffect(() => {
        return () => {
            setRippleProperties(defaultRippleProperties);
        }
    }, [])

    const buttonRef = React.useRef(null);
    return (
        <button 
            className={buttonClasses}
            ref={buttonRef}
            onClick={(e) => {
                if(!disabled) {
                    let btn = buttonRef.current;
                    console.log(btn);
                    let top = 0, left = 0;
                    do {
                        top += btn.offsetTop  || 0;
                        left += btn.offsetLeft || 0;
                        btn = btn.offsetParent;
                    } while(btn);
                
                    let x = e.pageX - left;
                    let y = e.pageY - top;
    
                    setRippleProperties({top: y, left: x, rippleCount: rippleProperties.rippleCount + 1});
                }
            }}
        >
            {ripples}
            {children}
        </button>
    )
}