import React, { useContext } from "react";


import ThemeContext from "../context/ThemeProvider";

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