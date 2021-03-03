Areas to build:

1. Restaurant Reviews (in progress)
   1. Sub screen for view by selection criteria - area or all(done)
   2. Screen for blog view (in progress)
2.  Sidebar features - tbd
3. About section
4. Contact us section
5. CML section (complete)
   1. Create new Entry
      1. Quill Editor 
      2. Upload  images to S3 Bucket 
      3. Save completed entry to db
   2. View entries
   3. Delete Entries
6. Landing page (in progress)
7. Login system (complete)
8. Travel Blogs
   1.  Sub screen for list of travel blog reviews\
   2.  Sub screen for list a travel Blog\
9. Recipes
   1.  Sub screen for list of recipes\
   2.  sub screen for a recipes\
10. General
    1. Add Loaders where applicable
11. Social Media
    1. Facebook integration - buttons for share and for view 
    2. Instagram Integration 
       1.  buttons for share and view.
       2. Add Section on the landing page to view sample of images from Instagram
12. Build maintenance page





## **Fixes required:**

**Quill**

1. Quill Editor - option to change RTL and LTR typing
2. Clear editor sends request to server to clear the temp image 

**AWS**

1. AWS - make the bucket private

2. Image Upload - Upon fail make another 2-3 attempts of uploading

   1. Check error types for different responses
2. image upload failed, show error in a console on user screen

**Content Management System**

1. Add filters by date to table
2. Add pagination(10 items per page)
3. More secure way of authentication
4.  Add loaders
5. Fix error handling along the route
6. Change Tags section in CMS to TagsNavbar component



### **Features for Later:**

1. Ellipsis for pagination - both previous and next

   