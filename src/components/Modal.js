import React,{useState} from 'react'
import WrongIcon from '../icons/general/wrong.svg'

const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

const Modal = (props) => {
    const [state, setstate] = useState(props.item)

    const handleChange = e =>{
        let copy = state
        copy[e.target.name] = e.target.value
        setstate(copy)
    }

    return(
        <div className="modal" draggable="false" style={{color:'#111'}}>
            <div className="modal-header">
                <button className="modal-close" onClick={props.handleClik}>
                    <img src={WrongIcon} className="icon" alt=""/>
                </button>
            </div>
            <div className="modal-boddy">
                <div className="lef">
                    <img src={require(`../icons/${props.item.type}.svg`)} alt=""/>
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="type">Extension del archivo</label>
                        <select name="type" id="type">
                            <option value=""></option>
                        </select>   
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Peso del archivo</label>
                        <input name="size" type="text" value={formatBytes(props.item.size)} onChange={handleChange}/>
                        <select name="content" id="">
                            {sizes.map((size, index) =>(
                                <option key={index} value={size} selected={props.item.content === size ? "selected":null}>{size}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">                        
                        <button className="submit">Actualizar</button>
                        <button className="submit">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm))
}