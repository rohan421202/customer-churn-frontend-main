import React from 'react'

const InputText = ({topLeft, topRight, bottomLeft, bottomRight, type, defaultValue, value, onChange}) => {
  return (
    <div>
        <label className="label">
          <span className="label-text">{topLeft}</span>
          <span className="label-text-alt">{topRight}</span>
        </label>
        <input type={type} value={value} onChange={onChange} placeholder={defaultValue} className="input input-bordered w-full max-w-xl" />
        <label className="label">
          <span className="label-text-alt">{bottomLeft}</span>
          <span className="label-text-alt">{bottomRight}</span>
        </label>
    </div>
  )
}

export default InputText