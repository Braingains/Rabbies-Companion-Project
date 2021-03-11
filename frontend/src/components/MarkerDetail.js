import React from "react";
import Marker from "./Marker";

const MarkerDetail = ({pin, onDelete, onUpdate}) => {


    if (!pin){
        return <p>Loading...</p>
    }

    const handleDelete = () => {
        onDelete(pin.id)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onUpdate(pin)
    }

    const editUrl = "/pins/" + pin.id + "/edit"

    return (
        <div className = "component">
            <Marker pin = {pin}/>
            <form onSubmit={handleSubmit}></form>
            <button id="deletebutton" onClick={handleDelete}>Delete {pin.name}</button>
            <a href={editUrl}><button id="editbutton" type="button">Edit {pin.name}</button></a>
        </div>
    )
}

export default MarkerDetail;
