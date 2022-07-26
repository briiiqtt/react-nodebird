export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "제로초",
      },
      content: "ㅎㅇㅎㅇ",
      Images: [
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ02jcTAy6AjS6poKeVmEjp-q5A1-VowyNWIQ&usqp=CAU",
        },
        {
          src: "https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/pm2rOZzTM2eif0OBmQno",
        },
        {
          src: "https://www.mindinventory.com/blog/wp-content/uploads/2018/07/reactjs-1200x600.jpg",
        },
      ],
      Comments: [
        { User: { nickname: "nero" }, content: "ㅋㅋㅋㅋ" },
        { User: { nickname: "오잉" }, content: "배고파욥" },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: "더미",
  User: {
    id: 1,
    nickname: "제로초",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
