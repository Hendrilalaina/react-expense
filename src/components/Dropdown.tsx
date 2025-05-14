interface Props {
  options: string[];
  name: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  error?: string;
  touched?: boolean;
}

const Dropdown = ({ options, label, name, id, value, onChange, onBlur, error, touched }: Props) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select name={name} id={id} className="form-control" onChange={onChange} onBlur={onBlur} value={value}>
        <option value="">Select category</option>
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
      {touched && error ? (<div className="text-danger fst-italic">Expense category is required!</div>) : null}
    </div>
  )
}

export default Dropdown;