<template>
  <div class="books container">
    <router-link to="/books">
      <h1>Top books of all time</h1>
    </router-link>

    <!-- 
      ** This could be ealily Search component. 
      *  Just until it would be used anywhere else I woudn't extract it.
      *  Especially if we'd use Vuex store for data.
      *  I'm not sure if that's what you meant by text search, but I did my best guess.
    -->
    <div class="search">
      <form @submit.prevent="search()">
        <input type="text" v-model="searchTerm" />
        <button class="button" type="submit">Search</button>
      </form>
      <span v-if="$route.query.search" class="totlal">
        Total: {{ filteredBooks.length }}
      </span>
    </div>

    <!-- 
      ** This could be ealily BookList component. 
      *  Just until it would be used anywhere else I woudn't extract it.
      *  Especially if we'd use Vuex store for data.
    -->
    <div class="book" v-for="book in paginatedBooks" :key="book.slug">
      <div class="book-description">
        <div class="book-title">
          <h2>
            {{ book.rank }}.
            <router-link :to="`/books/${book.slug}`">
              {{ book.title }}
            </router-link>
          </h2>
          <span class="rating">({{ book.rating }}/10)</span>
        </div>
        <div class="author">{{ book.author }}</div>
        <p>{{ truncateSynopsis(book.synopsis) }}</p>
        <div class="votes">
          <button
            class="button"
            :class="{ upvoted: book.upvoted }"
            @click="toggleVote(book.rank)"
          >
            {{ book.upvoted ? "Upvoted" : "Upvote" }}
          </button>
          <span>Upvoted {{ book.upvotes }} times</span>
        </div>
      </div>
      <router-link :to="`/books/${book.slug}`">
        <img :src="book.cover" :alt="book.title" />
      </router-link>
    </div>

    <!--
      ** I could extract pagination to a separate component, 
      *  although it's not used anywhere else in this project and until then I wouldn't do it.
    -->
    <div v-if="pages > 1" class="pagination">
      <router-link
        v-for="i in pages"
        :key="`page-${i}`"
        :to="{
          name: 'books',
          query: Object.assign({}, $route.query, { page: i })
        }"
      >
        <button class="button reversed rounded" type="button">
          {{ i }}
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [],
      count: undefined,
      perPage: 5,
      searchTerm: undefined
    };
  },
  mounted() {
    this.searchTerm = this.$route.query.search;
    fetch("http://localhost:3000/books")
      .then(res => res.json())
      .then(res => {
        this.books = res.books.map((book, i) => {
          return {
            ...book,
            rank: i + 1
          };
        });
        this.count = res.meta.count;
      });
  },
  computed: {
    page() {
      return this.$route.query.page || 1;
    },
    filteredBooks() {
      const searchTerm = this.$route.query.search;
      if (!searchTerm) return this.books;
      return this.books.filter(book => {
        return (
          book.title.includes(searchTerm) || book.synopsis.includes(searchTerm)
        );
      });
    },
    paginatedBooks() {
      if (!this.books.length) return [];
      const from = this.page * this.perPage - this.perPage;
      const to = this.page * this.perPage;
      return this.filteredBooks.slice(from, to);
    },
    pages() {
      return Math.ceil(this.filteredBooks.length / this.perPage) || 1;
    }
  },
  methods: {
    truncateSynopsis(text) {
      return `${text.slice(0, 200)}...`;
    },
    toggleVote(rank) {
      if (this.books[rank - 1].upvoted) {
        this.books[rank - 1].upvotes -= 1;
      } else {
        this.books[rank - 1].upvotes += 1;
      }
      this.books[rank - 1].upvoted = !this.books[rank - 1].upvoted;
      // TODO api call to reflect the change on server
    },
    search() {
      this.$router.push({
        name: "books",
        query: Object.assign({}, this.$route.query, {
          search: this.searchTerm
        })
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.books {
  box-shadow: $shadow;

  h1 {
    margin: 0;
    padding: 1.5rem 0;
    text-align: center;
    background: $beige;
  }
}

.search {
  padding: 1rem 0;
  background: white;
  text-align: center;

  .total {
    font-size: 0.5rem;
  }

  form {
    display: flex;
    justify-content: center;
  }

  input {
    border: 1px solid $yellow;
    padding: 0.75rem;
    font-size: 1.5rem;
    border-radius: 1rem;
  }

  button {
    margin-left: 1rem;
  }
}

.book {
  display: flex;
  padding: 4rem;
  background: white;

  .book-description {
    margin-right: 1rem;
  }

  .book-title {
    display: flex;
    align-items: baseline;

    h2 {
      margin: 0 0 1rem;
    }

    h2,
    a {
      color: $gold;
    }
    .rating {
      margin-left: 0.25rem;
    }
  }

  .author {
    font-style: italic;
  }

  .votes {
    button {
      margin-right: 1rem;
    }
  }

  img {
    max-height: 365px;
    max-width: 240px;
    border-radius: 1rem;
    object-fit: cover;
  }

  &:nth-child(2n + 1) {
    background: $beige;
  }
}

.pagination {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  background: $beige;

  button {
    margin: 0 0.5rem;
  }
}
</style>
