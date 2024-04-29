import React, { useState } from 'react'
import EachTag from './EachTag'

const SelectTag = ({ tag, onSearchTags, currentTag, setCurrentTag }) => {

    const handleSearch = (tag) => {
        onSearchTags(tag)
        setCurrentTag(tag);
    }

    return (
        <div onClick={() => handleSearch(tag)} className={`${currentTag === tag ? "bg-blue-500 text-white" : "bg-white text-blue-500"} px-2 py-1 min-w-max line-clamp-1 border rounded border-blue-500 hover:bg-blue-500 hover:text-white transition cursor-pointer`}>
            {tag}
        </div>
    )
}

export default SelectTag