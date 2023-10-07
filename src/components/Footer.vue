<template>
  <footer>
    <div class="footer-container">
      <!-- <div class="footer-logo">Your Footer Logo</div> -->
      <div class="footer-links">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>
  
  <script>
export default {
  name: "FooterVue",
  // You can add any logic or data properties specific to your footer here.
};
</script>
  
  <style scoped>
/* Add your styling for the footer here */
footer {
  background-color: #2c3e50;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  /* position: absolute;
  bottom: 0;
  width: 100%; */
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-logo {
  font-size: 24px;
}

.footer-links ul {
  list-style: none;
  padding: 0;
}

.footer-links li {
  display: inline-block;
  margin: 0 10px;
}

.footer-links a {
  text-decoration: none;
  color: #fff;
}

/* Add additional styles as needed */
</style>
  