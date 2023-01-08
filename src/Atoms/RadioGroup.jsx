const RadioGroup = ({ options, value, onChange, label, error }) => {
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
      <Show when={options().length}>
        <div class="h-48 overflow-auto">
          {options().map((item, index) => {
            return (
              <div>
                <input
                  type="radio"
                  id={item.value}
                  name="radio_group"
                  value={item.value}
                  class="cursor-pointer"
                  onChange={onChange}
                  checked={item.value === value()}
                />
                <label for={item.value} class="pl-2 cursor-pointer">
                  {item.label}
                </label>
              </div>
            );
          })}
        </div>
      </Show>
      <Show when={!options().length}>No Data</Show>

      {error?.() && (
        <div class="block mb-2 text-sm font-medium text-red-900">
          {error?.()}
        </div>
      )}
    </>
  );
};

export default RadioGroup;
