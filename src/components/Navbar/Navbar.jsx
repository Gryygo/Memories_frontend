import { AppBar, Avatar, Toolbar, Typography, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import memoriesLogo from "../../assets/memories-Logo.png";
import memoriesText from "../../assets/memories-Text.png";

export const Navbar = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

	const logout = () => {
		dispatch({ type: "LOGOUT" });
		history.push("/");
		setUser(null);
	};

	useEffect(() => {
		const token = user?.token;
		if (token) {
			const decodedToken = decode(token);

			if (decodedToken.exp * 1000 < new Date().getTime()) logout();
		}

		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [useLocation()]);

	return (
		<AppBar className={classes.appBar} position="static" color="inherit">
			<Link to="/" className={classes.brandContainer}>
				<img src={memoriesText} alt="icon" height="45px" />
				<img src={memoriesLogo} className={classes.image} alt="icon" height="40px" />
			</Link>
			<Toolbar className={classes.toolbar}>
				{user ? (
					<div className={classes.profile}>
						<Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>
							{user.result.name.charAt(0)}
						</Avatar>
						<Typography className={classes.user} variant="h6">
							{user.result.name}
						</Typography>
						<Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
							Logout
						</Button>
					</div>
				) : (
					<Button component={Link} to="/auth" variant="contained" color="primary">
						Login
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};
