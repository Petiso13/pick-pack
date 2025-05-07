import { useState } from "react"
import { BiChevronDown } from "react-icons/bi"
import { AiOutlineSearch } from "react-icons/ai"
import classNames from "classnames"

interface Props {
  options: string[]
  placeholder: string
}

const Selector = ({ options, placeholder }: Props) => {
  const [isOpened, setIsOpened] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  return (
    <div className="w-72 font-medium h-80">
      <div className="bg-white w-full p-2 flex items-center justify-between border rounded"
        onClick={() => setIsOpened(!isOpened)}>
        <span className="text-black"> {selectedOption ?? placeholder} </span>
        <BiChevronDown fill="black" size={20} className={classNames({ "rotate-180": isOpened })} />
      </div>
      <ul
        className={classNames({
          "bg-white mt-2 overflow-y-auto max-h-0": true,
          "max-h-60": isOpened,
        })}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <AiOutlineSearch size={18} />
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Escriba su busqueda"
            className="placeholder:text-gray-700 p-2 outline-none text-black"
          />
        </div>
        {
          options.map(option => {
            return <li key={option} className={classNames({
              "text-black p-2 hover:bg-sky-600 hover:text-white": true,
              "bg-sky-600 text-white": option === selectedOption,
              hidden: !option.toLowerCase().startsWith(inputValue)
            }
            )}
              onClick={() => setSelectedOption(option)}
            >{option}</li>
          })
        }
      </ul>

    </div>
  )

}

export default Selector;
