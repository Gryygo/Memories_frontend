import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../../actions/posts";

export const Paginate = ({ page }) => {
	const { numberOfPages } = useSelector((state) => state.posts);
	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		if (page) dispatch(getPosts(page));
	}, [dispatch, page]);

	return (
		<Pagination
			className={classes.pagBox}
			classes={{ul: classes.ul}}
			count={numberOfPages}
			page={Number(page) || 1}
			variant="outlined"
			color="primary"
			// md={{borderRadius: "0px"}}
			renderItem={(item) => (
				<PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
			)}
		/>
	);
};
