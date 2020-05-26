import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import uuid from "uuid/dist/v4";
import Board from '../components/Board'

export default function Simulador({data}) {
    const [columns, setColumns] = useState(data);
    return (
        <div style={{ display: "flex", alignItems:'center' }}>
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
            {Object.entries(columns).map(([columnId, column], index) => <Board key={index} column={column} columnId={columnId} />)}
        </DragDropContext>
        </div>
    )
}

function onDragEnd (result, columns, setColumns) {
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      if(sourceColumn.name === "Archivos"){
        sourceItems.splice(source.index, 0 ,{...removed, id:uuid()})
      }
      if (destColumn.name !== "Archivos") {
        if(removed.size > destColumn.fileSystem.maxFileSize){
          return
        }
        destItems.splice(destination.index, 0, removed);
      }
      fillCluster(destColumn, removed)
      setFreeCluster(sourceColumn, removed)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };
  
function fillCluster(pc, item){
    let size = item.size
    for (let index = 0; index < pc.fileSystem.clusters.length; index++) {
        const cluster = pc.fileSystem.clusters[index];
        if(size <= 0) return
        if(cluster.id === ''){
            cluster.id = item.id
            if((size - pc.fileSystem.clusterSize) < 0){
                cluster.realSize = size
                pc.fileSystem.negativeSpace = pc.fileSystem.clusterSize - size
                size = 0
            }else{
                cluster.realSize = pc.fileSystem.clusterSize
                size -= pc.fileSystem.clusterSize
            }
        }
    }
}

function setFreeCluster(pc, item){
    for (let index = 0; index <  pc.fileSystem.clusters.length; index++) {
        const cluster = pc.fileSystem.clusters[index];
        if(cluster.id === item.id){
            cluster.id = ''
            pc.fileSystem.negativeSpace = (cluster.realSize === pc.fileSystem.clusterSize)? pc.fileSystem.negativeSpace : pc.fileSystem.negativeSpace - cluster.realSize
            cluster.realSize = 0
        }
    }
}