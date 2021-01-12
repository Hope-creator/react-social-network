import profileReducer, { addPostActionCreator, deletePost } from './profile-reducer'

it('length of post should be increment', ()=>{
    let action = addPostActionCreator('tests')
    let state = {
        posts: [
            { id: 1, message: "Hi, how are you?", likesCount: 15 },
            { id: 2, message: "It's my first post", likesCount: 25 },
        ]
    }
    let newState = profileReducer(state,action)

    expect(newState.posts.length).toBe(3)
})

it('after deleting length of posts should be decrement', ()=>{
    let action = deletePost(1);
    let state = {
        posts: [
            { id: 1, message: "Hi, how are you?", likesCount: 15 },
            { id: 2, message: "It's my first post", likesCount: 25 },
        ]
    }
    let newState = profileReducer(state,action)

    expect(newState.posts.length).toBe(1)
})