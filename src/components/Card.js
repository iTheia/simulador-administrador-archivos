import React,{useState} from 'react'
import { Draggable } from "react-beautiful-dnd";
import Modal from './Tarjeta'

export default function Card({item, index, updateItem}) {
    const [modalOpen, setModalOpen] = useState(false)

    const handleClik = () =>{
        setModalOpen(!modalOpen)
    }
    const handleUpdate = newItem =>{
        setModalOpen(!modalOpen)
        item = newItem
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
                    display:'block',
                    userSelect: "none",
                    padding: 10,
                    height: "50px",
                    ...provided.draggableProps.style
                }}
                >
                <img className="icon" onClick={handleClik} src={require(`../icons/${item.type}.svg`)}  alt=""/>
                {modalOpen? <Modal show={modalOpen} handleUpdate={handleUpdate} handleClik={handleClik} item={item} updateItem={updateItem} />: null}
                 </div>
            );
            }}
        </Draggable>
    )
}