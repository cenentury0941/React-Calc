import React, {useState} from 'react';
import './Calculator.css'
import calc from '../images/calc.png'

export function Calculator()
{
    const [ operand1 , setOperand1 ] = useState(undefined);
    const [ operand2 , setOperand2 ] = useState(undefined);
    const [ operator , setOperator ] = useState(undefined);
    const [ answer , setAnswer ] = useState(undefined);
    const [ display , setDisplay ] = useState(undefined);
    const [ answered , setAnswered ] = useState(false);
    
    function operatorClick(val)
    {
        
        if(answered)
        {
            console.log("Answered");
            return;
        }

        if( operand2 || !display )
        {   
            console.log("Inv Operand state");
            return;
        }
        setOperator(val);
        setOperand1(display);
        setDisplay(undefined);
    }

    function operandClick(val)
    {
        console.log(val)

        if(answered)
        {
            return;
        }
        
        if( display == undefined )
        {
            setDisplay( val );
        }
        else
        {
            if( display.length >= 9 )
            {
                return;
            }
            setDisplay( display + val );
        }

    }

    function equalsClick()
    {
        if( !(operand1 && display && operator) )
        {
            return;
        }

        setAnswered( true );

        setOperand2(display)

        if( operator == "+" )
        {
            setDisplay( Number(operand1) + Number(display) );
        }
        else if( operator == "-" )
        {
            setDisplay( Number(operand1) - Number(display) );
        }
        else if( operator == "x" )
        {
            let ans = Number(operand1) * Number(display) ;
            if( ans > 10000000000 )
            {
                ans = ans.toExponential();
            }
            setDisplay( ans );
        }
        else if( operator == "/" )
        {
            if( Number(operand2) == 0 )
            {
                setDisplay( "Err : Div by 0" );
            }
            else{
                setDisplay( Number(""+(Number(operand1) / Number(display)).toFixed(3)));
            }
        }
        else{
            setAnswered( false );
        }
    }

    function clearClick()
    {
        setOperand1(undefined);
        setOperand2(undefined);
        setOperator(undefined);
        setAnswer(undefined);
        setDisplay(undefined);
        setAnswered(false);
    }



    return (
        <div className='CalculatorBody'>
            <span className='CalculatorHeading'><img src={calc}></img>calc.</span>
            <div className='OperandAndOperator'>
                <div className='Operand'>{operand1}</div>
                <div className='Operator'>{operator}</div>
                <div className='Operand'>{operand2}</div>
            </div>
            <div className='Display'>{display}</div>
            <div className='ButtonLayout'>
                <div className='ButtonRow'>
                    <div className='Button' onClick={ () => { operandClick("1") } }>1</div>
                    <div className='Button' onClick={ () => { operandClick("2") } }>2</div>
                    <div className='Button' onClick={ () => { operandClick("3") } }>3</div>
                    <div className='Button OperatorButton' onClick={ () => { operatorClick("+") } }>+</div>    
                </div>
                
                <div className='ButtonRow'>
                    <div className='Button' onClick={ () => { operandClick("4") } }>4</div>
                    <div className='Button' onClick={ () => { operandClick("5") } }>5</div>
                    <div className='Button' onClick={ () => { operandClick("6") } }>6</div>
                    <div className='Button OperatorButton' onClick={ () => { operatorClick("-") } }>-</div>    
                </div>
                
                <div className='ButtonRow'>
                    <div className='Button' onClick={ () => { operandClick("7") } }>7</div>
                    <div className='Button' onClick={ () => { operandClick("8") } }>8</div>
                    <div className='Button' onClick={ () => { operandClick("9") } }>9</div>
                    <div className='Button OperatorButton' onClick={ () => { operatorClick("/") } }>/</div>    
                </div>
                
                <div className='ButtonRow'>
                    <div className='Button ClearButton' onClick={ () => { clearClick() } }>C</div>
                    <div className='Button' onClick={ () => { operandClick("0") } }>0</div>
                    <div className='Button OperatorButton' onClick={ () => { operatorClick("x") } }>x</div>
                    <div className='Button EqualsButton' onClick={ () => { equalsClick() } }>=</div>    
                </div>
            </div>
        </div>
    );
}