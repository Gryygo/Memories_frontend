import React, { useRef, useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { commentPost } from "../../actions/posts";

export const CommentSection = ({ post }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const commentsRef = useRef();
	const user = JSON.parse(localStorage.getItem("profile"));
	const [comments, setComments] = useState(post?.comments);
	const [comment, setComment] = useState("");

	const handleClick = async () => {
		const finalComment = `${user.result.name}: ${comment}`;
		const newComments = await dispatch(commentPost(finalComment, post._id));
		setComments(newComments);
		setComment("");

		commentsRef.current.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div>
			<div className={classes.commentsOuterContainer}>
				<div className={classes.commentsInnerContainer}>
					<Typography gutterBottom variant="h6">
						Comments
					</Typography>
					{comments.map((c, index) => (
						<Typography key={index} gutterBottom variant="subtitle1">
							<strong>{c.split(": ")[0]}: </strong>
							<span>{c.split(": ")[1]}</span>
						</Typography>
					))}
					<div ref={commentsRef} />
				</div>
				{user?.result?.name && (
					<div style={{ width: "70%" }}>
						<Typography gutterBottom variant="h6">
							Write a comment
						</Typography>
						<TextField
							fullWidth
							minRows={4}
							variant="outlined"
							label="Comment"
							multiline
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
						<Button
							style={{ marginTop: "10px" }}
							fullWidth
							disabled={!comment}
							variant="contained"
							onClick={handleClick}
							color="primary"
						>
							Comment
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};
