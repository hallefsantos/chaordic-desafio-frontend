const Button = ({ children, customClickEvent, isActive }) => {
   return (
      <button 
         onClick={() => customClickEvent()}
         className={`h-10 w-10 ${isActive ?  'text-gray-50 hover:text-gray-800 bg-gray-800 hover:bg-gray-50' : 'hover:text-gray-50 bg-gray-50 hover:bg-gray-800'} border border-gray-200 rounded`}
      >
         {children}
      </button>
   )
}

export default Button
