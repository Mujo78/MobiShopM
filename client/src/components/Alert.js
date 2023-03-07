export default function Alert(){
    return (
        <div className="alert alert-secondary d-flex align-items-center justify-content-between" role="alert">
            <span className="mx-auto" style={{fontWeight:'bold'}}>Najbolje cijene, dobro došli!</span>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}