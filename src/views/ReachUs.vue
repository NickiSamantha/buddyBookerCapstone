<template>
    <div class="container ">
     <div class="row d-flex mx-auto justify-content-center mb-4 ">
         <h2 class="display-2">Get in touch with us!</h2>
         <p class="text-center"> Your feedback is important to us, and we look forward to working with you!  </p>
     </div>
     <div >
     </div>
     <div class="col-md-6 m-auto p-2">
     <form  id="contactForm" action="https://formspree.io/f/manwpnbk"
       method="POST" target="_blank">
         <div class="mb-3">
             <label for="name" class="form-label" >Full Name</label>
             <input type="text" class="form-control" id="name" placeholder="Enter Full Name" required>
         </div>
         <div class="mb-3">
             <label for="email" class="form-label" >Email address</label>
             <input type="email" class="form-control" id="email" placeholder="Enter email address" required>
         </div>
         <div class="mb-3">
             <label for="message" class="form-label">Feedback</label>
             <textarea class="form-control" id="message" rows="3" 
             placeholder="Have a review to submit for one of our sitters ? Leave that here ! 
             Have some tips for improvement , leave that here ! " 
             required></textarea>

         </div>
         <button type="submit" class="btn btn-dark mb-3">Submit</button>
         <button type="reset" class="btn btn-light mb-3" id="clearBtn">Clear</button>

        </form>
 </div>

 <div class="contact-card col-md-6  p-2 ">
     <h1>Reach Us</h1>
     <p><strong>Email:</strong> buddybooker24@gmail.com</p>
     <p><strong>Phone:</strong> 067 775 8935</p>
     <p><strong>Location:</strong> Cape Town , Western Cape</p>
     
     <h5 class="mb-2"><strong>Follow Us :</strong> </h5>
      <ul class="social-icons">
       <li><a href="https://www.instagram.com/pretty_simple_printz/" class="btn btn-light" target="_blank"><i
             class="fab fa-instagram"></i></a></li>
       <li><a href="https://www.tiktok.com/@prettysimpleprintz" class="btn btn-light" target="_blank"><i class="fa-brands fa-tiktok"></i></a></li>  
      </ul>
</div>
   </div>
</template>

<script>
 export default {
     
 }
</script>

<style scoped>
.btn {
margin: 5px;
padding: 10px 20px;
border: 1px solid#86807c;
color: #080808;
background-color: transparent;
border-radius: 5px;
cursor: pointer;
text-decoration: none;
}

.btn:hover {
background-color: #e5c2ad;
color: white;
}
.button-group {
display: flex;
justify-content: space-between;
}
#contact-form {
 padding: 30px;
 border: 1px solid#86807c;
 border-radius: 0.5rem;
 box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1);
 max-width: 35rem;
 
}
.contact-card {
 max-width: 30rem;
 margin: auto;
 padding: 1rem;
 border-radius: 0.5rem;
 font-family: "Open Sans", sans-serif;
}
.social-icons {
 list-style: none;
 padding: 0;
}

.social-icons li {
 display: inline-block;
 margin-right: 0.625;

}

</style>