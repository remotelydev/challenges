<template>
  <div v-if="book" class="book-details container">
    <header>
      <div>
        <h1>{{ book.title }}</h1>
        <span class="author">{{ book.author }}</span>
      </div>
      <div class="votes">
        <span>Upvoted {{ book.upvotes }} times</span>
        <button
          class="button"
          :class="book.upvoted ? 'reversed' : ''"
          @click="toggleVote()"
        >
          {{ book.upvoted ? "Upvoted" : "Upvote" }}
        </button>
      </div>
    </header>

    <img :src="book.cover" :alt="book.title" />

    <h2>Synopsis</h2>
    <p class="synopsis">{{ book.synopsis }}</p>
    <div class="rating">Rating: {{ book.rating }}/10</div>

    <Comments />
  </div>
</template>
<script>
import Comments from "@/components/Comments";

export default {
  components: {
    Comments
  },
  data() {
    return {
      book: undefined
    };
  },
  created() {
    fetch(`http://localhost:3000/books/${this.$route.params.slug}`)
      .then(res => res.json())
      .then(res => {
        if (res.statusCode === 404) {
          this.$router.push("/404");
        }
        this.book = res;
      })
      .catch(err => {
        //not sure why the 404 is not catched. I guess it's a server thing
        console.error(`Error: ${err.message}`);
      });
  },
  methods: {
    toggleVote() {
      if (this.book.upvoted) {
        this.book.upvotes -= 1;
      } else {
        this.book.upvotes += 1;
      }
      this.book.upvoted = !this.book.upvoted;
    }
  }
};
</script>
<style lang="scss" scoped>
.book-details {
  background: white;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 3rem;
}

header {
  display: flex;
  justify-content: space-between;

  h1 {
    margin: 0;
    color: $gold;
  }
  .author {
    font-style: italic;
  }

  button {
    margin-left: 1rem;
  }
}

img {
  width: 500px;
  display: block;
  margin: 2rem auto;
  border-radius: 1rem;
}

.synopsis {
  white-space: pre-wrap;
}
</style>
