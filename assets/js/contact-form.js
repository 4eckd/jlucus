/**
 * Contact Form JavaScript
 * Handles form submission and validation
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get the form element
  const form = document.querySelector('.contact-form');
  
  if (form) {
    // Add submit event listener
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Show loading indicator
      const loading = form.querySelector('.loading');
      const errorMessage = form.querySelector('.error-message');
      const sentMessage = form.querySelector('.sent-message');
      
      // Reset messages
      loading.classList.remove('d-none');
      loading.classList.add('d-block');
      errorMessage.classList.remove('d-block');
      errorMessage.classList.add('d-none');
      sentMessage.classList.remove('d-block');
      sentMessage.classList.add('d-none');
      
      // Get form data
      const formData = new FormData(form);
      
      // Check if using Formspree
      const action = form.getAttribute('action');
      const isFormspree = action.includes('formspree.io');
      
      // Send the form data
      fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`${response.status} ${response.statusText}`);
        }
      })
      .then(data => {
        // Hide loading indicator
        loading.classList.remove('d-block');
        loading.classList.add('d-none');
        
        // Show success message
        sentMessage.classList.remove('d-none');
        sentMessage.classList.add('d-block');
        
        // Reset the form
        form.reset();
      })
      .catch(error => {
        // Hide loading indicator
        loading.classList.remove('d-block');
        loading.classList.add('d-none');
        
        // Show error message
        errorMessage.textContent = 'An error occurred while sending your message. Please try again later.';
        errorMessage.classList.remove('d-none');
        errorMessage.classList.add('d-block');
        
        console.error('Form submission error:', error);
      });
    });
  }
});
