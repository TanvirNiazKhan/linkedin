import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import "./Feed.css";
import InputOption from "./InputOption";
import ImageIcon from "@mui/icons-material/Image";
import EventIcon from "@mui/icons-material/Event";
import FeedIcon from "@mui/icons-material/Feed";
import { Avatar } from "@mui/material";
import FlipMove from "react-flip-move";
import Post from "./Post";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";

import { db } from "./firebase";
import { useStateValue } from "./StateProvider";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const [{ user }] = useStateValue();

  useEffect(() => {
    const fetchData = async () => {
      const postssCollection = collection(db, "posts");
      const postsQuery = query(postssCollection, orderBy("timestamp", "desc"));

      onSnapshot(postsQuery, async (snapshot) => {
        const postData = snapshot.docs.map((doc) => {
          return doc.data(); // Include 'return' to get the data
        });
        await setPosts(postData);
      });
    };

    fetchData(); // Call the async function
  }, []);

  function sendPost(e) {
    e.preventDefault();
    const messagesCollection = collection(db, "posts");
    addDoc(messagesCollection, {
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoURL,
      timestamp: Timestamp.fromDate(new Date()),
    });
    setInput("");
  }
  return (
    <div className="feed">
      <div className="feed_inputContainer">
        <div className="avatar_group">
          <div className="avatar">
            <Avatar
              style={{ width: "50px", height: "50px" }}
              src={user.photoURL}
            />
          </div>
          <div className="feed_input">
            <CreateIcon />
            <form action="">
              <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Start a post"
              />
              <button type="submit" onClick={sendPost}>
                Send
              </button>
            </form>
          </div>
        </div>

        <div className="feed_inputOptions">
          <InputOption Icon={ImageIcon} title="Media" color="#70B5F9" />
          <InputOption Icon={EventIcon} title="Event" color="#C37D16" />
          <InputOption Icon={FeedIcon} title="Write Article" color="#E06847" />
        </div>
      </div>
      <FlipMove>
        {posts.map((post, index) => (
          <Post
            key={post.id}
            name={post.name}
            description={post.description}
            message={post.message}
            photoUrl={post.photoUrl}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
