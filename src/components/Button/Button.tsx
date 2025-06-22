import clsx from "clsx";
import styles from "./Button.module.css";
import type { ButtonHTMLAttributes } from "react";

export const Button = ({
	children,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
	<button type="button" className={clsx("skeu-elem", styles.button)} {...props}>
		{children}
	</button>
);
