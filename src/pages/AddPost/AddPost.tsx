import React, { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";

import Title from "../../components/Title";
import Input from "../../components/Input";

import styles from "./AddPost.module.scss";
import Button from "../../components/Button";
import { ButtonType } from "../../utils/@globalTypes";
import classNames from "classnames";
import { addNewPost } from "../../redux/reducers/postSlice";
import { RoutesList } from "../../pages/Router";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Theme, useThemeContext } from "../../context/Theme/Context";

const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useThemeContext();

  const [title, setTitle] = useState("");
  const [lessonNum, setLessonNum] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<ImageListType>([]);
  const [text, setText] = useState("");

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    formData.append("description", description);
    formData.append("lesson_num", lessonNum);
    formData.append("image", images[0].file as Blob);

    dispatch(
      addNewPost({
        callback: () => navigate(RoutesList.Home),
        data: formData,
      })
    );
  };

  const isDark = theme === Theme.Dark;

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerWrapper}>
        <div className={styles.navigation}>
          <NavLink
            to={RoutesList.Home}
            className={classNames(styles.navItem, {
              [styles.darkNavItem]: isDark,
            })}
          >
            Home
          </NavLink>
          <div className={styles.navItem}>Add post</div>
        </div>
        <Title title={"AddPost"} />
      </div>
      <div className={styles.inputWrapper}>
        <Input
          title="Title"
          value={title}
          onChange={setTitle}
          inputType="text"
          placeholder="Add your title"
          className={styles.input}
        />
        <Input
          title="Lesson Number"
          value={lessonNum}
          onChange={setLessonNum}
          inputType="text"
          placeholder="Add your lesson number"
          className={styles.input}
        />
        <ImageUploading
          multiple={false}
          value={images}
          onChange={onChange}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className={styles.uploadImageWrapper}>
              <div
                className={classNames(styles.title, {
                  [styles.darkTitle]: isDark,
                })}
              >
                Image
              </div>
              {imageList.length === 0 ? (
                <div
                  className={classNames(styles.dragNDrop, {
                    [styles.draggable]: isDragging,
                    [styles.dargDragNDrop]: isDark,
                  })}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </div>
              ) : (
                <Button
                  title={"Remove all images"}
                  type={ButtonType.Secondary}
                  onClick={onImageRemoveAll}
                />
              )}
              {imageList.map((image, index) => (
                <div key={index} className={styles.imageItem}>
                  <img
                    src={image["data_url"]}
                    alt=""
                    width="500"
                    height="170"
                  />
                  <div className={styles.updateButtonsContainer}>
                    <Button
                      title={"Update"}
                      className={styles.updateButton}
                      type={ButtonType.Secondary}
                      onClick={() => onImageUpdate(index)}
                    />
                    <Button
                      title={"Remove"}
                      className={styles.updateButton}
                      type={ButtonType.Secondary}
                      onClick={() => onImageRemove(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
        <Input
          title="Description"
          value={description}
          onChange={setDescription}
          inputType="text"
          placeholder="Add your description"
          className={styles.input}
        />
        <div className={styles.textarea}>
          <Input
            textarea
            title="Text"
            value={text}
            onChange={setText}
            inputType="text"
            placeholder="Add your text"
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <Button
          title="Delete post"
          onClick={() => {}}
          type={ButtonType.Error}
        />
        <div className={styles.actionButtonsWrapper}>
          <Button
            title="Cancel"
            onClick={() => {}}
            type={ButtonType.Secondary}
          />
          <Button
            title="Add post"
            onClick={onSubmit}
            type={ButtonType.Primary}
          />
        </div>
      </div>
    </div>
  );
};

export default AddPost;
