import React, { useEffect, useState } from "react";
import { Header } from "src/Components/Header";
import AppliedFilters from "./AppliedFilters";
import Button from "src/Components/Style/Button";
import DropList from "src/Components/Style/DropList";
import { useDispatch, useSelector } from "react-redux";
import { pushItemsToCart, selectPlaceOrderInfo } from "../placeOrderSlice";
import { useNavigate } from "react-router";
import { fetchProducts } from "src/API/products.axios";
import { selectCredentials } from "src/Pages/Login/credentialsSlice";
import ChatImg from "../../../Product/assets/no_data.svg";
import { getImageURL, IMAGEKIT_FOLDERS } from "src/utils/imageKit";
import { selectAddItemsproductFilters } from "./addProductFiltersSlice";
import ModalViewer from "src/Components/Style/ModalViewer";
import { FilterPopup } from "./FilterPopup";
import useQueryParam from "src/useQueryParams";
import { hapticFeedback } from "src/utils/vibrate";

export default function AddItem() {
  const [itemList, setItemList] = React.useState<any[]>([]);
  const [selectedItems, setSelectedItems] = React.useState<any>([]);
  const [filterPopupOpen, setfilterPopupOpen] =
    useQueryParam<boolean>("filterPopupOpen");

  const [isDropOpen, setIsDropOpen] = React.useState<
    | {
        isAdd: boolean;
        isOpen: any;
      }
    | undefined
  >(undefined);

  const filters = useSelector(selectAddItemsproductFilters);
  const [searchValue, setSearchValue] = useState<any>(undefined);

  const { token, user } = useSelector(selectCredentials);

  const placeOrder = useSelector(selectPlaceOrderInfo);
  const isSupplier = localStorage.getItem("isSupplier") === "true";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // TODO use placeOrder.orgId
    fetchProducts({
      token: token!,
      outOfStock: false,
      organizationId: isSupplier ? user?.organizationId! : placeOrder.orgId!,
      limit: 100,
      offset: 0,
      search: searchValue,
      ordering: filters?.sorting,
      categoryIds: filters?.categories?.length
        ? `${filters?.categories
            ?.map((item: { id: string }) => item.id)
            .join(",")}`
        : undefined,
      brandIds: filters?.brands?.length
        ? `${filters?.brands?.map((item: { id: string }) => item.id).join(",")}`
        : undefined,
    }).then((result: any) => {
      setItemList(result.data?.data ?? []);
    });
  }, [
    token,
    isSupplier,
    user?.organizationId,
    placeOrder.orgId,
    searchValue,
    filters?.categories,
    filters?.brands,
    filters?.sorting,
    searchValue,
  ]);

  function onSubmit() {
    //TODO Add to dispatch
    dispatch(pushItemsToCart(selectedItems));
    navigate("/place-order");
  }

  function handleAddItem(item: any, caseQuantity: number) {
    const isAlreadyPresent = selectedItems?.some(
      (someItem: any) => someItem.id === item.id
    );
    if (isAlreadyPresent) {
      const _selectedItems = selectedItems
        ?.map((mapItem: any) => {
          if (mapItem.id === item.id) {
            return {
              ...mapItem,
              quantity: mapItem.quantity + caseQuantity,
            };
          }
          return mapItem;
        })
        .filter((filterItem: any) => filterItem.quantity > 0);

      setSelectedItems(_selectedItems);
    } else {
      const _selectedItems = [
        ...selectedItems,
        {
          ...item,
          quantity: caseQuantity,
        },
      ];

      setSelectedItems(_selectedItems);
    }
  }

  function updateItem(item: any, caseQuantity: number) {
    const isAlreadyPresent = selectedItems?.some(
      (someItem: any) => someItem.id === item.id
    );
    if (isAlreadyPresent) {
      const _selectedItems = selectedItems
        ?.map((mapItem: any) => {
          if (mapItem.id === item.id) {
            return {
              ...mapItem,
              quantity: Math.abs(caseQuantity),
            };
          }
          return mapItem;
        })
        .filter((filterItem: any) => filterItem.quantity > 0);

      setSelectedItems(_selectedItems);
    } else {
      const _selectedItems = [
        ...selectedItems,
        {
          ...item,
          quantity: Math.abs(caseQuantity),
        },
      ];

      setSelectedItems(_selectedItems);
    }
  }

  function handleRemoveItemItem(item: any, caseQuantity: number) {
    const _selectedItems = selectedItems
      ?.map((mapItem: any) => {
        if (mapItem.id === item.id) {
          return {
            ...mapItem,
            quantity: mapItem.quantity - caseQuantity,
          };
        }
        return mapItem;
      })
      .filter((filterItem: any) => filterItem.quantity > 0);

    setSelectedItems(_selectedItems);
  }

  function calculatePriceOfSelected() {
    const price = selectedItems?.reduce(
      (a: any, b: any) => a + b.quantity * parseFloat(b?.rate),
      0
    );
    return price;
  }

  function closeDropList() {
    setIsDropOpen({
      isAdd: false,
      isOpen: undefined,
    });
  }

  function renderItems() {
    if (itemList?.length === 0) {
      return (
        <div>
          <img className="mt-12 h-48 p-6 m-auto" src={ChatImg} />
          <div className="text-center px-6 w-2/3 m-auto mb-8 dark:text-gray-300">
            {" "}
            Sorry the seller has no products for sale.{" "}
          </div>
        </div>
      );
    }
    return itemList.map((item, index) => (
      <div
        className="grid grid-cols-20/50/30 w-full bg-white-200 mt-2 border-b-2 border-gray-100 dark:border-gray-700 py-4"
        key={`${index}`}
      >
        <div className="relative self-center w-16 h-20 rounded-lg overflow-hidden bg-cover bg-center bg-gradient-to-br from-blue-100 to-indigo-100">
          {item?.thumbnailImage && (
            <img
              src={getImageURL(
                item?.thumbnailImage,
                IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE
              )}
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          )}
        </div>

        <div className="flex flex-col ml-2 self-center">
          <div className="flex text-xl font-bold text-gray-600 dark:text-gray-200">{`${item.centralCatalogue?.name}`}</div>
          <div className="flex text-sm font-bold text-gray-600 dark:text-gray-200">{` ${
            item?.aliasName ? `( ${item?.aliasName})` : ""
          }`}</div>
          <div className="flex font-bold text-xs text-gray-300">
            #213r423423423423423
          </div>

          <div className="grid grid-cols-2 mt-1">
            <div className="text-xs font-semibold text-gray-500  dark:text-gray-400">
              <p>MRP:</p>
              <p>₹{item?.mrpPrice}</p>
            </div>
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              <p>Cost:</p>
              <p>{item?.rate}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex text-blue-600 dark:text-blue-400 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                hapticFeedback()
                handleRemoveItemItem(item, 1);
              }}
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            {/* <DropList
                        isOpen={isDropOpen?.isOpen === index && !isDropOpen.isAdd}
                        list={[{
                            appearance: 'danger',
                            label: 'Remove 1 Item',
                            onClick: () => {
                                handleRemoveItemItem(item, 1);
                                closeDropList();                         
                            }
                        }

                        //Hidden 1 Case
                        
                        // , {
                        //     appearance: 'danger',
                        //     label: 'Remove 1 Case (10 Pc)',
                        //     onClick: () => {
                        //         handleRemoveItemItem(item, 10);
                        //         closeDropList();                         
                        //     }
                        // }
                    
                        ]}
                        trigger={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>}
                        onClick={() => {
                            if (isDropOpen?.isOpen === index && !isDropOpen.isAdd) {
                                setIsDropOpen({
                                    isAdd: false,
                                    isOpen: undefined
                                })
                            } else {
                                setIsDropOpen({
                                    isAdd: false,
                                    isOpen: index
                                })
                            }
                        }}
                    /> */}
          </div>
          <div className="flex items-center dark:text-gray-200">
            <form autoComplete="off">
              <input
                className="w-10 border-dashed border px-1 border-indigo-300 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 "
                type="number"
                name="qty"
                id="qty"
                onChange={(e) => {
                  updateItem(item, parseInt(e.target.value.toString()));
                }}
                value={
                  selectedItems?.find(
                    (findItem: any) => findItem.id === item.id
                  )?.quantity ?? 0
                }
              />
            </form>
          </div>

          <div className="flex text-blue-600 dark:text-blue-400 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                hapticFeedback()
                handleAddItem(item, 1);
              }}
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            {/* <DropList
                        isOpen={isDropOpen?.isOpen === index && isDropOpen.isAdd}
                        list={[{
                            appearance: 'primary',
                            label: 'Add 1 Item',
                            onClick: () => {
                                handleAddItem(item, 1);
                                closeDropList();                         
                            }
                        }
                         
                        //Hidden 1 Case option

                        // ,{
                        //     appearance: 'primary',
                        //     label: 'Add 1 Case (10 Pc)',
                        //     onClick: () => {
                        //         handleAddItem(item, 10);
                        //         closeDropList();                         
                        //     }
                        // }
                    
                        ]}
                        trigger={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>}
                        onClick={() => {
                            if (isDropOpen?.isOpen === index && isDropOpen.isAdd) {
                                setIsDropOpen({
                                    isAdd: true,
                                    isOpen: undefined
                                })
                            } else {
                                setIsDropOpen({
                                    isAdd: true,
                                    isOpen: index
                                })
                            }
                        }}
                    /> */}
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div className="bg-white min-h-screen dark:bg-gray-900">
      <div className="w-full pb-3 bg-white shadow dark:bg-gray-800">
        <Header
          isSticky={false}
          onBackClick={() => navigate("/place-order")}
          heading="Add Item"
        />
        <AppliedFilters
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          onFilterClick={() => setfilterPopupOpen(true)}
        />
      </div>
      <ModalViewer
        body={<FilterPopup />}
        isOpen={filterPopupOpen!}
        onClose={() => setfilterPopupOpen(false)}
      />
      <div className="px-4 pb-24">{renderItems()}</div>
      <div className="fixed bottom-10 m-auto left-0 right-0 px-4">
        <Button onClick={onSubmit}>
          Add {selectedItems?.length} items (₹{calculatePriceOfSelected()})
        </Button>
      </div>
    </div>
  );
}
