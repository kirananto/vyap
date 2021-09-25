import React, { useState, useEffect, useRef } from "react";
import "./Drop.css";

function List(props: any) {
  return (
    <div className="drop-main" onClick={() => props.onSelect(props.opt)}>
      <div className="p-2 border border-gray-200 rounded-lg product-image">
        <img className="w-10 h-10" src={props.opt.url} alt={props.opt.name} />
      </div>
      <div className="product-details">
        <div className="text-base font-bold text-gray-700">{props.opt.name}</div>
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
    <div className=" dropdown-container">
      <div>
        <input
          type="text"
          onChange={search}
          onKeyPress={add}
          value={value}
          onFocus={() => setIsOpen(true)}
          // onBlur={() => setIsOpen(false)}
        />
        <button disabled={isdisabled} onClick={add}>
          Create
        </button>
      </div>
      <div className={isOpen ? "drop-open" : "drop-close"}>
        {isOpen
          ? searches.map((opt: any) => <List opt={opt} onSelect={select} />)
          : []}
      </div>
      <div className="close-dropdown" onClick={() => setIsOpen(false)}></div>
    </div>
  );
}

export default DropDown;
