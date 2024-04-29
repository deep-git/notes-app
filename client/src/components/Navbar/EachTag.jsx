import React from 'react'

const EachTag = ({ tag }) => {
    return (
        <div className="px-3 py-1 border rounded border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition cursor-pointer">
            {tag}
        </div>
    )
}

export default EachTag