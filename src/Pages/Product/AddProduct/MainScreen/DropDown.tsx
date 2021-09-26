import React, { useState, useEffect, useRef } from "react";
import "./Drop.css";

function List(props: any) {
  return (
    <div className="mb-4 drop-main" onClick={() => props.onSelect(props.opt)}>
      <div className="p-2 border border-gray-200 rounded-lg product-image">
        <img className="w-10 h-10" src={props.opt.url} alt={props.opt.name} />
      </div>
      <div className="product-details">
        <div className="text-base font-bold text-gray-700">
          {props.opt.name}
        </div>
        <div className="text-xs">{props.opt.quantity}</div>
        <div className="text-xs font-bold text-gray-400">{props.opt.price}</div>
      </div>
    </div>
  );
}

function DropDown(props: any) {
  const [value, setValue] = useState("");
  const [opts, setOpts] = useState(props.options || []);
  const [searches, setSearches] = useState([]);
  const [selected, setSelected] = useState({});
  const [isdisabled, setIsdisabled] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSearches(opts);
  }, [opts]);

  function search(e: any) {
    let text = e.target.value;
    setValue(text);
    let searched = opts.filter((a: any) => a.value.indexOf(text) != -1);

    let dises = opts.filter((a: any) => a.value == text);
    if (dises.length == 0) setIsdisabled(false);
    else setIsdisabled(true);
    setSearches(searched);
  }
  function add(e: any) {
    let key = e.nativeEvent.key || "Enter";
    if (key == "Enter" && !isdisabled) {
      setOpts([...opts, { name: value, value }]);
    }
    search({ target: { value } });
    setIsdisabled(true);
  }
  function select(e: any) {
    setSelected(e);
    setIsOpen(false);
    setValue(e.name);
    if (props.onSelect) props.onSelect(e);
  }
  return (
    <div className="w-full dropdown-container">
      <div className="flex gap-2">
        <input
          type="text"
          onChange={search}
          onKeyPress={add}
          value={value}
          onFocus={() => setIsOpen(true)}
          // onBlur={() => setIsOpen(false)}
          className="p-2 border border-gray-200 rounded-lg input-field focus:ring-2 focus:outline-none"
          placeholder="Search or create product..."
        />
        <button
          disabled={isdisabled}
          className={isdisabled ? "hide-create-btn" : "show-create-btn"}
          onClick={add}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className={isOpen ? "drop-open" : "drop-close"}>
        {isOpen
          ? searches.map((opt: any) => <List opt={opt} onSelect={select} />)
          : []}
        <div className={isdisabled ? "hide-create-div" : "show-create-div"}>
          <p className="font-bold text-gray-600">+ Add this new product</p>
        </div>
      </div>
      <div className="close-dropdown" onClick={() => setIsOpen(false)}></div>
    </div>
  );
}

export default DropDown;
