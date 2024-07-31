import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import { useWindowWidth } from '../../Context/WindowWidthProvider';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const { isSmallerDevice } = useWindowWidth();

  const fetchPosts = async () => {
    try {
      const limit = isSmallerDevice ? 5 : 10;
      const { data: newPosts } = await axios.get('/api/v1/posts', {
        params: {
          start: page * limit,
          limit,
        },
      });
      if (newPosts.length === 0) {
        setHasMorePosts(false);
        return;
      }
      const updatedPosts = await Promise.all(
        newPosts.map(async post => {
          const { data: album } = await axios.get(
            `https://jsonplaceholder.typicode.com/albums/${post.albumId}/photos`,
          );
          //To display the user details
          const { data: user } = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${post.userId}`,
          );
          return { ...post, album, user };
        }),
      );
      setPosts(prevPosts => [...prevPosts, ...updatedPosts]);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, isSmallerDevice]);

  const handleClick = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map((post, index) => (
          //User is for getting the name and mail
          <Post key={index} post={post} user={post.user} />
        ))}
      </PostListContainer>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {hasMorePosts && (
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        )}
      </div>
    </Container>
  );
}
