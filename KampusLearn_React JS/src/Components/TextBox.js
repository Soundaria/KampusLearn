import {TextInput} from '@mantine/core';
function TextBox({type,placeholder,required,label,onChange,value}){
    return(
        <div>
            <TextInput
            radius="md" size="md" 
            type={type}
            placeholder={placeholder} 
            label={label} 
            required={required}
            onChange={e=> onChange(e)}
            value={value}

            />
        </div>
    );
}

export default TextBox;