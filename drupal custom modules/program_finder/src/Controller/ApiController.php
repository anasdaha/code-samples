<?php

namespace Drupal\program_finder\Controller;

use Drupal\node\Entity\Node;
use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\Core\Url;

/**
 * Controller for generating JSON data for programs.
 */
class ApiController extends ControllerBase {

  /**
   * Renders a JSON page with program data.
   */
  public function renderJsonPage() {
    // Generate the JSON data (same as in the file)
    $data = $this->generateProgramsData();

    // Return JSON as a response (renders JSON as a page)
    return new JsonResponse($data, 200, ['Content-Type' => 'application/json']);
  }

  /**
   * Generates and saves JSON file for academic programs.
   */
  public function generateProgramsData() {

    $programs = [];
    // Fetch published nodes of type 'program_tiles' with access check.
    $query = \Drupal::entityQuery('node')
      ->condition('type', 'program_tiles')
      ->condition('status', 1)
      ->sort('title', 'ASC')
      ->accessCheck(TRUE);

    $nids = $query->execute();
    if (empty($nids)) {
      return new JsonResponse(['status' => 'error', 'message' => 'No programs found.']);
    }

    $nodes = Node::loadMultiple($nids);
    foreach ($nodes as $node) {
      $name = $node->label();
      // $url = $node->toUrl()->setAbsolute()->toString();
      if ($node->get('field_program_intro')->value !== NULL) {
        $description = html_entity_decode(preg_replace('/<.*?>/s', '', $node->get('field_program_intro')->value)) ?? '';
      }
      $keywords = $node->get('field_search_keywords')->value ?? '';

      // Fetch degree types (taxonomy references)
      $degree_terms = $node->get('field_degree_type')->referencedEntities();
      $levels = [];
      foreach ($degree_terms as $term) {
        $levels[] = $term->label();
      }
      // Fetch 'field_tile_link_destination' (Link field)
      $tile_link = '';
      if (!$node->get('field_tile_link_destination')->isEmpty()) {
        $field_tile = $node->get('field_tile_link_destination')->getValue();
        if (!empty($field_tile[0]['uri'])) {
          $uri = $field_tile[0]['uri'];
          if (str_starts_with($uri, 'internal:')) {
            // Convert internal path to a proper URL.
            $url = Url::fromUri($uri);
            $tile_link = $url->toString();
          }
          elseif (str_starts_with($uri, 'entity:')) {
            // Convert entity reference to a URL.
            $url = Url::fromUri($uri);
            $tile_link = $url->toString();
          }
          else {
            // External URLs remain unchanged.
            $tile_link = $uri;
          }
        }
      }
      // Fetch 'field_p_interdisciplinary' (Boolean field)
      $is_interdisciplinary = (bool) $node->get('field_p_interdisciplinary')->value;
      $interdisciplinary = '';
      if ($is_interdisciplinary) {
        $interdisciplinary = 'Interdisciplinary';
      }

      // Fetch department (taxonomy references)
      $department_terms = $node->get('field_department')->referencedEntities();
      $departments = [];
      foreach ($department_terms as $term) {
        $departments[] = $term->label();
      }

      // Build program data.
      $programs[] = [
        'name' => $name,
        'description' => $description,
        'level' => $levels,
        "department" => $departments,
        "inter" => [$interdisciplinary],
        'url' => [$tile_link],
        "keyword" => [$keywords],
      ];
    }

    return ['programs' => $programs];
  }

}
