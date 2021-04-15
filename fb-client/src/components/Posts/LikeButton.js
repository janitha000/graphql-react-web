import React, { useEffect, useState } from 'react'
import { IconContext } from "react-icons";
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const LikeButton = ({ post: { likes, likesCount, id }, user }) => {
    const [liked, setLikes] = useState(false)
    const [likePost, { error }] = useMutation(LIKE_POST, {
        variables: { postId: id },
        update(_, result) {
            console.log(result)
        },
        onError(err) {
            console.log(err)
        }
    })

    const onLikeButtonClick = () => {
        likePost();
        setLikes((preVal) => (!preVal))
    }

    useEffect(() => {
        if (user && likes.find(x => x.username === user.user.username)) {
            setLikes(true)
        }
    }, [likes, user])


    return (
        <>
            <IconContext.Provider value={{ color: 'red' }}>
                <div className="post__likes" onClick={onLikeButtonClick}>
                    {liked ? <FaHeart /> : <FaRegHeart />}{likesCount}
                </div>
            </IconContext.Provider>
        </>
    )
}

const LIKE_POST = gql`
    mutation likePost($postId: String!){
        likePost(postId: $postId){
            id
            likes {username}
            likesCount
        }
    }
`

export default LikeButton
