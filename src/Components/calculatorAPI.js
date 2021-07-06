import axios from 'axios';

//all the api calls
async function CalculatorAPI() {


    //return the operator from the server
    const returnOperationList = await axios.get(
        "https://localhost:44394/api/calc/getOperation"
    );




}

export default CalculatorAPI;
