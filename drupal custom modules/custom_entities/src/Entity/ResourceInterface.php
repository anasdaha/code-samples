<?php

namespace Drupal\custom_entities\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface defining a Resource entity.
 */
interface ResourceInterface extends ContentEntityInterface, EntityChangedInterface, EntityOwnerInterface {

  /**
   * Gets the Resource creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Resource.
   */
  public function getCreatedTime();

  /**
   * Sets the Resource creation timestamp.
   *
   * @param int $timestamp
   *   The Resource creation timestamp.
   *
   * @return \Drupal\custom_entities\Entity\ResourceInterface
   *   The called Resource entity.
   */
  public function setCreatedTime($timestamp);

  /**
   * Returns the Resource published status indicator.
   *
   * Unpublished Resource are only visible to restricted users.
   *
   * @return bool
   *   TRUE if the Resource is published.
   */
  public function isPublished();

  /**
   * Sets the published status of a Resource.
   *
   * @param bool $published
   *   TRUE to set this Resource to published, FALSE to set it to unpublished.
   *
   * @return \Drupal\custom_entities\Entity\ResourceInterface
   *   The called Resource entity.
   */
  public function setPublished($published);

}