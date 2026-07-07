import { FC } from "react"

type TabProgramSVGProps = {
  color?: string
}

export const TabProgramSVG:FC<TabProgramSVGProps> = ({color = '#B0AEB9'}) => {
  return (
    <svg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect x='0.5' width='4' height='4' fill={color} />
      <rect x='6.5' width='10' height='4' fill={color} />
      <rect x='0.5' y='6' width='4' height='4' fill={color} />
      <rect x='6.5' y='6' width='10' height='4' fill={color} />
      <rect x='0.5' y='12' width='4' height='4' fill={color} />
      <rect x='6.5' y='12' width='10' height='4' fill={color} />
    </svg>
  )
}
