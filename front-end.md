# Front end Engineer Challenge

You can submit all the answers to this assignment in a single repository (or as a zipped folder), containing markdown and code.

## 1. About you

Tell us about one of your commercial projects with Vue.js or AngularJS.

One I am most proud of is [http://samknows.com/](http://samknows.com/).
There was a need for a new website and we formed a creative team of a develper (me), designer and a content manager. I decieded to go with Vue SSR application, because we had some endpoins on that domain and we cared about the SEO. I've build that using Vue, SASS, Vuex and Prismic.io. Prismic is a headless CMS and the site gets all the content after first request and store it in Vuex store, so the users don't see loading spinner too much. I proud of it because I've built it myself, my colleagues just helped with code reviews, and it was a pleasure to work beside a designer.


## 2. General

##### 2.1. What kind of front end projects do you enjoy working on? Why?
I enjoy well structured projects that are creative in a way. Like samknows.com or some data visualization.
I like to make things useful and look pretty.

##### 2.2. Which are your favorite features of HTML5? How have you used them before?
All stuff about forms. Fieldsets diabling (you can easly disable multiple fields with it), required on fields and pattern. We do forms often and it make our lives so much easier to have those things in the browser.
I always use them.

##### 2.3. Explain the difference between creating a DOM element setting `innerHTML` and using `createElement`.
Well first, `innerHTML` creates a security issue. We might accidentaly open the app to XSS attacs.
When we use `innerHTML` we also throw away everying that's inside and have re-parse and recreate it again. That looses DOM refferences and removes events. Although using `innerHTML` is faster for simple cases it may not be for more complex ones. I preffer to use `createElement` even though it's not as easy and less readable.

##### 2.4. Compare two-way data binding vs one-way data flow.
One way data binding is what React uses, and as the name suggest the data flows one way. The data updates the UI and changes in UI emit events that update the data. It's one way, but it's a loop.
Two way data binding like in Angular or Vue works two ways. There are watchers that look for UI changes and data changes. If any of these changes the other is updated.

##### 2.5. Why is asynchronous programming important in JavaScript?
Because JavaScript is single threaded and timely operations or server requests would freeze the sites.

## 3. Styling

Given the HTML file **front-end/q3/q3.html**, implement the styling so the page matches the image below.

![Styling](./front-end/q3/images/result.jpg "Styling")

#### Bonus
- Implement styling rules that consider different screen sizes.

**Notes:**
- The footer should stick to the bottom when scrolling.
- You can, and should, use a CSS pre-processor, such as SASS or LESS.

**Bart's notes:** 
- You can run `npm start` to run [Parcel](https://parceljs.org/). I used it for hot realoding. It's a no config bundler, really easy to use.



## 4. SPA

Using Vue.js or AngularJS, implement an SPA that gets information from a server (explained below) and has the following pages:


### Books list

Display all available books returned from the API.
- Synopsis should be truncated at 200 characters.
- Book's title and cover should link to the book's individual page.
- Though the upvote functionality is not required, the upvote state should be represented.

![Books list](./front-end/q4/images/books-list.png "Books list")


### Book page

Display a single book information, highlighting the cover and displaying the full synopsis.

![Book page](./front-end/q4/images/book.png "Book page")

The upvote functionality is **not** required, the UI should only reflect if a book has been upvoted yet or not.
For this question, you **don't** have to replicate the example screens above, feel free to implement any design that you'd like.


**Important notes:**
- Add test coverage as you see fit;
- You may use TypeScript instead of plain JS;
- Use a CSS pre-processor;
- Your app must be responsible for all of it's dependencies and they should be installed via `yarn` or `npm install`. The app must run by using either `yarn start` or `npm start`.

**Batt's notes:**
- You can find my project `/client` directory.
- I used styles from previous task. Hope you don't mind :)


#### Bonus

- Implement text search on the books list (for title and synopsis)
- Add pagination on the books list
- Add a comments section on the book page


### Server

In order to solve this problem, a simple server is provided, which you should use to get the data.
Head into `front-end/q4/server` and install the server dependencies using:

```bash
yarn install
```

or

```bash
npm install
```

Run the server using:

```bash
yarn server
```

or

```bash
npm run server
```

The server should be running on port `3000`.

#### Available routes

#### http://localhost:3000/books

Returns a list of books, with their info.

#### http://localhost:3000/books/SLUG

Returns the book information for the given SLUG (404 otherwise).
