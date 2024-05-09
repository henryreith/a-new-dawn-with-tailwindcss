// Define the dictionary of pre-order variant IDs and messages at a higher scope
const variantPreOrderMessages = {
  // Example - Replace with your own variant IDs and messages
  // VariantID(const) : 'Variant Spesific Shipping Message', e.g. 42544313237725: 'Shipping from 20th May 2024.',
  // 42544313237725: '', // 'Shipping from 20th May 2024.'
  // 39700375076926: 'Shipping from 25th May 2024.',
};

const defaultPreOrderMessage = 'Shipping from 23rd May 2024.';

document.addEventListener('DOMContentLoaded', function () {
  initializePreOrderSetup();

  // Subscribe to variant changes to re-apply the script for dynamic content
  subscribe(PUB_SUB_EVENTS.variantChange, () => {
    clearPreOrderMessages(); // Clear existing messages
    initializePreOrderSetup(); // Reinitialize setup
  });
});

function clearPreOrderMessages() {
  // Select all pre-order message elements
  var messages = document.querySelectorAll('.hrm-pre-order-message');
  // Loop through all messages and remove them from the DOM
  messages.forEach(function (message) {
    message.parentNode.removeChild(message);
  });

  // Select and remove all hidden pre-order input elements
  var hiddenInputs = document.querySelectorAll(
    'input[name="properties[Pre-ordered item]"]',
  );
  hiddenInputs.forEach(function (input) {
    if (input.parentNode) {
      input.parentNode.removeChild(input);
    }
  });
}

function initializePreOrderSetup() {
  // Select all product forms on the page
  var productForms = document.querySelectorAll('product-form');

  productForms.forEach(function (form) {
    var cartForm = form.querySelector('form[action="/cart/add"]');
    var variantIdInput = form.querySelector('input.product-variant-id');

    if (variantIdInput) {
      var variantId = parseInt(variantIdInput.value);

      // Only modify forms for variants listed in variantPreOrderMessages
      if (variantPreOrderMessages.hasOwnProperty(variantId)) {
        var submitButton = form.querySelector(
          'product-form button[type="submit"] span',
        );

        if (submitButton && cartForm) {
          // Change the button text to 'Pre order'
          submitButton.textContent = 'Pre order';

          // Determine the correct pre-order message to display
          var preOrderMessage =
            variantPreOrderMessages[variantId] || defaultPreOrderMessage;

          // Create and insert the pre-order message element
          var messageElement = document.createElement('span');
          messageElement.className = 'hrm-pre-order-message';
          messageElement.innerHTML =
            '<small style="font-weight: 400;margin: 1rem 0 0;display: block;line-height: 1;font-size: 12px;">' +
            preOrderMessage +
            '</small>';

          // Append the message element after the product form
          form.parentNode.insertBefore(messageElement, form.nextSibling);

          // Inject a hidden input field into the form to mark the item as pre-ordered
          var hiddenInput = document.createElement('input');
          hiddenInput.setAttribute('type', 'hidden');
          hiddenInput.setAttribute('name', 'properties[Pre-ordered item]');
          hiddenInput.setAttribute('value', 'Yes');
          cartForm.appendChild(hiddenInput);
        }
      }
    }
  });
}
