import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from '@emotion/styled';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));
// To Display the user's name and email in each post.
const Header = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderBottom: '1px solid #ccc',
}));
// Show the first letter for both the first and last names.
const InitialsCircle = styled.div(() => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: 'grey',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  fontWeight: 'bold',
  marginRight: '10px',
}));

const UserInfo = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const UserName = styled.span(() => ({
  fontWeight: 'bold',
}));

const UserEmail = styled.span(() => ({
  color: '#888',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollSnapType: 'x mandatory',
  scrollBehavior: 'smooth',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const initials = name => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('');
};

const Post = ({ post, user }) => {
  const carouselRef = useRef(null);

  const handleNextClick = () => {
    if (carouselRef.current) {
      const width = carouselRef.current.querySelector('img').clientWidth + 20; // Adjust for padding
      carouselRef.current.scrollBy({
        left: width,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      const width = carouselRef.current.querySelector('img').clientWidth + 20; // Adjust for padding
      carouselRef.current.scrollBy({
        left: -width,
        behavior: 'smooth',
      });
    }
  };

  return (
    <PostContainer>
      <Header>
        <InitialsCircle>{initials(user.name)}</InitialsCircle>
        <UserInfo>
          <UserName>{user.name}</UserName>
          <UserEmail>{user.email}</UserEmail>
        </UserInfo>
      </Header>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;
