# Running Shoes

![Products](/images/products.jpg?raw=true "Products")

Semester Project 2. E-commerce website that has both customer-facing and admin sections.

## Description

The front-end of this project is built with javascript and sass.
Local storage is well utilised. For instance it makes the shopping cart functions. Where products added to cart are stored in a array by their id. In the shopping cart, this array is filtered and counted so that each unique id is displayed with the number of products with its id. The local storage also controls if admin is logged-in or not.

The homepage constists of a carousel that is functional dynamically. Which means that it counts the number of products with status "featured" and based on this adjusts its width and swing-length.

The products page consists of different features that let the user filter and sort the product list. They are all structured in a main function where they depend on each other's inputs. These features are a search input, a price range and sort buttons based on date or price.

The admin has authorization to interact with the api on different methods, such as post, put and delete. In other words, admin can add new product and edit a product by either update its data or delete it fully.

The project constists of following pages:

Customer-facing pages:

- Homepage
- Products Page
- Details Page
- Cart Page
- Login Page

Admin-facing pages:

- Edit Product Page
- Add Product Page

## Built With

The project is built with following tech stack.

Front-end:

- Vanilla JavaScript
- [Sass](https://sass-lang.com/)

Back-end:

- [Strapi Headless CMS](https://strapi.io/)
- [Heroku Server](https://dashboard.heroku.com/)

## Getting Started

To install and run this project locally, you can do the following:

1. Clone the repo:

```bash
git clone git@github.com:lassopicasso/running-shoes.git
```

2. To run the app:

```bash
Right click and select "Open with Live Server" on index.html file, located in root folder.
```

3. Login credentials to restricted pages

```bash
admin@admin.com
Pass1234
```

## Contact

[My Portfolio](https://lars-walderhaug.netlify.app)

[My LinkedIn page](https://www.linkedin.com/in/lars-walderhaug-5924a349/)
