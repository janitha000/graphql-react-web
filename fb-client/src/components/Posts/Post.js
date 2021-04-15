import React, { useContext, useState } from 'react'
import './Post.css'
import moment from 'moment'
import { Link } from 'react-router-dom';
import userImage from '../../images/user.png'
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { BiCommentDetail } from 'react-icons/bi'
import { IconContext } from "react-icons";
import { MdDelete } from "react-icons/md";
import { AuthContext } from '../../contexts/auth';

import LikeButton from './LikeButton'



const Post = ({ post }) => {
    const { username, body, createdAt, comments, likes, commentsCount, likesCount, id, image } = post;
    const [showComments, setShowComments] = useState(false)
    const { user } = useContext(AuthContext)

    console.log(post)

    return (

        <div className="post">
            <div className="post__top">
                <div className="post__image">
                    <img src={image ? image : userImage} alt={username} />
                </div>
                <div className="post__author">
                    <div className="post__name">{username}</div>
                    <div className="post__time">
                        <Link to={`/posts/${id}`}>{moment(createdAt).fromNow()}
                        </Link>
                        {user && username === user.user.username && <IconContext.Provider value={{ color: 'grey', size: 20 }}>
                            <div className=""><MdDelete /></div>
                        </IconContext.Provider>}


                    </div>

                </div>
            </div>
            <div className="post__content">{body}</div>
            <div className="post__interactions">
                <LikeButton post={{ likes, likesCount, id }} user={user} />
                <IconContext.Provider value={{ color: 'blue' }}>
                    <div className="post__comments">
                        <BiCommentDetail onClick={() => setShowComments((preV) => !preV)} /> {commentsCount}

                    </div>
                </IconContext.Provider>
            </div>
            <div className="comment__items" style={{ display: showComments ? 'block' : 'none' }}>
                {comments && comments.map(comment => (
                    <Comment comment={comment} key={comment.id} />
                ))}


            </div>
        </div>
    )
}

const Comment = ({ comment: { id, body, username, createdAt, image } }) => {
    return (
        <div className="comment__item">
            <div className="post__comment__top">
                <div className="comment__image">
                    <img src={image ? image : userImage} alt={username} />
                </div>
                <div className="comment__author">
                    <div className="comment__name">{username}</div>
                    <div className="comment__time"> {moment(createdAt).fromNow()}</div>
                </div>
            </div>
            <div className="comment__content">
                {body}
            </div>
        </div>
    )
}



export default Post
