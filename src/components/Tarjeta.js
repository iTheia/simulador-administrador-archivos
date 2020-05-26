import React,{useState} from 'react'

const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const extensions = ['doc','jpg','folder','mp3','mp4','pdf','png','sql','txt','zip']

const Tarjeta = (props) => {
    const [state, setstate] = useState(props.item)
    
    const handleChange = e =>{
        let copy = state
        copy[e.target.name] = e.target.value
        setstate(copy)
    }
    const handleSubmit = () =>{
        let copy = state
        const index = sizes.indexOf(copy.content)
        const byteSize = Math.pow(1024,index) * copy.size
        copy.size = byteSize
        props.handleUpdate(copy)
    }

    return(
      <div className="modal" draggable="false" style={{color:'#111'}}>
          <div className="modal-boddy">
              <div className="form">
                  <div className="form-group">
                      <label htmlFor="type">Extension del archivo</label>
                      <select name="type" id="type"  onChange={handleChange}>
                        {extensions.map(ext => (
                          <option key={ext} selected={props.item.type === ext ? "selected":null} value={ext}>{ext}</option>
                        ))}
                      </select>   
                  </div>
                  <div className="form-group">
                      <label htmlFor="">Peso del archivo</label>
                      <input name="size" type="text" defaultValue={formatBytes(props.item.size)} onChange={handleChange}/>
                      <select name="content" id=""  onChange={handleChange}>
                          {sizes.map((size, index) =>(
                              <option key={index} value={size} selected={props.item.content === size ? "selected":null}>{size}</option>
                          ))}
                      </select>
                  </div>
                  <div className="form-group">                        
                      <button className="submit" style={{background:'#273cd9', color:'white'}} onClick={handleSubmit}>Actualizar</button>
                      <button className="submit" style={{background:'#e2e3e1'}} onClick={props.handleClik}>Cancelar</button>
                  </div>
              </div>
          </div>
      </div>
    )
}

export default Tarjeta

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes'
    bytes = parseFloat(bytes)
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm))
}