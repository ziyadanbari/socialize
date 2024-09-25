import { prisma } from "@/db";

async function cleanPosts() {
  try {
    // Delete all records from the Post table
    await prisma.post.deleteMany({});
    console.log("All posts have been deleted.");
  } catch (error) {
    console.error("Error deleting posts:", error);
  } finally {
    // Disconnect the Prisma Client
    await prisma.$disconnect();
  }
}

// Call the function to clean the posts
cleanPosts();
