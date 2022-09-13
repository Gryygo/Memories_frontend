import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import useStyles from "./styles";
import { getPostsBySearch } from "../../actions/posts";
import { Form } from "../Form/Form";
import { Paginate } from "../Paginate/Paginate";
import { Posts } from "../Posts/Posts";

const useQuery = () => new URLSearchParams(useLocation().search);

export const Home = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const query = useQuery();
	const history = useHistory();
	const page = query.get("page") || 1;
	const searchQuery = query.get("searchQuery");
	const [currentId, setCurrentId] = useState(null);
	const [search, setSearch] = useState("");
	const [tags, setTags] = useState([]);

	const handlePress = (e) => {
		if (e.keyCode === 13) {
			searchPost();
		}
	};
	const handleAdd = (tag) => {
		setTags([...tags, tag]);
	};
	const handleDelete = (tag) => {
		setTags(tags.filter((t) => t !== tag));
	};
	const searchPost = () => {
		if (search.trim() || tags) {
			dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
			history.push(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",") || "none"}`);
		} else {
			history.push("/");
		}
	};

	return (
		<Grow in>
			<Container maxWidth="xl">
				<Grid
					container
					justifyContent="space-between"
					alignItems="stretch"
					spacing={3}
					className={classes.gridContainer}
				>
					<Grid item xs={12} sm={6} md={9}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppBar className={classes.appBarSearch} position="static" color="inherit">
							<TextField
								name="search"
								variant="outlined"
								label="Search Memories"
								fullWidth
								value={search}
								onKeyDown={handlePress}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<ChipInput
								style={{ margin: "10px 0" }}
								value={tags}
								onAdd={handleAdd}
								onDelete={handleDelete}
								label="Search Tags"
								variant="outlined"
							/>
							<Button
								onClick={searchPost}
								className={classes.searchButton}
								variant="contained"
								color="primary"
							>
								Search
							</Button>
						</AppBar>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
						{!searchQuery && !tags.length && (
							<Paper elevation={6}>
								<Paginate page={page} />
							</Paper>
						)}
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};
