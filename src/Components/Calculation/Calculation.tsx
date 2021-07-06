import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import NumberInput from '../numberInput/NumberInput';
import OperatorInput from '../OperatorInput/OperatorInput';
import { FormControl } from '@material-ui/core';


import useCancelToken from 'react-use-cancel-token';
require('./Calculation.css')

function Calculation(props: any) {
    const { calculation, setCalculation, fetchCalculatorHistory } = props;
    const [name, setName] = useState("");
    //var to chack if the first enterd
    const [IfCalcResult, setIfCalcResult] = useState(false);

    //set the calculations numer or operator
    const changeValue = async (name: string, number: number) => {
        setName(name);
        setCalculation({
            ...calculation,
            [name]: number
        })

    }


    //call  get result when the calculation change
    useEffect(() => {
        // check  what updated in calculation
        if (name != "result" && name != "id") {
            // check if  the fist calculation 
            if (IfCalcResult != false) {
                getCalculationAndReturnResultAndUpdateHistory();

            }
            else {
                setIfCalcResult(true)
            }
        }
    }, [calculation]);







    const data = calculation;
    // get the calculation  and return the rusult and update it and add to history the calculatio
    const getCalculationAndReturnResultAndUpdateHistory = async () => {
        try {

            await axios
                .post<any>(` https://localhost:44394/api/calc/CalcResult`, data)
                .then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        changeValue("result", +response.data);
                        fetchCalculatorHistory();
                    }
                    else {
                        throw new Error("not result");
                    }
                })
        }
        catch (error) {

            throw new Error("error");
        };
    }


    return (
        <div className="calculationDiv" >
            <FormControl className="formCalculation" >
                <NumberInput name={'number1'} onChangeNumber={changeValue} value={calculation.number1} />
                <OperatorInput changeOper={changeValue} value={calculation.operator} />
                <NumberInput name={'number2'} onChangeNumber={changeValue} value={calculation.number2} />
                <p>=</p>
                <NumberInput name={'result'} value={calculation.result} />
            </FormControl>
        </div>
    );
}

export default Calculation;
