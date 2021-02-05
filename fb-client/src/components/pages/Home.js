import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import Loader from "react-loader-spinner";
import './Home.css'

import gql from 'graphql-tag'

import Post from '../Posts/Post'
import PostForm from '../Posts/PostForm.js'
import { AuthContext } from '../../contexts/auth';

const Home = () => {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY)
    const { user } = useContext(AuthContext);



    return (
        <>
            {user && <PostForm user={user} />}
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                {loading ? ((<Loader type="Bars" color="black" height={50} width={50} />))
                    : (data && data.getPosts.map(post => (
                        <Post key={post.id} post={post} />)))
                }

            </div>
        </>
    )
}

const FETCH_POSTS_QUERY = gql` 
  {
    getPosts
    {
        id body username createdAt
        comments{
            id username body createdAt
        }
        likes{
            username
        }
        likesCount commentsCount
    }
  }

`

export default Home
