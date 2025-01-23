import { Loader as LoaderIcon } from "lucide-react"

interface LoaderProps {
  size?: "small" | "medium" | "large"
}

const Loader: React.FC<LoaderProps> = ({ size = "medium" }) => {
  let logoSize = 20
  let fontSize = "text-sm"

  switch (size) {
    case "small":
      logoSize = 12
      fontSize = "text-xs"
    case "large":
      logoSize = 20
      fontSize = "text-md"
  }
  return (
    <div className='flex items-center gap-2'>
      <LoaderIcon
        size={logoSize}
        className='animate-[spin_2s_linear_infinite] text-lime-400'
      />
      <span className={`${fontSize} font-bold uppercase lexend-giga-700`}>
        Loading...
      </span>
    </div>
  )
}

export default Loader
