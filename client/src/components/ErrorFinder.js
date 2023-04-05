

export default function ErrorFinder({err, fieldName}){
    const fieldError = err.filter(n => n.param === fieldName);

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