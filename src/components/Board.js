import React, {useEffect, useState ,useRef} from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from './Card'

const Board = ({columnId, column}) =>{

    const front = useRef()
    const back = useRef()
    const [frontPart, setFrontPart] = useState(true)

    useEffect(() => {
        const numberOfClusters = column.size/column.fileSystem.clusterSize
        for (let index = 0; index < numberOfClusters; index++) {
            column.fileSystem.clusters.push({
                id:'',
                realSize: 0
            })
        }
    }, [])
    const showInfo = () =>{
        console.log(front.current.style.display )
        if(column.name ==="Archivos") return
        if(frontPart){
            back.current.style.display = "block"
        }else{
            back.current.style.display = "none"
        }
        setFrontPart(!frontPart)
    }
    return (
        <div className="board" key={columnId}>
            <h2 onClick={showInfo}>{column.name}</h2>
            <div className="board-zone" ref={front}>
                <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="grid"
                            style={{
                                background: snapshot.isDraggingOver? "#444" : "#111",
                                padding: 4,
                                width: 250,
                                height: '500px'
                            }}
                            >
                            {column.items.map((item, index) => <Card key={index} index={index} item={item}/>)}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                
            </div>
            <div className="back" ref={back}>
                <h2>Tipo de formato {column.fileSystem.name}</h2>
                <div className="div">
                    <span>Archivo maximo: <span className="highlight">{formatBytes(column.fileSystem.maxFileSize)}</span></span>
                </div>
                <div className="div">
                    <span>Cluster: <span className="highlight">{formatBytes(column.fileSystem.clusterSize)}</span></span>
                </div>
                <div className="div">
                    <span>Espacio no usado: <span className="highlight">{formatBytes(column.fileSystem.negativeSpace)}</span></span>
                </div>
                <div className="div">
                    <span>Numero de clusters: <span className="highlight">{column.fileSystem.clusters.length}</span></span>
                </div>
            </div>
        </div>
    )
}
export default Board

function formatBytes(bytes, decimals = 2) {
    if(bytes/2 === 0) return '0 Bytes';
    if (bytes === 0 || bytes === undefined || bytes === null) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}