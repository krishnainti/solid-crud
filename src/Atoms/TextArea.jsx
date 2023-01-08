const TextArea = ({
  value,
  onChange,
  placeholder = "Enter text",
  label,
  error,
  ...props
}) => {
  return (
    <>
      {label && (
        <label
          for="first_name"
          class="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}

      <textarea
        type="text"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        onInput={onChange}
        {...props}
      >
        {value()}
      </textarea>

      {error?.() && (
        <div class="block mb-2 text-sm font-medium text-red-900">
          {error?.()}
        </div>
      )}
    </>
  );
};

export default TextArea;
