<?php

namespace Drupal\neiu_pf\Controller;

use Drupal\Core\Cache\RefinableCacheableDependencyInterface;
use Drupal\Core\Cache\RefinableCacheableDependencyTrait;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Component\Utility\Html;

/**
 * Returns responses for NEIU Program routes.
 */
class ProgramFinderController extends ControllerBase implements RefinableCacheableDependencyInterface {

  use RefinableCacheableDependencyTrait;

  /**
   * Builds the response.
   */
  public function build() {
  
    $types = $this->getTerms('program_type');
    $locations = $this->getTerms('location');
    $colleges = $this->getTerms('college');
    $academic_department = $this->getTerms('academic_department');
    $subject_area = $this->getTerms('subject_area');

    $build['content'] = [
      '#theme' => 'program_finder_list',
      '#types' => $types,
      '#locations' => $locations,
      '#colleges' => $colleges,
      '#academic_department' => $academic_department,
      '#subject_area' => $subject_area,
      '#cache' => [
          'contexts' => [],
          'tags' => [],
          'max-age' => 0,
        ],
    ];
    return $build;
  }

  /**
   * Returns list of terms.
   *
   * @param string $string
   *
   * @return array
   */
  private function getTerms(string $string): array {
    $res = [];
    if ($terms = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree($string, 0, NULL, TRUE)) {
      $unpublished_terms = [];
      foreach ($terms as $term) {
        if (!$term->isPublished() || in_array($term->parent->target_id, $unpublished_terms)) {
          $unpublished_terms[] = $term->id();
          continue;
        }
        $res[$term->id()] = Html::escape($term->label());
      }
    }
    return $res;
  }  

}
