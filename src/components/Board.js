import React, {useEffect} from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from './Card'

const Board = ({columnId, column}) =>{

    useEffect(() => {
        const numberOfClusters = column.size/column.fileSystem.clusterSize
        for (let index = 0; index < numberOfClusters; index++) {
            column.fileSystem.clusters.push({
                id:'',
                realSize: 0
            })
        }
    }, [])

    const updateItem = item =>{
        console.log('updated')
    }

    return (
        <div className="board" key={columnId}>
            <h2>{column.name}</h2>
            <div className="board-zone">
            <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="grid"
                        style={{
                            background: snapshot.isDraggingOver? "lightblue" : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 500
                        }}
                        >
                        {column.items.map((item, index) => <Card updateItem={updateItem} key={index} index={index} item={item}/>)}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            </div>
        </div>
    )
}
export default Board
