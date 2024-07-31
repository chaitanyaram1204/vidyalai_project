const express = require('express');
const axios = require('axios');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts();
    // TODO use this route to fetch photos for each post
    // axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
    const postsWithImages = [];

    for (const post of posts) {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/albums/${post.id}/photos`,
      );
      const images = response.data.map(photo => ({ url: photo.url }));

      postsWithImages.push({
        ...post,
        images,
      });
    }

    res.json(postsWithImages);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching posts or images.' });
  }
});

module.exports = router;
