import React from 'react'
import './Post.css'
import moment from 'moment'
import { Link } from 'react-router-dom';
import userImage from '../../images/user.png'


const Post = ({ post }) => {
    const { username, body, createdAt, comments, likes, commentsCount, likesCount, id, image } = post;
    return (

        <div className="post">
            <div className="post__top">
                <div className="post__image">
                    <img src={image ? image : userImage} alt={username} />
                </div>
                <div className="post__author">
                    <div className="post__name">{username}</div>
                    <div className="post__time"> <Link to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Link></div>

                </div>
            </div>
            <div className="post__content">{body}</div>
            <div className="post__likes"> {likesCount}</div>
            <div className="posts__comments">{commentsCount}</div>
        </div>
    )
}

export default Post
