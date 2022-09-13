import React, { useState } from "react";
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	ButtonBase,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";

import useStyles from "./styles";
import { deletePost, likePost } from "../../../actions/posts";

export const Post = ({ post, setCurrentId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const user = JSON.parse(localStorage.getItem("profile"));
	const [likes, setLikes] = useState(post?.likes);

	const userId = user?.result?.jti || user?.result?._id;

	const openPost = () => history.push(`/posts/${post._id}`);
	const handleLike = async () => {
		dispatch(likePost(post._id));
		if (post.likes.find((like) => like === userId)) {
			setLikes(post.likes.filter((id) => id !== userId));
		} else {
			setLikes([...post.likes, userId]);
		}
	};

	const Likes = () => {
		if (likes.length > 0) {
			return likes.find((like) => like === userId) ? (
				<>
					<ThumbUpAltIcon fontSize="small" />
					&nbsp;
					{likes.length > 2
						? `You and ${likes.length - 1} others`
						: `${likes.length} like${likes.length > 1 ? "s" : ""}`}
				</>
			) : (
				<>
					<ThumbUpAltOutlined fontSize="small" />
					&nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
				</>
			);
		}

		return (
			<>
				<ThumbUpAltOutlined fontSize="small" />
				&nbsp;Like
			</>
		);
	};

	return (
		<Card className={classes.card} raised elevation={6}>
			<ButtonBase component="a" name="test" className={classes.cardAction} onClick={openPost}>
				<CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
				<div className={classes.overlay}>
					<Typography variant="h6">{post.name}</Typography>
					<Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
				</div>
				<div className={classes.overlay2}>
					{(user?.result?.jti === post?.creator ||
						user?.result?._id === post?.creator) && (
						<Button
							style={{ color: "white" }}
							size="small"
							onClick={() => setCurrentId(post._id)}
						>
							<MoreHorizIcon fontSize="medium" />
						</Button>
					)}
				</div>
				<div className={classes.details}>
					<Typography variant="body2" color="textSecondary">
						{post.tags.map((tag) => `#${tag.replace(" ", "")} `)}
					</Typography>
				</div>
				<Typography className={classes.title} variant="h5" gutterBottom>
					{post.title}
				</Typography>
				<CardContent>
					<Typography component="p" variant="body2" color="textSecondary">
						{post.message}
					</Typography>
				</CardContent>
			</ButtonBase>
			<CardActions className={classes.cardActions}>
				<Button
					size="small"
					disable={`${!user?.result}`}
					color="primary"
					onClick={handleLike}
				>
					<Likes />
				</Button>
				{(user?.result?.jti === post?.creator ||
					user?.result?._id === post?.creator) && (
					<Button
						size="small"
						color="primary"
						onClick={() => dispatch(deletePost(post._id))}
					>
						<DeleteIcon fontSize="small" /> &nbsp; Delete
					</Button>
				)}
			</CardActions>
		</Card>
	);
};
