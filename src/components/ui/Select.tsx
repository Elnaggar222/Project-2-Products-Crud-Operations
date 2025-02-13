import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ICategory } from "../../interfaces";
import { memo } from "react";

interface IProps {
  selected: ICategory;
  setSelected: (item: ICategory) => void;
  categories: ICategory[];
}
const Select = ({ selected, setSelected, categories }: IProps) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <Label className="block text-sm/6 font-medium text-gray-900">
        Category
      </Label>
      <div className="relative" style={{ marginTop: 0 }}>
        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-lg shadow-md bg-white py-2 pl-3 pr-2 text-left text-gray-900 sm:text-sm/6 focus:outline-none border-[1px] border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <img
              alt=""
              src={selected.imageURL}
              className="size-5 shrink-0 rounded-full"
            />
            <span className="block truncate">{selected.name}</span>
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-[120px] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {categories.map((cat) => (
            <ListboxOption
              key={cat.id}
              value={cat}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
            >
              <div className="flex items-center">
                <img
                  alt=""
                  src={cat.imageURL}
                  className="size-5 shrink-0 rounded-full"
                />
                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                  {cat.name}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};
export default memo(Select);
