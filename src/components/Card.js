import React,{useState} from 'react'
import { Draggable } from "react-beautiful-dnd";
import Modal from './Modal'

export default function Card({item, index, updateItem}) {
    const [modalOpen, setModalOpen] = useState(false)

    const handleClik = () =>{
        setModalOpen(!modalOpen)
    }

    return (
        <Draggable
            key={item.id}
            draggableId={item.id}
            index={index}
        >
            {(provided, snapshot) => {
            return (
                <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                    userSelect: "none",
                    padding: 10,
                    height: "50px",
                    backgroundColor: snapshot.isDragging
                    ? "#fefefe"
                    : "#f1f1f1",
                    color: "white",
                    ...provided.draggableProps.style
                }}
                >
                <img className="icon" onClick={handleClik} src={require(`../icons/${item.type}.svg`)}  alt=""/>
                {modalOpen? <Modal handleClik={handleClik} item={item} updateItem={updateItem} />: null}
                </div>
            );
            }}
        </Draggable>
    )
}