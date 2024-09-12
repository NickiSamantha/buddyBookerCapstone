<template>
  <div class="about p-5">
    <div class="text-center"
    data-aos="fade-right"
        data-aos-duration="1900"
        data-aos-delay="400">

    
    <h1 class="">About BuddyBooker</h1>

    <p>
      Welcome to BuddyBooker, where finding the perfect babysitter is made
      simple and stress-free. Our platform connects parents with highly
      qualified, reliable babysitters, ensuring peace of mind for every family.
      With an intuitive interface, real-time availability, and detailed sitter
      profiles, BuddyBooker makes it easy to book trusted childcare
      professionals who match your needs. </p>
      
      <div class="text">
        <h3><strong>Key Features:</strong></h3>
    </div>

<ul class="features">
  <strong> Sitters: </strong> 
<span> Comprehensive background checks and references ensure you're choosing from
  the best.  </span>
</ul> 

<ul class="features"> 
  <strong>  Availability:  </strong>
  <span> See when your preferred sitter is available and book instantly.</span>
</ul> 
<ul class="features">
  <strong> Custom Profiles:  </strong>
  <span> Detailed profiles and reviews help you find a sitter that suits your family's unique needs. 
  </span>
</ul>

<ul class="features">
  <strong>  Easy Booking: </strong>
  <span>
    Schedule, manage, and modify bookings with just a few clicks.
  </span>
</ul>
      <p>  
      Whether you need a night out or regular help, BuddyBooker is here to make
      sure your little ones are in safe, caring hands. Discover the convenience
      and reliability of BuddyBooker today!
    </p>
  </div></div>
</template>

<style scoped>
.about{
  background-color: #74afca;
}
.text {
  
  padding : 20px ;
  margin: 20px;
}

.text {
  text-align: center;
}

h1 {
text-align: center;
        
font-size: 2.5em;
            margin-top: 20px;
        }
        
     p {
            margin: 10px;
            padding: 0 10px;
        }
         
.features {
            list-style-type: none;
            padding: 0;
            margin: 20px 0;
        }
        .features ul {
            margin-bottom: 10px;
            font-weight: bolder;
        }
        .features span {
            font-weight: normal;
            color: #0a0a0a;
        }


 /* Responsive adjustments */
@media (max-width: 768px) {
  h1 {
    font-size: 2em;
  }

  .text {
    padding: 15px;
    margin: 10px;
  }

  p {
    margin: 5px;
    padding: 0 5px;
  }

  .features {
    margin: 15px 0;
  }

  .features li {
    margin-bottom: 8px;
  }

  .shadow {
    padding: 8px;
    margin: 10px;
  }
}
</style>