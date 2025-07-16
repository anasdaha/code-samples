<?php

namespace Drupal\program_finder;

/**
 * Provides theme suggestions for the Program Finder module.
 */
class ProgramFinderThemeSuggestions {

  /**
   * Implements hook_theme_suggestions_HOOK_alter() for 'page'.
   */
  public function alter(array &$suggestions, array $variables) {
    if (!empty($variables['theme_hook_original']) && $variables['theme_hook_original'] == 'page') {
      $suggestions[] = 'page__program_finder';
    }
  }

}
