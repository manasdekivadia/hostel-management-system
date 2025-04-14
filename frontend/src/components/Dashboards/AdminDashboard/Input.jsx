import PropTypes from "prop-types";

Input.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    req: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired, // Can be 'text', 'textarea', etc.
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
  }).isRequired,
};

function Input({ field }) {
  const { name, placeholder, req, type, value, onChange, disabled } = field;
  const id = `input-${name}`;
  const isTextarea = type === "textarea";

  return (
    <div className="relative w-full">
      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          required={req}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder=" "
          rows={4}
          className={`peer w-full px-4 pt-6 pb-2 text-sm text-white bg-neutral-900 border border-neutral-700 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-transparent resize-none ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={req}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder=" "
          className={`peer w-full px-4 pt-6 pb-2 text-sm text-white bg-neutral-900 border border-neutral-700 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-transparent ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
      )}
      <label
        htmlFor={id}
        className="absolute left-4 top-2 text-sm text-neutral-400 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-400"
      >
        {name.toLowerCase() === "cms"
          ? "CMS"
          : name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
    </div>
  );
}

export { Input };
