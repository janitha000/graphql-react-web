import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import Post from '../Posts/Post'

const Home = () => {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY)

    console.log(data)

    return (
        <div >
            {loading ? (<h1>Loading ...</h1>)
                : (data.getPosts && data.getPosts.map(post => (
                    <Post key={post.id} post={post} />)))
            }

        </div>
    )
}

const FETCH_POSTS_QUERY = gql` 
  {
    getPosts
    {
        id body username createdAt
        comments{
            id username body
        }
        likes{
            username
        }
        likesCount commentsCount
    }
  }

`

export default Home
