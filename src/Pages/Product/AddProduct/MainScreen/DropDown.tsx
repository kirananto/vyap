import React, { useState, useEffect, useRef } from "react";
import "./Drop.css";

function List(props: any) {
  return <div onClick={() => props.onSelect(props.opt)}>{props.opt.name}</div>;
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
    <div className="dropdown-container">
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
      <div className="drop">
        {isOpen
          ? searches.map((opt: any) => <List opt={opt} onSelect={select} />)
          : []}
      </div>
      <div className="close-dropdown" onClick={() => setIsOpen(false)}></div>
    </div>
  );
}

export default DropDown;
