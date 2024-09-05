const FormField = ({ type, name, label, placeholder }) => {
  return (
    <div>
      <label htmlFor={name} className="block mb-1.5">
        {label}
      </label>
      <input
        className="border w-full py-2 px-4 rounded"
        type={type}
        id={name}
        name={name}
        required
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormField;
