# Technical Test
This git repository contains two types of content:

- a folder with Python files (fizzBuzz.py and palindromeChecker.py)
- a folder with the free project (To-Do List App)


## Part 1. Algorithm


QuickSort has a very good complexity O(n log n), unlike other sorting methods like insertion sort with O(n²) complexity. This makes it quite fast, and I first thought it would be the most efficient. However, it uses divide-and-conquer, which creates problems if the list is already sorted. When we choose the pivot at the first position, we have to do useless tests and restart everything even when the list was already sorted.
I think it is not very useful to use this complex algorithm in everyday projects. The default sorting functions in programming languages are usually enough. However, for very large lists of data, QuickSort would be much more interesting to use.


## Part 2. To-Do List App

The todo list project was made with React / TypeScript. I chose this framework to learn something new (because we only had a short introduction to Vue.js recently, and the course is still continuing) and because it is very popular in web development today.
For the tools, I used Visual Studio Code IDE, simply because I know it and it has many useful features (like variable renaming...). Because I was learning a new framework, I had to read blogs and documentation to solve the problems I found. 

As I said before, I didn't know React at all, so I discovered hooks and learned to use them. Also, using TypeScript helps to be sure about what variables can contain. Of course, I had to learn how the files work, how to write JSX (or TSX), and how to change my project from JavaScript to TypeScript. I learned many things, but I still need to practice more to understand everything better.


### Installation

1. Clone the repository
2. Install dependencies:
```bash
   npm install
```
3. Start the development server:
```bash
   npm start
```
4. Open [http://localhost:3000](http://localhost:3000) in your browser