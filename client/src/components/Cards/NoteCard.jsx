import moment from 'moment';
import React from 'react';
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
    return (
        <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
            <div className="flex justify-between items-center">
                <div>
                    <h6 className="text-sm font-medium">{title}</h6>
                    <span className="text-xs text-slate-500">{moment(date).format("Do MMM YYYY")}</span>
                </div>

                <MdOutlinePushPin className={`${isPinned ? "text-blue-500" : "text-slate-300"} w-6 h-6 hover:text-blue-500`} onClick={onPinNote} />
            </div>

            <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>

            <div className="flex justify-between items-center mt-2">
                <div className="text-xs text-slate-500">{tags.map((item) => `#${item} `)}</div>

                <div className="flex items-center gap-2">
                    <MdCreate className="w-5 h-5 hover:text-green-600" onClick={onEdit} />
                    <MdDelete className="w-5 h-5 hover:text-red-500" onClick={onDelete} />
                </div>
            </div>
        </div>
    )
}

export default NoteCard