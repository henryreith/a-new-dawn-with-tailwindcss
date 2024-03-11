document.addEventListener('DOMContentLoaded', function () {
    // Select all TOC links
    const tocLinks = document.querySelectorAll(
      '.faq-collapsible-content .faq-section__toc-link, .faq-collapsible-content .faq-section__toc-sublink',
    );

    // Add click event listener to each link
    tocLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        // Prevent default link behavior
        // e.preventDefault();

        // Extract the ID of the target section from the href attribute of the clicked link
        const targetId = this.getAttribute('href').substring(1);
        const targetDetails = document.getElementById(targetId);

        // Check if the target element exists and is a <details> element
        if (targetDetails && targetDetails.tagName.toLowerCase() === 'details' && !targetDetails.open) {
            // Open the <details> element
            targetDetails.open = true;
            // Optionally, if you want to ensure only one <details> element is open at a time, you can close all others here
        }
      });
    });
  });