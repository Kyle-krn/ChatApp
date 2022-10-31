import React from "react";

export const RoomForm = () => {
    return (
        <div className="form roomForm">
            <span>Выберите / создайте чат</span>
            <form>
                <div className="inputWithBtn">
                    <input placeholder="Введите название чата"/>
                    <button className="btn">Создать</button>
                </div>
            </form>
        </div>
    )
}