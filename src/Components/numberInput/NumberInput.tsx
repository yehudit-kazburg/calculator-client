
import Input from '@material-ui/core/Input';
require('./NumberInput.css')
function NumberInput(props: any) {
    const { onChangeNumber, name, ...other } = props;
    return (
        <div >
            <Input disabled={name === "result" ? true : false}
                className="InputForNumber" type="number" onChange={(e) => { onChangeNumber(name, +e.target.value) }} {...other} />

        </div>
    );
}

export default NumberInput;
