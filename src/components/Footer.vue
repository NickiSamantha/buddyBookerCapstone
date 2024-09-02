<template>
  <footer class="footer container-fluid">
    <div class="row">
      <div class="col-md-4">
        <img
          src="https://nickisamantha.github.io/allImages/images/bblogo.png"
          alt="logo"
          class="img-fluid"
          loading="lazy"
        />
      </div>
      <div class="col-md-4 text-center">
        <p class="lead copyright">
          Nicki Abels Copyright &copy;<span>{{ cYear }}</span>
        </p>
      </div>
      <div class="col-md-4">
        <div>
          <a href="mailto:info@example.com">
            <i class="fas fa-envelope"></i>
          </a>
        </div>
        <div>
          <a href="tel:+1234567890">
            <i class="fas fa-phone"></i>
          </a>
          
          <a href="https://facebook.com/yourprofile" target="_blank">
              <i class="fab fa-facebook-f"></i>
            </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComp",
  data() {
    return {
      cYear: new Date().getUTCFullYear(),
    };
  },
};
</script>

<style>
.footer {
  background-color: #d9d9d9;
  padding: 10px 20px;
}
.footer .col-md-4 {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.footer .col-md-4 img {
  max-width: 150px; /* Make the logo a bit bigger */
  height: auto;
}

.footer .lead.copyright {
  margin: 0;
  font-size: 1.2rem; /* Increase font size for better readability */
}

.footer .fas, .footer .fab {
  font-size: 1.5rem; /* Increase icon size */
  margin: 0 10px; /* Add some spacing between icons */
}

.footer .col-md-4 a {
  color: #333; /* Dark color for the icons */
  text-decoration: none; /* Remove underline from links */
}

.footer .col-md-4 a:hover {
  color: #007bff; /* Change color on hover */
}

/* Responsive styling for smaller screens */
@media (max-width: 767.98px) {
  .footer .row {
    text-align: center; /* Center align text on smaller screens */
  }

  .footer .col-md-4 {
    flex: 1 0 100%; /* Make columns stack vertically */
    margin-bottom: 15px; /* Add some space between stacked items */
  }

  .footer .lead.copyright {
    font-size: 1rem; /* Adjust font size for smaller screens */
  }

  .footer .fas, .footer .fab {
    font-size: 1.25rem; /* Adjust icon size for smaller screens */
  }
}
</style>
