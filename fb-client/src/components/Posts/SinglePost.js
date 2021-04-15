import React, { useEffect } from 'react'
import './SinglePost.css'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Post from './Post'
import Loader from "react-loader-spinner";


const SinglePost = (props) => {
    const postId = props.match.params.postId;

    const { loading, data } = useQuery(GET_POST, {
        variables: { postId }
    })


    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', transition: "all 200ms ease" }}>
            {loading ? ((<Loader type="Bars" color="black" height={50} width={50} />))
                : data && data.getPost && <Post post={data.getPost} />}
        </div>
    )
}

const GET_POST = gql`
    query ($postId: ID!){
        getPost(postId: $postId){
            id
            body
            username
            createdAt
            comments{
                id username body
            }
            likes{
                id username
            }
            likesCount
            commentsCount
        }
    }

`



export default SinglePost
