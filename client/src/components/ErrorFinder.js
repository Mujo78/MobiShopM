

export default function ErrorFinder(props){
    const fieldError = props.err.filter(n => n.param === props.fieldName);

    if(fieldError.length === 0){
        return null;
    }

    return(
        <>
        {fieldError.length > 0 ? fieldError.map((error, index) => (
            <label style={{fontSize:"12px", color:"red"}} key={index}>{error.msg}</label>
        )) :  <label></label> }
        </>
    )
}