import React from 'react'

const Button = ({ nama }) => {
    return (
        <button className="bg-sky-500 py-2 text-white rounded-full hover:bg-sky-700 mt-3 w-56">{nama}</button>
    )
}

export default Button