import React, { type FC, type ReactNode } from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'

type ContainerProps = {
	className?: string
	children: ReactNode
}

export const Container: FC<ContainerProps> = ({ className, children }) => {
	const combinedClassName = classNames(styles.container, className)

	return <div className={combinedClassName}>{children}</div>
}
