import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchCentralProductImages } from "src/API/products.axios";
import { selectCredentials } from "src/Pages/Login/credentialsSlice";
import { getImageURL, IMAGEKIT_FOLDERS } from "src/utils/imageKit";
import "./Drop.css";
import { Length, validate } from 'class-validator';


export class Post {
  @Length(3, 50)
  productName!: string;
}

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
        <div className="text-xl font-bold text-gray-700 dark:text-gray-200">
          {props.opt.name}
        </div>
        <div className="text-base text-gray-400 dark:text-gray-300">{props.opt.description}</div>
        {/* <div className="text-xs font-bold text-gray-400">{props.opt.price}</div> */}
      </div>
    </div>
  );
}

function DropDown(props: any) {
  const [value, setValue] = useState("");
  const [opts, setOpts] = useState(props.options || []);

  const [isOpen, setIsOpen] = useState(false);
  const [isValidProduct, setIsValidProduct] = useState<boolean>(true);


  const navigate = useNavigate()

  function search(e: any) {
    let text = e.target.value;
    setValue(text);
  }

  function getSearchedOpts() {
    let searched = props.options.filter((a: any) => a.name.indexOf(value) != -1);

    return searched
  }

  function add(e: any) {

    let post = new Post();
    post.productName = value;

    let key = e.nativeEvent.key || "Enter";
    if (key == "Enter") {
      setOpts([...opts, { name: value, value }]);
    }
    search({ target: { value } });
    props.onSelect({
      name: value
    })

    validate(post).then(errors => {
      if (errors.length > 0) {
        console.log("validation failed. errors: ", errors);
        setIsValidProduct(false);
      } else {
        setIsValidProduct(true);
        console.log("validation succeed");
        navigate('/create-product')
      }
    });
  }

  function select(e: any) {
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
      return <div className="p-4">
        <button
          className="border w-full rounded mb-6 p-6 flex bg-white dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500"
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
          <div className="ml-4 mt-1">Create <strong>{value}</strong> as a new product </div>
        </button>
        <span className={"flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 mb-10 ml-1 "
          + (isValidProduct ? 'hidden' : '')}>
          Invalid product name !
        </span>
        <div className="text-center">No existing products found, add this as a new product by Clicking Add Button.
        </div>
      </div>
    }
    return [...(value.length > 0 ? [(<> <button
      className="border w-full rounded p-6 flex bg-white dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500"
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
      <div className="ml-4 mt-1">Create <strong>{value}</strong> as a new product </div>
    </button>

      <span className={"flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 mb-10 ml-1 "
        + (isValidProduct ? 'hidden' : '')}>
        Invalid product name !
      </span>

    </>

    )] : []), , ...listItems.map((opt: any) => {
      console.log('opt1')
      return <List key={opt.id} opt={opt} onSelect={select} />
    })]
  }
  return (
    <div className="w-full">
      <input
        type="text"
        onChange={search}
        value={value}
        onFocus={() => setIsOpen(true)}
        className="p-2 pl-4 w-full border border-gray-200 rounded-lg input-field focus:ring-2 focus:outline-none dark:border-gray-600 dark:bg-gray-600 dark:text-gray-200 dark:focus:bg-gray-600"
        placeholder="Search or create product..."
      />
      <div className={`dark:bg-gray-700 ${isOpen ? "drop-open h-72" : "drop-close"}`}>
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
