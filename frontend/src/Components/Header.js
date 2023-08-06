import React, { useContext } from "react";
import "./Header.css";

import { ThemeContext } from "../App";

export default function Header() {
	const { theme } = useContext(ThemeContext);
	return (
		<>
			<div id={theme}>
				<div className="header">
					<span>Header</span>
				</div>
			</div>
		</>
	)
}