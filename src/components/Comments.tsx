import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/slices/auth";
import { useEffect, useState } from "react";
import { IComment } from "../models/product";
import axios from "../axios";
import { Link } from "react-router-dom";

interface CommentsProps {
  modelId: string;
}
const Comments = ({ modelId }: CommentsProps) => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentText, setCommentText] = useState<string>("");
  useEffect(() => {
    axios.get(`/api/comment/${modelId}`).then((res) => {
      console.log("resuld", res);
      setComments(res.data);
    });
  }, []);
  const sendComment = () => {
    axios.post(`/api/comment/${modelId}`, commentText).then((res) => {
      console.log("resuld", res);
      setComments([...comments, res.data]);
    });
  };
  const user = useSelector(getUser);
  return (
    <div className="flex flex-col gap-4 ">
      {user ? (
        <div className="flex gap-4">
          <div className="h-12 w-12 rounded-full bg-indigo-200">
            <img
              src={user.img ?? "noimg.png"}
              className=" rounded-full h-full border bg-indigo-200  object-cover"
            />
          </div>

          <div className=" flex flex-col items-end flex-grow gap-2">
            <textarea
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
              className=" bg-transparent border-b w-full outline-none focus:border-indigo-400 focus:border-b-2"
              placeholder="Коментарий"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setCommentText("")}
                className=" hover:bg-gray-200 rounded-xl p-1 px-4 text-sm font-bold transition"
              >
                Отмена
              </button>
              <button
                onClick={sendComment}
                className={`${
                  commentText.length
                    ? "bg-indigo-400 hover:bg-indigo-500"
                    : "bg-gray-300 "
                } rounded-xl transition p-1 px-4 text-sm text-white font-bold`}
              >
                Отправить
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Войдите чтобы отправлять комментарии</div>
      )}
      {!comments.length ? (
        <div className="flex flex-col gap-4">
          {/* {comments.map((item, index) => (
            <div className="flex gap-4">
              <div className="h-12 w-12 bg-indigo-200 rounded-full">
                <img
                  src={item.user.img ?? "noimg.png"}
                  className=" rounded-full h-full border bg-indigo-200 "
                />
              </div>

              <div>
                <div className="flex gap-2 items-center">
                  <Link
                    to={`/${item.user.email}`}
                    className=" font-bold text-indigo-400"
                  >
                    {item.user.email}
                  </Link>
                  <p className=" text-xs">{item.date}</p>
                </div>

                <p>{item.text}</p>
              </div>
            </div>
          ))} */}
                      <div className="flex gap-4">
              <div className="h-12 w-12 bg-indigo-200 rounded-full">
                <img
                  src={user!.img}
                  className=" rounded-full h-full border bg-indigo-200 object-cover"
                />
              </div>

              <div>
                <div className="flex gap-2 items-center">
                  <Link
                    to={`/`}
                    className=" font-bold text-indigo-400"
                  >
                    AnckerStudios
                  </Link>
                  <p className=" text-xs">28/05/23</p>
                </div>

                <p>Хорошая детализация. Классно получилось! </p>
              </div>
            </div>
          <div className="flex gap-4">
              <div className="h-12 w-12 bg-indigo-200 rounded-full">
                <img
                  src={"https://i.pinimg.com/originals/d3/25/d2/d325d2bf6c139582b1cf0595444810b4.jpg"}
                  className=" rounded-full h-full border bg-indigo-200 object-cover"
                />
              </div>

              <div>
                <div className="flex gap-2 items-center">
                  <Link
                    to={`/`}
                    className=" font-bold text-indigo-400"
                  >
                    Tori Tih
                  </Link>
                  <p className=" text-xs">27/05/23</p>
                </div>

                <p>Обожаю шахматы! Очень качественная модель</p>
              </div>
            </div>
            {/* <div className="flex gap-4">
              <div className="h-12 w-12 bg-indigo-200 rounded-full">
                <img
                  src={"https://sun9-54.userapi.com/impg/En3jYJQjcSIT_L93j3Z1rfWJfkXhrvKyX4IHgA/-CieZKOxhFg.jpg?size=200x200&quality=95&sign=19a17af6cfc25d50795a62c99ba84c07&c_uniq_tag=fOfAxiqm3sZCKOucfVgxs7-DHXz0tNh3nSz_JShsl0s&type=album"}
                  className=" rounded-full h-full border bg-indigo-200 object-cover"
                />
              </div>

              <div>
                <div className="flex gap-2 items-center">
                  <Link
                    to={`/`}
                    className=" font-bold text-indigo-400"
                  >
                    Serhio
                  </Link>
                  <p className=" text-xs">27/05/23</p>
                </div>

                <p>Мне не понравилось...</p>
              </div>
            </div> */}

            <div className="flex gap-4">
              <div className="h-12 w-12 bg-indigo-200 rounded-full">
                <img
                  src={"https://sun7-20.userapi.com/impf/c854428/v854428839/128f45/lYtY49GaClI.jpg?size=415x474&quality=96&sign=70dea5eb47a192030626e72eaa9904cc&type=album"}
                  className=" rounded-full h-full w-full border bg-indigo-200 object-cover"
                />
              </div>

              <div>
                <div className="flex gap-2 items-center">
                  <Link
                    to={`/`}
                    className=" font-bold text-indigo-400"
                  >
                    Geller
                  </Link>
                  <p className=" text-xs">27/05/23</p>
                </div>

                <p>11/10</p>
              </div>
            </div>
        </div>
      ) : (
        <div> Коментарие еще нет </div>
      )}
    </div>
  );
};

export default Comments;
