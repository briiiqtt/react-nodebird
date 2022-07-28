import { useCallback, useState, useRef } from "react";
import { Form, Input, Button } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { addPost } from "../reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();

  const imageInput = useRef();
  const { imagePaths } = useSelector((state) => state.post);
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  });

  const [text, setText] = useState("");
  const onChangeText = useCallback(
    (e) => {
      setText(e.target.value);
    },
    [text]
  );
  const onSubmit = useCallback(() => {
    dispatch(addPost);
    setText("");
  }, []);
  return (
    <Form
      style={{ margin: "10px 0 20" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="머선일이 있었나요?"
      ></Input.TextArea>
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => (
          <div key={v} style={{ display: "inline-block" }}>
            <img src={v} style={{ width: "200px" }} alt={v}></img>
          </div>
        ))}
      </div>
    </Form>
  );
};
export default PostForm;