import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IconButton, ListItem, List, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';

require('./CalculationHistory.css')

function CalculatorHistory(props) {
    const { setCalculatorHistory, CalculatorHistory, showComponnt, setCalculation, fetchCalculatorHistory, ...other } = props;



    // when init componnta  get the list of history
    useEffect(() => {
        const fetchCalc = async () => {
            const calcs = await fetchCalculatorHistory()

        }
        fetchCalc()
    }, [])


    //  delete calc from list history calcultion and return the updated list
    const removeCalcFromTheList = async (selectCalc) => {
        const data = selectCalc;
        await axios.post(
            "https://localhost:44394/api/listCalc/deleteCalculation", data
        ).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                setCalculatorHistory(response.data);

            }
            else {
                throw new Error("not result");

            }
        })
            .catch(({ response }) => {
                throw new Error(response);
            });;
    };

    // when click update init the calcultion to update  
    const updateCalcFromTheList = async (selectCalc) => {
        const data = selectCalc;
        setCalculation(selectCalc);

    };

    return !CalculatorHistory.length ? (<></>) : (
        showComponnt &&
        <div className="CalculatorHistory">
            <h5>claculation History</h5>
            <List subheader={<li />} className="root">
                <ul>
                    {CalculatorHistory.map((calc, index) => (
                        <ListItem key={index}>
                            <p key={index} >{calc.number1} {calc.operator} {calc.number2} ={calc.result}</p>
                            <IconButton onClick={() => { removeCalcFromTheList(calc); }} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                            <IconButton onClick={() => { updateCalcFromTheList(calc); }} aria-label="delete">
                                <UpdateIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </ul>
            </List>

        </div>



    );
}

export default CalculatorHistory;
