import {Button} from '@mantine/core';

function ButtonField(props){
    return(
        <>
        <Button variant="subtle" color={props.color} radius="md" size="md" onClick={props.onClick} type={props.type} >{props.children}</Button>
        </>
       
    );
}

export default ButtonField;