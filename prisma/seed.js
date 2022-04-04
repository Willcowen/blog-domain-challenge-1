const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const createdUsers = await prisma.user.createMany({
    data: [
      {
        username: "alicem",
        email: "alicemartin@gmail.com",
        firstName: "Alice",
        lastName: "Martin",
      },
      {
        username: "chrism",
        email: "chrismartin@gmail.com",
        firstName: "Chris",
        lastName: "Martin",
      },
      {
        username: "ryane",
        email: "ryanevans@gmail.com",
        firstName: "Ryan",
        lastName: "Evans",
      },
      {
        username: "ashleys",
        email: "ashleystearn@gmail.com",
        firstName: "Ashley",
        lastName: "Stearn",
      },
      {
        username: "pimk",
        email: "pimknippels@gmail.com",
        firstName: "Pim",
        lastName: "Knippels",
      },
      {
        username: "jimc",
        email: "jimcummings@gmail.com",
        firstName: "Jim",
        lastName: "Cummings",
      },
    ],
  });

  const createProfile = await prisma.profile.create({
    data: {
      profilePictureURL: "examplepictureURL.com",
      biography: "Hi there, my name is Alice and welcome to my profile....",
      user: {
        connect: {
          id: 1,
        },
      },
    },
  });

  const createPost = await prisma.post.create({
    data: {
      title: "Here is my first post!",
      content: "I am going to write about x and y",
      published: true,
      pictureURL: "examplepictureURL.com",
      user: {
        connect: {
          id: 1,
        },
      },
    },
  });

  const createComment = await prisma.comment.create({
    data: {
      content: "I really like what you've mentioned on this post...",
      user: {
        connect: {
          id: 2,
        },
      },
      post: {
        connect: {
          id: 1,
        },
      },
    },
  });

  const createReply = await prisma.comment.create({
    data: {
      content: "I do not agree with this!",
      user: {
      connect: {
        id: 3,
      },
    },
    comment: {
      connect: {
        id: 1,
      },
    },
    post: {
      connect: {
        id: 1,
      },
    },
  },
  });

  // console log for each step.
  console.log(`${createdUsers.count} users created`, createdUsers);
  console.log("Profile created for Alice", createProfile);
  console.log("Post created for Alice", createPost);
  console.log("Comment created for Alice's Post by Chris.", createComment);
  console.log("Reply to comment 1", createReply)

  // Don't edit any of the code below this line
  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
