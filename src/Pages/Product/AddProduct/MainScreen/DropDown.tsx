import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchCentralProductImages } from "src/API/products.axios";
import { selectCredentials } from "src/Pages/Login/credentialsSlice";
import { getImageURL, IMAGEKIT_FOLDERS } from "src/utils/imageKit";
import "./Drop.css";

function List(props: any) {
  const { token } = useSelector(selectCredentials)
  const [productImage, setProductImage] = useState<any>(undefined)

  useEffect(() => {
    fetchCentralProductImages(token!, 100, 0, props?.opt?.id).then((result: any) => {
      const imageName = result.data?.data?.filter((filterItem: any) => filterItem.imageName?.includes('.'))?.[0]?.imageName
      if (imageName) {
        setProductImage(getImageURL(imageName, IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE))
      }
    })
  }, [])

  return (
    <div className="drop-main cursor-pointer" onClick={() => props.onSelect(props.opt)}>
      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-cover bg-center bg-gradient-to-br from-blue-100 to-indigo-100">
        {productImage && <img src={productImage} alt="Avatar" className="object-cover w-full h-full" />}
      </div>
      <div>
        <div className="text-xl font-bold text-gray-700">
          {props.opt.name}
        </div>
        <div className="text-base text-gray-400">{props.opt.description}</div>
        {/* <div className="text-xs font-bold text-gray-400">{props.opt.price}</div> */}
      </div>
    </div>
  );
}

function DropDown(props: any) {
  const [value, setValue] = useState("");
  const [opts, setOpts] = useState(props.options || []);
  const [selected, setSelected] = useState({});
  const [isdisabled, setIsdisabled] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate()

  function search(e: any) {
    let text = e.target.value;
    setValue(text);
  }

  useEffect(() => {
    let dises = props.options.filter((a: any) => a.name.indexOf(value) != -1);
    if (dises.length == 0) setIsdisabled(false);
    else setIsdisabled(true);
  }, [value])

  function getSearchedOpts() {
    let searched = props.options.filter((a: any) => a.name.indexOf(value) != -1);
    console.log('opts', opts)
    console.log('searched', searched)

    return searched
  }

  function add(e: any) {
    let key = e.nativeEvent.key || "Enter";
    if (key == "Enter" && !isdisabled) {
      setOpts([...opts, { name: value, value }]);
    }
    search({ target: { value } });
    props.onSelect({
      name: value
    })
    navigate('/create-product')
    setIsdisabled(true);
  }
  function select(e: any) {
    setSelected(e);
    setIsOpen(false);
    setValue(e.name);
    if (props.onSelect) {
      props.onSelect(e)
      navigate('/create-product')
    }
  }

  function renderListItems() {
    const listItems = getSearchedOpts()
    if (listItems?.length === 0) {
      return <div className="p-4">No existing products found, add this as a new product by Clicking Add Button.</div>
    }
    return listItems.map((opt: any) => {
      console.log('opt1')
      return <List key={opt.id} opt={opt} onSelect={select} />
    })
  }
  return (
    <div className="w-full dropdown-container">
      <div className="flex gap-2">
        <input
          type="text"
          onChange={search}
          // onKeyPress={add}
          value={value}
          onFocus={() => setIsOpen(true)}
          // onBlur={() => setIsOpen(false)}
          className="p-2 pl-4 border border-gray-200 rounded-lg input-field focus:ring-2 focus:outline-none dark:border-gray-600 dark:bg-gray-600 dark:text-gray-200 dark:focus:bg-gray-600"
          placeholder="Search or create product..."
        />
        <button
          disabled={isdisabled}
          className={`${isdisabled ? "hide-create-btn" : "show-create-btn"} bg-white dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500`}
          onClick={add}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className={isOpen ? "drop-open" : "drop-close"}>
        {isOpen
          ? renderListItems()
          : []}
        {/* <div className={isdisabled ? "hide-create-div" : "show-create-div"}>
          <p className="font-bold text-gray-600">+ Add this new product</p>
        </div> */}
      </div>
      <div className="close-dropdown" onClick={() => setIsOpen(false)}></div>
    </div>
  );
}

export default DropDown;
