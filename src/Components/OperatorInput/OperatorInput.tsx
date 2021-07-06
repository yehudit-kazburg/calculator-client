import { FormControl, MenuItem } from '@material-ui/core';
import axios from 'axios';
import Select from "@material-ui/core/Select";
import { useState, useEffect } from 'react';
//import * from '../API.ts';

require('./OperatorInput.css')

function OperatorInput(props: any) {
    const { changeOperator, value, ...other } = props;
    const [operatorsList, setoperatorsList] = useState([]);


    // the operator from the server
    const fetchOperators = async () => {
        const { data } = await axios.get(
            "https://localhost:44394/api/calc/getOperation"
        );
        const operators = data;
        setoperatorsList(operators);
    };

    useEffect(() => {
        fetchOperators();
    }, []);
    return (
        <  FormControl>
            <Select className="InputForOperation"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                onChange={(e) => changeOperator('operator', e.target.value)}
                label="Model"
            >
                {operatorsList.map(operator => {
                    return <MenuItem value={operator}>
                        <em>{operator}</em>
                    </MenuItem>
                })
                }
            </Select>
        </FormControl>

    );
}

export default OperatorInput;
