import React from 'react'
import { useForm } from '../../hooks/useForm'
import './PostForm.css'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const PostForm = ({ user }) => {
    const { values, onChange, onSubmit, clearForm } = useForm(onPostCallback, { body: '' })

    const [createPost, { error }] = useMutation(CREATE_POST, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            console.log(data)
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: { getPosts: [result.data.createPost, ...data.getPosts] }
            })
            console.log(result)
        },
        onError(err) {
            console.log(err)
        }
    })

    function onPostCallback() {
        createPost();
        clearForm();
    }

    console.log(user.token)
    return (
        <div className="home__form">
            <input
                className="home__input"
                type="text"
                value={values.body}
                placeholder="What's on you mind"
                onChange={(e) => onChange(e)}
                name="body" />
            <button className="home__input__button" onClick={onSubmit}>Post</button>
        </div>
    )
}

const CREATE_POST = gql`
    mutation createPost ($body: String!){
        createPost(body: $body){
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

export default PostForm
