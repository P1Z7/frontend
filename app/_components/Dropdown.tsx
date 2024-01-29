import { Listbox, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";

interface Props {
  itemList: string[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

/**
 * @param itemList 드롭다운으로 보여줄 item 목록
 * @param selected 선택된 item을 저장할 state값
 * @param setSelected item state를 바꿔주는 setter 함수
 */
const Dropdown = ({ itemList, selected, setSelected }: Props) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="mt-1 relative">
        <Listbox.Button className="sm:text-sm relative h-48 w-full cursor-default rounded-lg bg-white px-16 py-12 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
          <span className="block truncate">{selected}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-16">
            <div>열기</div>
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="mt-1 py-1 text-base sm:text-sm absolute z-popup max-h-[170px] w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            {itemList.map((item, idx) => (
              <Listbox.Option
                key={idx}
                className={({ active }) =>
                  `relative flex h-36 cursor-default select-none items-center px-16 py-12 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"}`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{item}</span>
                    {selected ? <span className="pl-3 absolute inset-y-0 right-0 flex items-center text-amber-600">체크</span> : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Dropdown;
