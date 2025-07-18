<?php

namespace Drupal\custom_entities\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface defining a Demand entity.
 */
interface DemandInterface extends ContentEntityInterface, EntityChangedInterface, EntityOwnerInterface {

  /**
   * Gets the Demand creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Demand.
   */
  public function getCreatedTime();

  /**
   * Sets the Demand creation timestamp.
   *
   * @param int $timestamp
   *   The Demand creation timestamp.
   *
   * @return \Drupal\custom_entities\Entity\DemandInterface
   *   The called Demand entity.
   */
  public function setCreatedTime($timestamp);

  /**
   * Returns the Demand published status indicator.
   *
   * Unpublished Demands are only visible to restricted users.
   *
   * @return bool
   *   TRUE if the Demand is published.
   */
  public function isPublished();

  /**
   * Sets the published status of a Demand.
   *
   * @param bool $published
   *   TRUE to set this Demand to published, FALSE to set it to unpublished.
   *
   * @return \Drupal\custom_entities\Entity\DemandInterface
   *   The called Demand entity.
   */
  public function setPublished($published);

}
