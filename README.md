
<h1 align="center">Rocketseat</h1>

<h1 align="center"><b>E-commerce - Launchstore</b></h1>


<h1 align="center">
    <img src=https://ik.imagekit.io/cnbmdh4b9w/ezgif.com-gif-maker__2__PBPFt9fUJ.gif>
</h1>


<h2>About</h2>
Launchstore is an "e-commerce" project that was built during the Launchbase bootcamp. Below I explain my learning process along each project phase.

<ul>

<li><a href="#first-part">First Part</a></li>
<li><a href="#second-part">Second Part</a></li>
<li><a href="#third-part">Third Part</a></li>
<li><a href="#forth-part">Forth Part</a></li>
<li><a href="#fifth-part">Fifth Part</a></li>
<li><a href="#sixth-part">Sixth Part</a></li>
<li><a href="#seventh-part">Seventh Part</a></li>
<li><a href="#eight-part">Eight Part</a></li>
</ul>
</br>

<h2 id="first-part">First Part</h2>
- Created page **Product creation**, so new products along with its **category** can be input into the **Front-end**.
- Created **edit** page, so a product can be edited.
- Data is being stored on Postgres.
- Concepts of DBML(Databse Markup Language) using dbdiagram.io
- Asynchronous Functions, callbacks and Promise.
- Input Mask


<h2 id="second-part">Second Part</h2>
- Created Image manager on Frontend. 
- Limited up to 6 images upload.
- From each File on Filelist(uploaded), created and array of files = []. Then, used DataTransfer Constructor(for Chrome) and Clipboard(for FireFox) on this array. After that, replaced the browser Filelist with this array . 



<h2 id="third-part">Third Part</h2>
-  Installed and configured middleware "multer" - Node tool - as it allows to send files to the Backend. "npm install multer"
- On the FORMS, to create and update products, added "enctype="multipart/form-data" , so files can be sent to Backend.
- On POST route, at the time to save a PRODUCT, validated if req.files is not empty. 
    - Got the files(images coming on req.files). Treated the file.path with method **replace** to replace "2 backslash bars " to "/". Got the product_id and created/saved the files in the Database. 
 
- On the Edit page, retrieved all files related to a product and displayed them on the Edit page. 
- On PUT/update route, created an array coming from backend with all the images that were set to be deleted. Then, created a promise to delete them in the backend. 

<h2 id="forth-part">Forth Part</h2>
- Created and styled an Image Gallery to display images on page Show.
- Created a lightBox to display the main image in a bigger box, so user can see it details.

<h2 id="fifth-part">Fifth Part</h2>
- Created the Home Page (showing 3 products on  a GRID. The most updated is shown first.)
- In order to show products by their updated time, created a PROCEDURE in Postgres to update the 'updated_at' field.

<h2 id="sixth-part">Sixth Part</h2>
 - Created user registration, and User Session Control module.
 - User can create an account.
 - User can login.
 - User can create products only if is logged in. ( If a session exists)
 - User can reset password. (Used "Mailtrap - smtp testing server" to test email receiving and password reset)

<h1 align="center">
    <img src=https://ik.imagekit.io/cnbmdh4b9w/ezgif.com-gif-maker__4__hpvXMnmUu.gif>
</h1>

<h2 id="seventh-part">Seventh Part</h2> 
- Only "logged" users can purchase an item. In other words, if user clicks on the "buy button", user will be directed to the login interface in case he/she has not logged in yet.
- Used lottie animation to show that a purchase has been successful.
- An email is sent to "seller" with "product" purchased and "buyer's" information.

<h1 align="center">
    <img src="https://ik.imagekit.io/cnbmdh4b9w/ezgif.com-gif-maker__7__wtoBbMgsZ.gif">
</h1>

<h2 id="eight-part">Eight Part</h2>
- Created the shopping cart manager (cart.js) which controls whether or not items already exist on cart. Also, it manages the addition and removal of items on the cart. 
- Items quantities can be removed by clicking on the "-" sign or remove all item at once by clicking on the "garbage can".
- Also, upon purchage, buyer receives and email notification informing of a new order.
- Buyer can set the product/order as sold or canceled.
- Finally, implemented a Soft Delete strategy by creating a View on the database (Cloning table "products" where deleted_at field is NOT NULL). Renamed table "products" to "products_with_delete" and View to "products".  
Now, even if the vendor deletes a product, the vendor can still see it on his orders and so can the buyer. And the deleted product is not shown anywhere else. 

<h1 align="center">
    <img src="https://ik.imagekit.io/cnbmdh4b9w/ezgif.com-gif-maker__10__Ui_Viu6Y4.gif">
</h1>

## Languages used
- Html5 (Hypertext)
- Css3 (Cascading Style Sheet)
- Javascript
- Postgres
- node.js
- mailtrap




