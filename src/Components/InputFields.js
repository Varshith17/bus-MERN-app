import { Label, Input, FormGroup } from 'reactstrap';
const inputFields =(props)=>{
    let field='';
    switch(props.fields.element){
        case 'input':
            field= <FormGroup className='mb-0'>
                        <Label>{props.fields.field}</Label>
                        <Input type={props.fields.type} placeholder={props.fields.field} id={props.fields.field} value={props.fields.value} onChange={(e)=>props.handleForm(e,props.index)}></Input>
                        <span className='ml-2' style={{color:'red', fontSize:'14px',fontWeight:500}}>{props.fields.errorMsg}</span>
                    </FormGroup>
            break;
        case 'radio':
            field=
                     <FormGroup className='ml-1 mb-0'>
                        {
                            props.fields.numberofFields.map((element)=>
                            <Label className='p-3' key={element.field}>
                                <Input type='radio' name={props.fields.name} value={element.value}  onChange={(e)=>props.handleForm(e,props.index)}/>
                                {element.field}
                            </Label>)
                        }    
                        <span className='ml-2' style={{color:'red', fontSize:'14px',fontWeight:500}}>{props.fields.errorMsg}</span>
                    </FormGroup>
            break;
        default:
            field=''

    }
    return(
        <>
        {field}
        </>
    )
}
export default inputFields;