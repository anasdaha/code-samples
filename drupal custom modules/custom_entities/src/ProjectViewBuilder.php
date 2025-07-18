<?php
namespace Drupal\custom_layout;

use Drupal\Core\Entity\EntityViewBuilder;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\Display\EntityViewDisplayInterface;

class ProjectViewBuilder extends EntityViewBuilder {

  /**
   * {@inheritdoc}
   */
  public function buildComponents(array &$build, array $entities, array $displays, $view_mode) {
    parent::buildComponents($build, $entities, $displays, $view_mode);

    // Ensure fields are properly built
    foreach ($entities as $id => $entity) {
      $display = $displays[$entity->bundle()];

      // Build each field according to display settings
      foreach ($display->getComponents() as $name => $component) {
        if ($entity->hasField($name) && !$entity->get($name)->isEmpty()) {
          $build[$id][$name] = $this->viewField($entity->get($name), $component);
        }
      }
    }
  }
}
