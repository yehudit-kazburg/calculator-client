import axios from 'axios';
import React, { useState } from 'react';
import Calculation from '../Calculation/Calculation';
import CalculationHistory from '../CaculationHistory/CalculationHistory';
require('./Calculator.css')
function Calculator() {
    const [CalculatorHistory, setCalculatorHistory] = useState([]);
    const [showHistory, setshowHistory] = useState(false);
    const [calculation, setCalculation] = useState({
        number1: 0,
        number2: 0,
        operator: "+",
        result: 0,
        id: 0,
    });


    // return the calculation history by userID
    const fetchCalculatorHistory = async () => {
        const { data } = await axios.get(
            "https://localhost:44394/api/listCalc/getCalculatorHistory"
        );
        setCalculatorHistory(data);
        return data;
    };



    // check if press F5 and cancel the event and init variable to show componnta of history
    window.onkeydown = function (event) {
        if (179 === event.keyCode) {
            event.preventDefault()
            setshowHistory(!showHistory)
        }

    };




    return (
        <div className="TheCalculator" >
            <h1>my calculator</h1>
            <div className="calculationAndHistoryDiv">
                <Calculation className="calculationDiv" fetchCalculatorHistory={fetchCalculatorHistory} setCalculation={setCalculation} calculation={calculation}
                />
                <CalculationHistory fetchCalculatorHistory={fetchCalculatorHistory} setCalculatorHistory={setCalculatorHistory} CalculatorHistory={CalculatorHistory} showComponnt={showHistory} setCalculation={setCalculation} />
            </div>
        </div>
    );
}

export default Calculator;
