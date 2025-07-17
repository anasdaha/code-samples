(function ($, Drupal) {
  Drupal.behaviors.SocialFieldReorder = {
    attach: function (context, settings) {
      // Avoid re-processing
      if ($(context).hasClass('social-processed')) return;
      $(context).addClass('social-processed');

      // Select the field group wrapper (where to append fields)
      const $wrapper = $('#edit-field-social-links-wrapper', context);
      const $details = $wrapper.find('details');
      const $innerWrapper = $details.find('.claro-details__wrapper');

      // Select fields outside the group
      const $fieldTarget1 = $('.field--name-field-target', context);
      const $fieldTarget2 = $('.field--name-field-instagram-target', context);
      const $fieldTarget3 = $('.field--name-field-x-target', context);
      const $fieldTarget4 = $('.field--name-field-linkedin-target', context);
      const $fieldTarget5 = $('.field--name-field-youtube-target', context);
      const $fieldTarget6 = $('.field--name-field-bluesky-target', context);
      const $fieldTarget7 = $('.field--name-field-threads-target', context);
      const $fieldTarget8 = $('.field--name-field-more-target', context);

      // Move outer fields into the grouped wrapper in desired order

      //   $innerWrapper.append($field1);
      $innerWrapper.append($fieldTarget1);
      //   $innerWrapper.append($field2);
      $innerWrapper.append($fieldTarget2);
      //   $innerWrapper.append($field3);
      $innerWrapper.append($fieldTarget3);
      //   $innerWrapper.append($field4);
      $innerWrapper.append($fieldTarget4);
      //   $innerWrapper.append($field5);
      $innerWrapper.append($fieldTarget5);
      //   $innerWrapper.append($field6);
      $innerWrapper.append($fieldTarget6);
      //   $innerWrapper.append($field7);
      $innerWrapper.append($fieldTarget7);
      //   $innerWrapper.append($field8);
      $innerWrapper.append($fieldTarget8);
    }
  };
})(jQuery, Drupal);