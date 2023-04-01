import { Card,HoverCard,Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

function SignupCard(props) {
    const navigate=useNavigate();
    const role=value=>()=>{
       if(value==="Admin"){
            navigate("/loginAdmin");
       }
       else if(value==="Trainer"){
        navigate("/loginTrainer");
       }
       else{
        navigate("/signup");
       }
    }
    return (
        <HoverCard   onClick={role(props.title)} style={{width:'100%'}} >
            <HoverCard.Target>
            <Card shadow="sm" padding="lg" radius="md"  withBorder>
            <Card.Section  style={{paddingTop:'20px',textAlign:"center",height:'50px',backgroundColor:"rgb(25, 173, 173)",color:"whitesmoke",fontWeight:"bolder",fontSize:'25px',fontFamily:'monospace'}} >
                {props.title}
            </Card.Section>
            <Text size="lg" color="dimmed" style={{paddingTop:'10%',height:'125px',textIndent:'5%',textAlign:'center',fontFamily:'revert-layer',fontSize:'25px'}}>
                {props.text}
            </Text>
            </Card>
            </HoverCard.Target>   
        </HoverCard>
        
    );
}



export default SignupCard;

{
    //navigate('/signup',{state:{title:props.title}})
}