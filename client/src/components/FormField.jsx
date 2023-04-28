import React from 'react'

const FormField = ({ labelName, placeholder, name, value, type, handleChange, isSurpriseMe, handleSupriseMe, }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          className="block text-sm font-medium text-gray-900"
          htmlFor={name}
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            className="font-semibold bg-[#ececf1] py-1 px-2 text-xs rounded-[5px] text-black"
            type="button"
            onClick={handleSupriseMe}
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        required
        className="bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-[#4649ff] focus:border-[#4646ff] block lg:w-1/2 w-full p-3"
      />
    </div>
  )
}

export default FormField
