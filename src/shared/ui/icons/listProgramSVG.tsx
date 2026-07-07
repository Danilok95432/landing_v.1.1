import { FC } from "react"

type ListProgramSVGProps = {
  color?: string
}

export const ListPropgramSVG:FC<ListProgramSVGProps> = ({color = '#B0AEB9'}) => {
  return (
    <svg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect x='0.5' width='7' height='7' fill={color} />
      <rect x='9.5' width='7' height='7' fill={color} />
      <rect x='0.5' y='9' width='7' height='7' fill={color} />
      <rect x='9.5' y='9' width='7' height='7' fill={color} />
    </svg>
  )
}
